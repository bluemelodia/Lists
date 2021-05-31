import { Component, OnInit } from '@angular/core';
import { 
  MENU,
  MenuItem,
  MENU_ITEMS,
} from '../constants/nav.constants';
import { NavUtils } from '../utils/nav.utils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menu = MENU;
  public menuItems = MENU_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

  public onMenuClick(item: MenuItem) {
    if (NavUtils.getSubMenu(item)) {
      this.menuItems[item].expanded = !this.menuItems[item].expanded;
      console.log("===> expanded: ", this.menuItems[item].expanded);
    } else {
      // TODO: route
    }
  }
}
