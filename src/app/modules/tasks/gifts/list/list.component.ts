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

import { Event } from '../../../../constants/events.contants';
import { Icon } from '../../../../constants/icons.constants';

import { DialogAction, DialogPage } from '../../../../interfaces/dialog.interface';
import { HeaderLevel } from '../../../../interfaces/header.interface';
import { GiftDetails } from '../../../../interfaces/event/gift.interface';
import { NO_ITEMS_CONFIG } from '../../../../interfaces/no-items.interface';
import { ResponseStatus } from '../../../../interfaces/response.interface';

import { DialogService } from '../../../../services/dialog.service';
import { GiftService } from '../../../../services/gift.service';
import { take, takeUntil } from 'rxjs/operators';

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

	/*export interface Gift {
		recipientId: string;
		uuid: string;
		occasion: Occasion;
		year: number;
		giftImage?: EventImage;
		description: string;
		price: number;
	}
	
	export interface AddGift extends Gift {
		id: string;
		image?: string;
		filename?: string;
	}
	
	export interface GiftDetails extends Gift {
		recipient: Recipient
	}*/

	@Input() list: GiftDetails[];
	@Input() header: string;
	@Output() deletedGift = new EventEmitter();

	headerLevel = HeaderLevel;
	noItemsConfig = NO_ITEMS_CONFIG[Event.Gift];

	public icon = Icon;
	public readonly base64Prefix = "data:image/jpeg;base64,";
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
		private giftService: GiftService,
		private router: Router,
	) { }

	public ngOnInit(): void {
	}

	public deleteGift(uuid: string): void {
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
