import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderLevel } from '../../../interfaces/header.interface';
import { GiftAction } from '../../../interfaces/event/gift.interface';
import { MeetingAction } from '../../../interfaces/event/meeting.interface';
import { RecipientAction } from '../../../interfaces/event/recipient.interface';
import { NoItem } from '../../../interfaces/no-items.interface';

import { EditService } from '../../../services/edit.service';

@Component({
	selector: 'ml-no-items',
	templateUrl: './no-items.component.html',
	styleUrls: ['./no-items.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoItemsComponent {
	@Input() config: NoItem;

	public headerLevel = HeaderLevel;

	constructor(
		private editService: EditService,
		private router: Router,
	) { }

	/** 
	* If the user is performing an add operation, clear
	* the previously-stored item from session storage.
	*/
	public onActionItemClick(): void {
		switch (this.config.action) {
			case GiftAction.Add:
			case MeetingAction.Add:
			case RecipientAction.Add:
				this.editService.clearItem(this.config.topic);
				break;
		}

		/**
		* Marked as non-awaited.
		*/
		void this.router.navigate([this.config.route], {
			queryParams: { title: this.config.actionText }
		});
	}
}
