import { Component, HostBinding } from '@angular/core';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private nav: NavService) {}

  @HostBinding('class') containerClasses = 'flex-centered__column full-viewport';

  title = 'lists';

  closeMenu() {
    this.nav.closeNavMenu();
  }
}
