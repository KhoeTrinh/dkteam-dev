import { NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ChartComponent } from '../../../components/ts/chart.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgStyle, ChartComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminComponent implements OnInit {
  numberDegree: number[] = [];

  targetValue: any = [1600, 123, 100, 100];

  dashboardData: any = {
    type: 'week',
    data: {
      labels: ['New User', 'Nf login', 'Nf products', 'Incomes'],
      data: [
        [12, 19, 3, 5, 2, 3, 15],
        [1, 2, 3, 4, 5, 6, 7],
        [2, 5, 1, 6, 3, 6, 3],
        [12, 5, 23, 6, 13, 1, 5],
      ],
      color: [
        [59, 130, 247],
        [23, 76, 200],
        [200, 123, 234],
        [123, 0, 123],
      ],
      value: [100, 100, 40, 99],
    },
  };

  ngOnInit(): void {
    this.numberDegree = this.targetValue.map((target: any, index: number) => {
      const actual = this.dashboardData.data.value[index];
      return actual ? Math.round((actual / target) * 100) : 0;
    });
  }
}
