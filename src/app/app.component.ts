import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { VAPID_PUBLIC_KEY } from './constants/app.constants';

import { LoadingService } from './services/loading.service';
import { NavService } from './services/nav.service';
import { PushNotificationsService } from './services/push-notifications.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	constructor(
		private loadingService: LoadingService,
		private navService: NavService,
		private pushNotificationsService: PushNotificationsService,
		private route: ActivatedRoute,
		private swPush: SwPush,
	) { }

	@HostBinding('class') containerClasses = 'flex-centered__column full-viewport';

	title = 'lists';

	public loadingState$ = new Subject<boolean>();

	ngOnInit(): void {
		this.setupSubscriptions();
	}

	/**
	 * Set the header title according to the route.
	 */
	setupSubscriptions(): void {
		this.route.queryParams.subscribe((params) => {
			this.navService.setTitle(params?.title);
		});

		this.loadingService.loadingChanged$
			.subscribe((loadingState: boolean) => {
				this.loadingState$.next(loadingState);
			});

		/**
		 * Emits the push subscription object if user allows notifications.
		 */
		this.swPush.requestSubscription({
			serverPublicKey: VAPID_PUBLIC_KEY
		})
			.then(sub => this.pushNotificationsService.addPushSubscriber(sub).subscribe())
			.catch((err) => {
				console.error("Could not subscribe to notifications: ", err);
			});
	}

	closeMenu(): void {
		this.navService.closeNavMenu();
	}
}
