import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavService } from '../../services/nav.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private ngUnsubscribe$ = new Subject<void>();
	public title$ = new Subject<string>();

	constructor(private navService: NavService) { }

	ngOnInit(): void {
		this.navService.onMenuTitleChange$
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((title: string) => {
				this.title$.next(title);
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
