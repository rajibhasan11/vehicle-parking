import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeSensor } from 'css-element-queries';
import { BasePage } from '../../../commons/base.page';
import { ChartService } from '../../../services/chart/chart.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [ChartService, DashboardService]
})
export class DashboardComponent extends BasePage implements OnInit {

  filterDate: Date = new Date();

  private contentSize: number = 0;

  get isSmallScreen(): boolean {
    return this.contentSize < 800;
  }

  get singleColumn(): boolean {
    return this.isSmallScreen;
  }

  constructor(
    private router: Router,
    public bll: DashboardService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addResizeListener();
    this.onDateChange();
    this.addSubscription(
      this.bll.pie$.subscribe((res: any[]) => {
        this.bll.drawPieChart(res);
      })
    );
    this.bll.getParkedVehicles();
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

  onDateChange(): void {
    this.bll.getVehiclesInfo(this.filterDate);
  }

}
