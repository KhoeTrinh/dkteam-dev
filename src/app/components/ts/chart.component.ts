import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
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

  @Input() data: any = null

  @ViewChild('chart') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.createChart();
    console.log(this.data);
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    const timeline = {
      week: [
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4',
        'Week 5',
        'Week 6',
        'Week 7',
      ],
      month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      year: [],
    };

    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const labels = this.data.type === 'week' ? timeline.week
    : this.data.type === 'month' ? timeline.month
    : this.data.type === 'year' ? timeline.year
    : [];

    const datasets = this.data.data.labels.map((label: string, i: number) => ({
      label: label,
      data: this.data.data.data[i],
      fill: true,
      backgroundColor: `rgba(${this.data.data.color[i].join(',')}, 0.2)`,
      borderColor: `rgba(${this.data.data.color[i].join(',')}, 1)`,
      tension: 0.1,
    }))

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                size: 12,
                weight: 'bold',
              },
              color: '#4a4a4a',
              padding: 15,
              usePointStyle: true,
              boxWidth: 10,
              boxHeight: 10,
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 10,
            cornerRadius: 4,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#4a4a4a',
              font: {
                size: 10,
              },
            },
          },
          y: {
            grid: {
              color: 'rgba(200, 200, 200, 0.3)',
            },
            ticks: {
              color: '#4a4a4a',
              font: {
                size: 10,
              },
              padding: 8,
            },
          },
        },
        elements: {
          line: {
            tension: 0.3,
          },
          point: {
            radius: 3,
            hoverRadius: 5,
          },
        },
      },

    });
  }
}
