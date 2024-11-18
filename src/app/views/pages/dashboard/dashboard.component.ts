import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService]
})
export class DashboardComponent {

  filterDate: Date = new Date();

  constructor(
    private router: Router,
    public bll: DashboardService
  ) { }

  ngOnInit(): void {
    this.onDateChange();
    this.bll.getParkedVehicles();
    this.bll.drawPieChart();
  }

  showVehicles(): void {
    this.router.navigateByUrl('/vehicles');
  }

  onDateChange(): void {
    this.bll.getVehiclesInfo(this.filterDate);
  }

}
