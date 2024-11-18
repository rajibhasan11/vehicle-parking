import { Injectable } from '@angular/core';
import moment from 'moment';
import { isUndefined } from '../../utils/util';

/*
 This service is performing as a Baceend for this VehicleParking application.
*/
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string, storage: Storage = localStorage): string | null {
    return storage.getItem(key);
  }

  set(key: string, value: any, storage: Storage = localStorage) {
    if (isUndefined(value)) {
      storage.removeItem(key);
      return;
    }
    if (typeof value === 'string') {
      storage.setItem(key, value as string);
    } else {
      storage.setItem(key, JSON.stringify(value));
    }
  }

  addVehicle(vehicle: any): boolean {
    const id = guid();
    vehicle.id = id;
    const vehicles = this.getVehicles();
    vehicles.push(vehicle);
    this.set('vehicles', vehicles);
    return true;
  }

  updateVehicle(vehicle: any): boolean {
    const id = vehicle.id
    const vehicles = this.getVehicles();
    const index = vehicles.findIndex(x => x.id == id);
    if (index == -1) {
      return false;
    }
    vehicles[index] = vehicle;
    this.set('vehicles', vehicles);
    return true;
  }

  getVehicle(id: string): any | undefined {
    const vehicles = this.getVehicles();
    return vehicles.find(x => x.id == id);
  }

  getVehicles(): any[] {
    const json = this.get('vehicles');
    return json ? JSON.parse(json) : [];
  }

  // • Total cars parked
  // • Total empty slot
  // • Vehicle type info. (Show number of each type of vehicle) A card that shows the
  //   vehicles parked for more than two hours.
  getVehiclesInfo(date: string): any {
    const vehicles = this.getVehicles();
    const carsParked = vehicles.filter(x => isSameDate(x.entryTime, date) && x.status == 'in');
    const carsExited = vehicles.filter(x => isSameDate(x.exitTime, date) && x.status == 'out');
    const res: any = {};
    res.totalCarParked = carsParked.length;
    res.totalEmptySlots = carsExited.length;

    const vehiclesParked2hrs = carsParked.filter(x => isParkedMoreThan2TwoHourss(x.entryTime));
    const groupedList = Object.entries(
      vehiclesParked2hrs.reduce((acc, { id, type }) => {
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push({ id });
        return acc;
      }, {})
    ).map(([type, options]) => ({ type, options }));
    res.vehicles = groupedList;
    return res;
  }

  getParkedVehicles(): any[] {
    const vehicles = this.getVehicles();
    const carsParked = vehicles.filter(x => x.status == 'in');
    const groupedList = Object.entries(
      carsParked.reduce((acc, { id, type }) => {
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push({ id });
        return acc;
      }, {})
    ).map(([type, options]) => ({ type, options }));
    return groupedList;
  }

}

function isSameDate(dt: string, date: string): boolean {
  const entryDate = moment(dt, 'YYYY-MM-DD');
  return moment(date, 'MM-DD-YYYY').isSame(entryDate);
}

function isParkedMoreThan2TwoHourss(dt: string): boolean {
  const entryTime = moment(dt, 'YYYY-MM-DD HH:mm');
  const diff = moment(moment.now()).diff(entryTime, 'hours');
  return diff > 2;
}

function guid(): string {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}