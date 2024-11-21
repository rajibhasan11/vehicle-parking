import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeSensor } from 'css-element-queries';
import { BasePage } from '../../../commons/base.page';
import { SelectOption } from '../../../models/selection';
import { Peirod } from '../../../models/time';
import { ChartService } from '../../../services/chart/chart.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [ChartService, DashboardService],
  standalone: false
})
export class DashboardComponent extends BasePage implements OnInit {

  filterDate: Date = new Date();

  period: Peirod = Peirod.Daily;

  private contentSize: number = 0;

  get isSmallScreen(): boolean {
    return this.contentSize < 800;
  }

  get singleColumn(): boolean {
    return this.isSmallScreen;
  }

  get totalCarParked(): number {
    return this.service.vehicleInfo?.totalCarParked || 0;
  }

  get totalEmptySlots(): number {
    return this.service.vehicleInfo?.totalEmptySlots || 0;
  }

  get vehicleInfo(): any[] {
    return this.service.vehicleInfo?.vehicles || [];
  }

  get periodOptions(): SelectOption[] {
    return this.service.periodOptions;
  }

  get isMobile(): boolean {
    return this.service.isMobile;
  }

  constructor(
    private router: Router,
    private service: DashboardService
  ) {
    super();
  }

  ngOnInit(): void {

    this.addResizeListener();

    this.addSubscription(
      this.service.pieChart$.subscribe((res: any[]) => {
        this.service.drawPieChart(res);
      })
    );

    this.addSubscription(
      this.service.lineChart$.subscribe((res: any[]) => {
        this.service.drawLineChart(res);
      })
    );

    this.service.getParkedVehicles();

    this.onDateChange(); // initial selection with default value
    this.onPeriodSelectionChange(); // initial selection with default value

  }

  private addResizeListener(): void {
    const content = document.getElementById('content');
    if (content != null) {
      new ResizeSensor(content, () => {
        this.contentSize = content.clientWidth;
      });
    }
  }

  showVehicles(): void {
    this.router.navigateByUrl('/vehicles');
  }

  addVehicle(): void {
    this.router.navigateByUrl('/add-vehicle');
  }

  onDateChange(): void {
    this.service.getVehiclesInfo(this.filterDate);
  }

  onPeriodSelectionChange(): void {
    this.service.getParkingData(this.period);
  }

}
