import { Component, Input, OnInit } from '@angular/core';
import { 
  MENU,
  MenuItem,
  MENU_LIST,
} from '../constants/nav.constants';
import { NavUtils } from '../utils/nav.utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menu = MENU_LIST;
  @Input() menuItems = MENU;
  @Input() set level(lvl: number) {
    this.lvl = lvl;
    this.padding = 16 * (this.lvl + 1);
  }
  public lvl = 0;
  public padding = 16;

  constructor() { }

  ngOnInit(): void {
  }

  public onMenuClick(item: MenuItem) {
    console.log("===> menu: ", this.menu);
    console.log("menuItems: ", this.menuItems)
    if (NavUtils.getSubMenu(item)) {
      this.menuItems[item].expanded = !this.menuItems[item].expanded;
    } else {
      // TODO: route
    }
  }
}
