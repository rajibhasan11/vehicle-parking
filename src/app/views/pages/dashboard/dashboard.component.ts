import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasePage } from '../../../commons/base.page';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService]
})
export class DashboardComponent extends BasePage implements OnInit {

  filterDate: Date = new Date();

  constructor(
    private router: Router,
    public bll: DashboardService
  ) {
    super();
  }

  ngOnInit(): void {
    this.onDateChange();
    this.addSubscription(
      this.bll.pie$.subscribe((res: any[]) => {
        this.bll.drawPieChart(res);
      })
    );
    this.bll.getParkedVehicles();
  }

  showVehicles(): void {
    this.router.navigateByUrl('/vehicles');
  }

  onDateChange(): void {
    this.bll.getVehiclesInfo(this.filterDate);
  }

}
