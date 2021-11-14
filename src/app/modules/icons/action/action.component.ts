import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Icon } from '../../../constants/icons.constants';

@Component({
	selector: 'app-action',
	templateUrl: './action.component.html',
	styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
	@Input() ariaLabel = '';
	@Input() enabled = false;
	@Input() icon: Icon;

	@Output() actionSelected = new EventEmitter<void>();

	constructor() { }

	ngOnInit(): void {
	}

	onActionClick() {
		this.actionSelected.emit();
	}
}
