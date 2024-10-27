import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: '../html/chart.component.html',
  styleUrls: ['../css/chart.component.css'],
})
export class ChartComponent implements AfterViewInit {
  private chart: Chart | undefined;

  @ViewChild('chart') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Week 1',
          'Week 2',
          'Week 3',
          'Week 4',
          'Week 5',
          'Week 6',
          'Week 7',
        ],
        datasets: [
          {
            label: 'User Growth',
            data: [12, 19, 3, 5, 2, 3, 15],
            fill: true,
            backgroundColor: 'rgba(59, 130, 247, 0.2)',
            borderColor: 'rgba(59, 130, 247, 1)',
            tension: 0.1,
          },
          {
            label: 'New Users',
            data: [5, 10, 2, 8, 3, 6, 12],
            fill: true,
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            borderColor: 'rgba(34, 197, 94, 1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
          },
        },
      },
    });
  }
}
