import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { 
  MENU,
  MenuItem,
  MENU_LIST,
} from '../constants/nav.constants';
import { NavService } from '../../../services/nav.service';
import { NavUtils } from '../utils/nav.utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Input() menu = MENU_LIST;
  @Input() menuItems = MENU;
  @Input() set level(lvl: number) {
    this.lvl = lvl;
    this.padding = 16 * (this.lvl + 1);
  }
  @Output() onMenuChange = new EventEmitter<void>();

  public lvl = 0;
  public padding = 16;

  constructor(
    private nav: NavService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  public onMenuClick(item: MenuItem) {
    if (NavUtils.getSubMenu(item)) {
      this.menuItems[item].expanded = !this.menuItems[item].expanded;
    } else {
      console.log("===> navigate to route: ", this.menuItems[item]);
      this.router.navigate([this.menuItems[item].route],{ queryParams: { title: this.menuItems[item].title }});
      this.nav.closeNavMenu();
    }
  }

  public toggleMenu() {
    this.onMenuChange.emit();
  }
}
