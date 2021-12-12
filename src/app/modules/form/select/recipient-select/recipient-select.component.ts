import { Component } from '@angular/core';

import { ClickService } from '../../../../services/click.service';
import { FocusService } from '../../../../services/focus.service';

import { SelectComponent } from '../select.component';

@Component({
  selector: 'app-recipient-select',
  templateUrl: './recipient-select.component.html',
  styleUrls: ['./recipient-select.component.css']
})
export class RecipientSelectComponent extends SelectComponent {

	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	ngOnInit(): void {
	}
}
