import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { 
  MENU,
  MenuItem,
  MENU_LIST,
} from '../constants/nav.constants';
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

  constructor(private router: Router) { }

  ngOnInit(): void {}

  public onMenuClick(item: MenuItem) {
    console.log("===> item: ", item);
    if (NavUtils.getSubMenu(item)) {
      this.menuItems[item].expanded = !this.menuItems[item].expanded;
    } else {
      console.log("===> close the menu");
      this.router.navigate([this.menuItems[item].route]);
      this.toggleMenu(false);
    }
  }

  public toggleMenu() {
    this.onMenuChange.emit();
  }
}
