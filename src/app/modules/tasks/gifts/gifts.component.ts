import { Component, HostBinding, OnInit } from '@angular/core';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, finalize, take, takeUntil } from 'rxjs/operators';

import { DialogAction, DialogPage } from '../../../interfaces/dialog.interface';
import { AddGift, GiftDetails } from '../../../interfaces/event/gift.interface';
import { RecipientList } from '../../../interfaces/event/recipient.interface';
import { ResponseStatus } from '../../../interfaces/response.interface';
import { AddRecipient } from '../../../interfaces/service/service-objects.interface';

import { DialogService } from '../../../services/dialog.service';
import { GiftService } from '../../../services/gift.service';
import { LoadingService } from '../../../services/loading.service';
import { RecipientService } from '../../../services/recipient.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
	private giftDetailsList$ = new Subject<GiftDetails[]>();
	public giftList$ = this.giftDetailsList$.asObservable();

	private recipientsList$ = new Subject<AddRecipient[]>();
	public recipients$ = this.recipientsList$.asObservable();

	private isLoading = false;
	private ngUnsubscribe$ = new Subject<void>();

	@HostBinding("class") public get hostClasses(): string {
		const hostStyles = [];

		if (this.isLoading) {
			hostStyles.push("hide-container");
		}

		return hostStyles.join(" ");
	}

	constructor(
		private giftService: GiftService,
		private dialogService: DialogService,
		private loadingService: LoadingService,
		private recipientService: RecipientService,
	) { }


	public ngOnInit(): void {
		this.addSubscriptions();
		this.getRecipients();
	}

	private addSubscriptions() {
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
			catchError(() => {
				this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Get, DialogPage.Gift);
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
			console.info("🍰 ✅ GiftComponent ---> getGifts, received gifts: ", lists);
			if (lists[0]?.list?.length > 0 && lists[1]?.length > 0) {
				this.mapGiftsToRecipients(lists[0].list, lists[1]);
			} else {
				this.giftDetailsList$.next([]);
			}
			this.recipientsList$.next(lists[0]?.list);
		});
	}

	private mapGiftsToRecipients(recipients: AddRecipient[], gifts: AddGift[]) {
		const giftDetails: GiftDetails[] = [];
		gifts.forEach((gift: AddGift) => {
			recipients.forEach((recipient: AddRecipient) => {
				if (recipient.uuid === gift.recipientId) {
					const giftDetail = { ...gift, recipient: recipient };
					giftDetails.push(giftDetail);
				}
			});
		});
		console.log("[Gifts Component] Display gift list: ", giftDetails);
		this.giftDetailsList$.next(giftDetails);
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
