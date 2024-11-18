import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { ResizeSensor, ResizeSensorCallback } from 'css-element-queries';
import * as echarts from 'echarts';
import { EChartsType, ResizeOpts } from 'echarts';
import { fromEvent } from 'rxjs';
import { Base } from '../../commons/base';

@Injectable()
export class ChartService extends Base {

  private readonly charts: EChartsType[] = [];

  private readonly sensors: ResizeSensor[] = [];

  get isMobile(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

  constructor(private platform: Platform) {
    super()
  }

  protected override onDestroy(): void {
    this.detachSensors();
    this.disposeCharts();
    super.onDestroy();
  }

  draw(id: string, opt: any): void {
    const el = document.getElementById(id);
    const chart = echarts.init(el);
    this.addChart(chart);
    chart.setOption(opt);
    if (this.isMobile && el) {
      this.addResizeSensor(el, chart, opt); // initial resizing on small device
    }
    this.addResizeListener(chart);
  }

  private addResizeSensor(el: HTMLElement, chart: EChartsType, opts?: ResizeOpts): void {
    const callback: ResizeSensorCallback = () => {
      if (!chart || this.isDestroyed) {
        return;
      }
      chart.resize(opts);
      sensor.detach(callback);
    };
    const sensor = new ResizeSensor(el, callback);
    this.sensors.push(sensor);
  }

  private addResizeListener(chart: EChartsType, opts?: ResizeOpts): void {
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

  private detachSensors(): void {
    const len = this.sensors.length;
    for (let i = 0; i < len; i++) {
      const sensor = this.sensors[i];
      sensor.detach();
    }
    this.sensors.length = 0;
  }

  private disposeCharts(): void {
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
