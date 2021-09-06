import { Component, EventEmitter, Input, Output } from '@angular/core';

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
export class MenuComponent {
	@Input() menu = MENU_LIST;
	@Input() menuItems = MENU;
	@Input() set level(lvl: number) {
		this.lvl = lvl;
		this.padding = 16 * (this.lvl + 1);
	}
	@Output() menuChanged = new EventEmitter<void>();

	public lvl = 0;
	public padding = 16;

	constructor(
		private navService: NavService,
	) { }

	public onMenuClick(item: MenuItem): void {
		if (NavUtils.getSubMenu(item)) {
			this.menuItems[item].expanded = !this.menuItems[item].expanded;
		} else {
			this.navService.navigate(this.menuItems[item].route, this.menuItems[item].title);
			this.navService.closeNavMenu();
		}
	}

	public toggleMenu(): void {
		this.menuChanged.emit();
	}
}
