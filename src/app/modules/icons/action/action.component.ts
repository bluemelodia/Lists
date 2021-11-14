import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActionIcon } from '../../../constants/actions.constants';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
	@Input() ariaLabel = '';
	@Input() enabled = false;
	@Input() icon: ActionIcon;

	@Output() actionSelected = new EventEmitter<void>();

	constructor() { }

	ngOnInit(): void {
	}

	onActionClick() {
		this.actionSelected.emit();
	}
}
