import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { NavService } from "../../services/nav.service";

@Component({
	selector: "ml-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
	public title$ = new Subject<string>();

	private ngUnsubscribe$ = new Subject<void>();

	constructor(private navService: NavService) { }

	public ngOnInit(): void {
		this.navService.onMenuTitleChange$
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((title: string) => {
				this.title$.next(title);
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
