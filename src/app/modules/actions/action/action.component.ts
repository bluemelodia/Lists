import { Component, Input, OnInit } from '@angular/core';

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

	constructor() { }

	ngOnInit(): void {
	}
}
