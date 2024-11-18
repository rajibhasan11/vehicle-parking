import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsType, ResizeOpts } from 'echarts';
import 'echarts/theme/macarons.js';
import { fromEvent, Subject } from 'rxjs';
import { BaseService } from '../../../commons/base.service';
import { format } from '../../../models/time';
import { RequestService } from '../../../services/request/request.service';

@Injectable()
export class DashboardService extends BaseService {

  vehicleInfo: any;

  private pieChartOption: any = {
    title: {
      text: 'Parked Vehicles',
      subtext: '(all vehicles currently parked)',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
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

  private readonly charts: EChartsType[] = [];

  constructor(
    private request: RequestService,
    private titleCase: TitleCasePipe
  ) {
    super();
  }

  protected override onDestroy(): void {
    this.disposeCharts();
    super.onDestroy();
  }

  getVehiclesInfo(date: Date): void {
    const filter = format(date, 'MM-DD-YYYY');
    this.vehicleInfo = this.request.getVehiclesInfo(filter);
  }

  getParkedVehicles(): void {
    const data = this.request.getParkedVehicles();
    this.pieSubject.next(data);
  }

  drawPieChart(parkedVehicles: any[]): void {
    const el = document.getElementById('pie')!;
    const chart = echarts.init(el, 'macarons'); // default theme 'macarons'
    this.addChart(chart);
    const data = parkedVehicles.map(x => {
      return {
        name: this.titleCase.transform(x.type),
        value: x.options?.length || 0
      };
    });
    this.pieChartOption.series.data.push(...data);
    chart.setOption(this.pieChartOption);

    this.addResizeEvent(chart, this.pieChartOption)
  }

  private addResizeEvent(chart: EChartsType, opts?: ResizeOpts): void {
    this.addSubscription(
      fromEvent(window, 'resize').subscribe((_event: any) => {
        if (!chart || this.isDestroyed) {
          return;
        }
        chart.resize(opts);
      }), chart.id
    );
  }

  private addChart(chart: EChartsType): void {
    if (this.charts.includes(chart)) {
      return;
    }
    this.charts.push(chart);
  }

  private disposeCharts(): void {
    console.log('disposeCharts', this.charts.length);
    const length = this.charts.length;
    for (let i = 0; i < length; i++) {
      const chart = this.charts[i];
      this.disposeChart(chart);
    }
    this.charts.length = 0;
  }

  private disposeChart(chart: EChartsType): void {
    if (chart && !chart.isDisposed()) {
      chart.dispose();
    }
  }

}
