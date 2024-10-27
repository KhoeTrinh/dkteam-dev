import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ChartComponent } from '../../../components/ts/chart.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgStyle, ChartComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  numberDegree: number = 99
}
