import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vehicle } from '../../../models/vehicles';
import { RequestService } from '../../../services/request/request.service';

@Injectable()
export class VehiclesService {

  private vehiclesSubject = new Subject<Vehicle[]>;
  vehicles$ = this.vehiclesSubject.asObservable();

  constructor(private request: RequestService) { }

  loadVehicles(): void {
    const vehicles = this.request.getVehicles();
    this.vehiclesSubject.next(vehicles);
  }

}
