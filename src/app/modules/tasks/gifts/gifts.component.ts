import { Component, HostBinding, OnInit } from '@angular/core';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, finalize, take, takeUntil } from 'rxjs/operators';

import { DialogAction, DialogPage } from '../../../interfaces/dialog.interface';
import { RecipientList } from '../../../interfaces/event/recipient.interface';
import { ResponseStatus } from '../../../interfaces/response.interface';

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
		.subscribe((lists: [RecipientList[], any]) => {
			console.info("🍰 ✅ GiftComponent ---> getGifts, received gifts: ", lists);
		});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
