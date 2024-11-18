import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseService } from '../../../commons/base.service';
import { format } from '../../../models/time';
import { ChartService } from '../../../services/chart/chart.service';
import { RequestService } from '../../../services/request/request.service';

@Injectable()
export class DashboardService extends BaseService {

  vehicleInfo: any;

  private pieChartOption: any = {
    title: {
      text: 'Parked Vehicles',
      subtext: '(vehicles currently parked)',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'bottom'
    },
    series: {
      type: 'pie',
      radius: '68%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  };

  private pieSubject = new Subject<any[]>;
  pie$ = this.pieSubject.asObservable();

  constructor(
    private request: RequestService,
    private chart: ChartService,
    private titleCase: TitleCasePipe
  ) {
    super();
  }

  drawPieChart(parkedVehicles: any[]): void {
    const opt = this.pieChartOption;
    const data = parkedVehicles.map(x => {
      return {
        name: this.titleCase.transform(x.type),
        value: x.options?.length || 0
      };
    });
    opt.series.data.push(...data);
    this.chart.draw('pie', opt);
  }

  getVehiclesInfo(date: Date): void {
    const filter = format(date, 'MM-DD-YYYY');
    this.vehicleInfo = this.request.getVehiclesInfo(filter);
  }

  getParkedVehicles(): void {
    const data = this.request.getParkedVehicles();
    this.pieSubject.next(data);
  }

}
