import { Platform } from '@angular/cdk/platform';
import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseService } from '../../../commons/base.service';
import { SelectOption } from '../../../models/selection';
import { format, Peirod } from '../../../models/time';
import { ChartService } from '../../../services/chart/chart.service';
import { RequestService } from '../../../services/request/request.service';

@Injectable()
export class DashboardService extends BaseService {

  periodOptions: SelectOption[];

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

  private lineChartOption: any = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      top: 10
    },
    series:
    {
      type: 'line',
      data: [],
      smooth: true
    }
  };

  private pieChartSubject = new Subject<any[]>;
  pieChart$ = this.pieChartSubject.asObservable();

  private lineChartSubject = new Subject<any[]>;
  lineChart$ = this.lineChartSubject.asObservable();

  get isMobile(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

  constructor(
    private platform: Platform,
    private request: RequestService,
    private titleCase: TitleCasePipe,
    private chart: ChartService
  ) {
    super();
    this.periodOptions = Object.entries(Peirod).map(x => new SelectOption(x[0], x[1]));
  }

  drawPieChart(parkedVehicles: any[]): void {
    const opt = this.pieChartOption;
    const data = parkedVehicles.map(x => {
      return {
        name: this.titleCase.transform(x.type),
        value: x.options?.length || 0
      };
    });
    opt.series.data = data;
    opt.series.top = this.isMobile ? -10 : 30;
    this.chart.draw('pie', opt);
  }

  drawLineChart(parkingData: any[]): void {
    const opt = this.lineChartOption;
    const category: string[] = [];
    const data: number[] = [];
    for (let i = 0; i < parkingData.length; i++) {
      const d = parkingData[i];
      category.push(d.category);
      data.push(d.options?.length || 0);
    }
    opt.xAxis.data = category;
    opt.series.data = data;
    this.chart.draw('line', opt);
  }

  getVehiclesInfo(date: Date): void {
    const filter = format(date, 'MM-DD-YYYY');
    this.vehicleInfo = this.request.getVehiclesInfo(filter);
  }

  getParkedVehicles(): void {
    const data = this.request.getParkedVehicles();
    this.pieChartSubject.next(data);
  }

  getParkingData(period: Peirod): void {
    const data = this.request.getParkingData(period);
    this.lineChartSubject.next(data);
  }

}
