import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsType, ResizeOpts } from 'echarts';
import 'echarts/theme/macarons.js';
import { fromEvent } from 'rxjs';
import { BaseService } from '../../../commons/base.service';
import { format } from '../../../models/time';
import { RequestService } from '../../../services/request/request.service';

@Injectable()
export class DashboardService extends BaseService {

  vehicleInfo: any;

  private parkedVehicles: any[] = [];

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

  constructor(
    private request: RequestService,
    private titleCase: TitleCasePipe
  ) {
    super();
  }

  getVehiclesInfo(date: Date): void {
    const filter = format(date, 'MM-DD-YYYY');
    this.vehicleInfo = this.request.getVehiclesInfo(filter);
  }

  getParkedVehicles(): void {
    this.parkedVehicles = this.request.getParkedVehicles();
  }

  drawPieChart(): void {
    const el = document.getElementById('pie')!;
    const chart = echarts.init(el, 'macarons'); // default theme 'macarons'
    const data = this.parkedVehicles.map(x => {
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
    this.addSubscription(fromEvent(window, 'resize').subscribe((_event: any) => {
      if (!chart || this.isDestroyed) {
        return;
      }
      chart.resize(opts);
    }), chart.id);
  }

}
