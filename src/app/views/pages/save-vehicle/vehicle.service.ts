import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { SelectOption } from '../../../models/selection';
import { DateTime, TimeInput } from '../../../models/time';
import { ParkingStatus, Vehicle, VehicleType } from '../../../models/vehicles';
import { RequestService } from '../../../services/request/request.service';

@Injectable()
export class VehicleService {

  form!: FormGroup;

  vehicleTypeOptions: SelectOption[];

  vehicleStatusOptions: SelectOption[];

  constructor(private request: RequestService) {
    this.vehicleTypeOptions = Object.entries(VehicleType).map(x => new SelectOption(x[0], x[1]));
    this.vehicleStatusOptions = Object.entries(ParkingStatus).map(x => new SelectOption(x[0], x[1]));
  }

  setForm(form: FormGroup): void {
    this.form = form;
  }

  getControl(key: string, group?: string): AbstractControl {
    const controls = this.form.controls as any;
    return group ? controls[group].controls[key] : controls[key];
  }

  get(key: string, group?: string): any {
    return this.getControl(key, group).value;
  }

  getVehicle(id: string): Vehicle | undefined {
    const vehicle = this.request.getVehicle(id);
    if (vehicle) {
      vehicle.entryTime = new DateTime(vehicle.entryTime as string);
      vehicle.exitTime = new DateTime(vehicle.exitTime as string);
    }
    return vehicle;
  }

  saveVehicle(id?: string): boolean {
    const entryTime = new TimeInput(this.get('entryTime'));
    const exitTime = new TimeInput(this.get('exitTime'));
    const vehicle: Vehicle = {
      licenseNo: this.get('licenseNo'),
      type: this.get('type'),
      ownerName: this.get('ownerName'),
      ownerPhone: this.get('ownerPhone'),
      ownerAddress: this.get('ownerAddress'),
      status: this.get('status'),
      entryTime: entryTime.value,
      exitTime: exitTime.value,
      parkingCharge: this.get('parkingCharge')
    };
    if (id) {
      vehicle.id = id;
      return this.request.updateVehicle(vehicle);
    } else {
      return this.request.addVehicle(vehicle);
    }
  }

}
