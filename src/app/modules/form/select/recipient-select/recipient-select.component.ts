import { Component, Input } from '@angular/core';

import { AddRecipient } from '../../../../interfaces/service/service-objects.interface';
import { SelectComponent } from '../select.component';

import { ClickService } from '../../../../services/click.service';
import { FocusService } from '../../../../services/focus.service';

@Component({
  selector: 'app-recipient-select',
  templateUrl: './recipient-select.component.html',
  styleUrls: ['./recipient-select.component.css']
})
export class RecipientSelectComponent extends SelectComponent {
	@Input() list: AddRecipient[];

	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	ngOnInit(): void {
	}
}
