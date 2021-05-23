import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostBinding('class') containerClasses = 'flex-centered__column flex-container__dynamic-scroll full-viewport';

  title = 'lists';
}
