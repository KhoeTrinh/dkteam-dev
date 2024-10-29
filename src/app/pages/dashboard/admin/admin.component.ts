import { NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartComponent } from '../../../components/ts/chart.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgStyle, ChartComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminComponent {
  numberDegree: number = 50;

  dashboardData: any = {
    type: 'week',
    data: {
      labels: [
        'New User',
        'Number of login attempts',
        'Number of products',
        'Incomes',
      ],
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
    },
  };
}
