import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, finalize, take, takeUntil } from 'rxjs/operators';

import { AddGift, GiftDetails } from '../../../interfaces/event/gift.interface';
import { RecipientList } from '../../../interfaces/event/recipient.interface';
import { ResponseStatus } from '../../../interfaces/response.interface';
import { AddRecipient } from '../../../interfaces/service/service-objects.interface';

import { GiftService } from '../../../services/gift.service';
import { LoadingService } from '../../../services/loading.service';
import { RecipientService } from '../../../services/recipient.service';

interface GiftResponse {
	error: boolean,
	gifts?: AddGift[],
	recipients?: AddRecipient[]
}

@Component({
	selector: 'ml-planner-gifts',
	templateUrl: './gifts.component.html',
	styleUrls: ['./gifts.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftsComponent implements OnInit, OnDestroy {
	@HostBinding("class") public get hostClasses(): string {
		const hostStyles = [];

		if (this.isLoading) {
			hostStyles.push("hide-container");
		}

		return hostStyles.join(" ");
	}

	private _giftResponse$ = new Subject<GiftResponse>();
	public giftResponse$ = this._giftResponse$.asObservable();

	private isLoading = false;
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private giftService: GiftService,
		private loadingService: LoadingService,
		private recipientService: RecipientService,
	) { }

	public ngOnInit(): void {
		this.addSubscriptions();
		this.getRecipients();
	}

	private addSubscriptions(): void {
		this.loadingService.loadingChanged$
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((loading: boolean) => {
				this.isLoading = loading;
			});
	}

	/**
	* Fetch the latest list of birthdays. Refresh should be set to true if
	* we're fetching the birthdays list as a result of a patch - otherwise,
	* it should be false.
	*/
	public getRecipients(): void {
		this.loadingService.startLoading();
		forkJoin([
			this.recipientService.getRecipients(),
			this.giftService.getGifts()
		])
			.pipe(
				catchError((error: ResponseStatus) => {
					if (error === ResponseStatus.ERROR) {
						this._giftResponse$.next({
							error: true
						});
					}
					this.loadingService.stopLoading();
					return of(null);
				}),
				finalize(() => {
					this.loadingService.stopLoading();
				}),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((lists: [RecipientList, AddGift[]]) => {
				if (lists && lists[0]?.list?.length > 0 && lists[1]?.length > 0) {
					this.mapGiftsToRecipients(lists[0].list, lists[1]);
				} else {
					this._giftResponse$.next({
						error: !lists,
						gifts: lists ? lists[1] : [],
						recipients: lists ? lists[0]?.list : []
					});
				}
			});
	}

	private mapGiftsToRecipients(recipients: AddRecipient[], gifts: AddGift[]): void {
		const giftDetails: GiftDetails[] = [];
		gifts.forEach((gift: AddGift) => {
			recipients.forEach((recipient: AddRecipient) => {
				if (recipient.uuid === gift.recipientId) {
					const giftDetail = { ...gift, recipient: recipient };
					giftDetails.push(giftDetail);
				}
			});
		});

		this._giftResponse$.next({
			error: false,
			gifts: giftDetails,
			recipients: recipients
		});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
