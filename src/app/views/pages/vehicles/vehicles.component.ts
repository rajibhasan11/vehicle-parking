import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
export class VehiclesComponent extends BasePage implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  resultsLength: number = 0;

  pageSize: number = 10; // default 10

  pageIndex: number = 0; // 0-based, default 0

  displayedColumns: string[] = [
    'index',
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
        this.resultsLength = vehicles.length || 0;
      })
    );
    this.service.loadVehicles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  handlePageEvent(e: PageEvent): void {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  rowIndex(i: number): number {
    return (this.pageIndex * this.pageSize) + (i + 1);
  }

}
