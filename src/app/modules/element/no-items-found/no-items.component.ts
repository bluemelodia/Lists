import { Component, Input, OnInit } from '@angular/core';

import { HeaderLevel } from '../../../interfaces/header.interface';
import { NoItemConfig } from '../../../interfaces/no-items.interface';

@Component({
	selector: 'app-no-items',
	templateUrl: './no-items.component.html',
	styleUrls: ['./no-items.component.css']
})
export class NoItemsComponent implements OnInit {
	@Input() config: NoItemConfig;

	headerLevel = HeaderLevel;

	constructor() { }

	ngOnInit(): void {
	}

}
