import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getDisplayDate } from '../../../models/time';
import { Vehicle } from '../../../models/vehicles';
import { VehiclesService } from './vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  providers: [VehiclesService]
})
export class VehiclesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'ownerName',
    'type',
    'licenseNo',
    'entryTime',
    'exitTime',
    'status',
    'star'
  ];

  dataSource = new MatTableDataSource<Vehicle>;

  private subscriptions = new Subscription();

  constructor(
    private service: VehiclesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const sub = this.service.vehicles$.subscribe((vehicles: Vehicle[]) => {
      this.dataSource.data = vehicles;
    });
    this.subscriptions.add(sub);
    this.service.loadVehicles();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  editVehicle(vehicle: Vehicle): void {
    this.router.navigateByUrl(`/edit-vehicle/${vehicle.id}`);
  }

  addVehicle(): void {
    this.router.navigateByUrl('/add-vehicle');
  }

  convertDate(time: string): string {
    return getDisplayDate(time) || '(not set)';
  }

}
