import { 
	Component, 
	EventEmitter, 
	HostBinding, 
	Input, 
	OnDestroy, 
	OnInit, 
	Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Event } from '../../../../constants/events.contants';
import { Icon } from '../../../../constants/icons.constants';

import { DialogAction, DialogPage } from '../../../../interfaces/dialog.interface';
import { SortOption } from '../../../../interfaces/event/event.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';
import { GiftDetails, GiftField, GiftSortOptions } from '../../../../interfaces/event/gift.interface';
import { NO_ITEMS_CONFIG } from '../../../../interfaces/no-items.interface';
import { ResponseStatus } from '../../../../interfaces/response.interface';
import { AddRecipient } from '../../../../interfaces/service/service-objects.interface';

import { DialogService } from '../../../../services/dialog.service';
import { GiftService } from '../../../../services/gift.service';

@Component({
  selector: 'task-gifts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
	@HostBinding("class") public get hostClasses(): string {
		let hostStyles = [];
		return hostStyles.join(" ");
	}

	@Input() set list(list: GiftDetails[]) {
		this.fullList = list;
		this.giftList$.next(list);
	}
	@Input() recipients: AddRecipient[];
	@Input() header: string;
	@Output() deletedGift = new EventEmitter();

	headerLevel = HeaderLevel;
	noItemsConfig = NO_ITEMS_CONFIG[Event.Gift];

	public icon = Icon;
	public giftSortOptions = GiftSortOptions;
	public readonly base64Prefix = "data:image/jpeg;base64,";

	private fullList: GiftDetails[];
	private giftList$ = new Subject<GiftDetails[]>();
	public list$ = this.giftList$.asObservable();
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
		private giftService: GiftService,
		private router: Router,
	) { }

	public ngOnInit(): void {}

	public onSortSelected(option: SortOption) {
		switch (option.fieldName) {
			case GiftField.Budget:
				this.fullList.sort(this.sortByPrice);
				break;
			case GiftField.Occasion:
				this.fullList.sort(this.sortByOccasion);
				break;
			case GiftField.RecipientName:
				this.fullList.sort(this.sortByName);
				break;
			case GiftField.Year:
				this.fullList.sort(this.sortByYear);
				break;
			default:
				break;
		}
	}

	private sortByName(a: GiftDetails, b: GiftDetails): number {
		return a.recipient?.name.localeCompare(b.recipient?.name);
	}

	private sortByOccasion(a: GiftDetails, b: GiftDetails): number {
		return a.occasion.localeCompare(b.occasion);
	}

	private sortByPrice(a: GiftDetails, b: GiftDetails): number {
		return a.price - b.price;
	}

	private sortByYear(a: GiftDetails, b: GiftDetails): number {
		return a.year - b.year;
	}

	public filterByRecipient(recipient: AddRecipient) {
		const filteredList = this.fullList.filter((giftDetails: GiftDetails) => {
			return giftDetails.recipientId === recipient.uuid;
		});
		this.giftList$.next(filteredList);
	}

	public resetRecipientFilter() {
		this.giftList$.next(this.fullList);
	}

	public onDeleteClicked(uuid: string): void {
		this.giftService.deleteGift(uuid)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((response: ResponseStatus) => {
				this.dialogService.showResponseStatusDialog(response, DialogAction.Delete, DialogPage.Gift);

				if (response === ResponseStatus.SUCCESS) {
					this.deletedGift.emit(null);
				}
			});
	}

	public editGift(gift: GiftDetails): void {
		this.router.navigate(["/events/edit-gift"], {
			queryParams: { title: 'Edit Gift', gift: JSON.stringify(gift) }
		});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
