import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BasePage } from '../../../commons/base.page';
import { getDisplayDate } from '../../../models/time';
import { Vehicle } from '../../../models/vehicles';
import { VehiclesService } from './vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  providers: [VehiclesService]
})
export class VehiclesComponent extends BasePage implements OnInit {

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

  constructor(
    private service: VehiclesService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.service.vehicles$.subscribe((vehicles: Vehicle[]) => {
        this.dataSource.data = vehicles;
      })
    );
    this.service.loadVehicles();
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
