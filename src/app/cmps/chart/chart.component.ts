import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { ChartStyle } from 'src/app/models/chart-style.model';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  constructor() {
    Chart.register(Annotation);
  }

  @Input() data: any;
  @Input() chartStyle: ChartStyle;

  today: Date;
  lineChartData: ChartConfiguration['data'];
  intervalId: NodeJS.Timer;

  ngOnInit() {
    this.startTimer();
    // this.lineChartData.datasets[0].data = this.data.values;
    const { values, name } = this.data;
    const data = values?.map((coords: { x: number; y: number }) => coords.y);
    const labels = values?.map((coords: { x: number; y: number }) =>
      new Date(coords.x * 1000).toLocaleDateString()
    );

    const chartData = {
      datasets: [
        {
          ...this.chartStyle,
          data,
          label: name,
          fill: 'origin',
        },
      ],
      labels,
    };

    this.lineChartData = chartData;
  }

  startTimer() {
    this.today = new Date();
    this.intervalId = setInterval(() => {
      this.today = new Date();
    }, 3000);
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: '#333333',
        },
        ticks: {
          color: '#333',
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  chartClicked({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    // console.log(event, active);
    console.log();
  }

  chartHovered({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    // console.log(event, active);
  }
}
