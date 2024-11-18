import { Injectable } from '@angular/core';
import { Vehicle } from '../../models/vehicles';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private storage: StorageService) { }

  getVehicles(): Vehicle[] {
    return this.storage.getVehicles();
  }

  getVehicle(id: string): Vehicle | undefined {
    return this.storage.getVehicle(id);
  }

  addVehicle(vehicle: Vehicle | any): boolean {
    if (!vehicle) {
      return false;
    }
    return this.storage.addVehicle(vehicle);
  }

  updateVehicle(vehicle: Vehicle | any): boolean {
    if (!vehicle) {
      return false;
    }
    return this.storage.updateVehicle(vehicle);
  }

  getVehiclesInfo(date: string): any {
    return this.storage.getVehiclesInfo(date);
  }

  getParkedVehicles(): any[] {
    return this.storage.getParkedVehicles();
  }

}
