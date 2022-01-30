import { 
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";

import { CalendarType } from "./interfaces/calendar/calendar.interface";

import { CalendarService } from './services/calendar.service';
import { LoadingService } from "./services/loading.service";
import { NavService } from "./services/nav.service";
import { UserService } from "./services/user.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
	@HostBinding("class") containerClasses = "flex-centered__column full-viewport";
	
	public loadingState$ = new Subject<boolean>();
	public loginState$ = new Subject<boolean>();

	constructor(
		private calendarService: CalendarService,
		private loadingService: LoadingService,
		private navService: NavService,
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
			});
	}

	isLoggedIn(): boolean {
		return !!this.userService.getUser();
	}

	closeMenu(): void {
		this.navService.closeNavMenu();
	}
}
