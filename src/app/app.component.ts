import { Component } from '@angular/core';
import { NavbarComponent } from './components/ts/navbar.component';
import { FooterComponent } from './components/ts/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dkteam-dev';
}
