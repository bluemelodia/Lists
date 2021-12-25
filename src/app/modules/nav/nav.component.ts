import { Component, HostBinding, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { NavService } from "../../services/nav.service";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnDestroy {
	@HostBinding("class.open") public open = false;

	public showMenu = false;

	private ngUnsubscribe$ = new Subject<void>();
	private onMenuChange$ = this.navService.onMenuChange$;

	constructor(private navService: NavService) {
		this.onMenuChange$
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((menuState: boolean) => {
				this.setMenuOpen(menuState);
			});
	}

	public toggleMenu(): void {
		this.showMenu = !this.showMenu;
		this.open = this.showMenu;
	}

	public setMenuOpen(state: boolean): void {
		this.showMenu = state;
		this.open = this.showMenu;
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
