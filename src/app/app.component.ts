import { Component } from '@angular/core';
import { NavbarComponent } from './components/ts/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dkteam-dev';
}
