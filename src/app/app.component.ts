import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private navService: NavService,
    private route: ActivatedRoute,
  ) {}

  @HostBinding('class') containerClasses = 'flex-centered__column full-viewport';

  title = 'lists';

  ngOnInit() {
    this.setupSubscriptions();
  }

  /**
   * Set the header title according to the route.
   */
  setupSubscriptions() {
    this.route.queryParams.subscribe((params) => {
        this.navService.setTitle(params?.title);
    });
  }

  closeMenu() {
    this.navService.closeNavMenu();
  }
}
