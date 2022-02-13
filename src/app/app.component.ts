import {
	ChangeDetectorRef,
	Component,
	HostBinding,
	OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";

import { CalendarType } from "./interfaces/calendar/calendar.interface";

import { CalendarService } from './services/calendar.service';
import { LoadingService } from "./services/loading.service";
import { NavService } from "./services/nav.service";
import { UserService } from "./services/user.service";

@Component({
	selector: "ml-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
	@HostBinding("class") containerClasses = "ml-flex-column--centered ml-container--full-viewport";

	public loadingState$ = new BehaviorSubject<boolean>(false);
	public loginState$ = new BehaviorSubject<boolean>(false)

	constructor(
		private calendarService: CalendarService,
		private loadingService: LoadingService,
		private navService: NavService,
		private ref: ChangeDetectorRef,
		private route: ActivatedRoute,
		private userService: UserService,
	) { }

	ngOnInit(): void {
		this.setupSubscriptions();
		this.calendarService.getCalendar(CalendarType.Lunar);
	}

	/**
	 * Set the header title according to the route.
	 */
	setupSubscriptions(): void {
		console.log("[App Component] Start subs.");

		this.route.queryParams.subscribe((params) => {
			this.navService.setTitle(params?.title);
		});

		this.loadingService.loadingChanged$
			.subscribe((loadingState: boolean) => {
				this.loadingState$.next(loadingState);
				this.ref.detectChanges();
			});
	}

	isLoggedIn(): boolean {
		return !!this.userService.getUser();
	}

	closeMenu(): void {
		this.navService.closeNavMenu();
	}
}
