import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseService } from '../../../commons/base.service';
import { Vehicle } from '../../../models/vehicles';
import { RequestService } from '../../../services/request/request.service';

@Injectable()
export class VehiclesService extends BaseService {

  private vehiclesSubject = new Subject<Vehicle[]>;
  vehicles$ = this.vehiclesSubject.asObservable();

  constructor(private request: RequestService) {
    super();
  }

  loadVehicles(): void {
    const vehicles = this.request.getVehicles();
    this.vehiclesSubject.next(vehicles);
  }

}
