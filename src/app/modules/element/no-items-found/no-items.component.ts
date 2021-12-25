import { Component, Input } from '@angular/core';

import { HeaderLevel } from '../../../interfaces/header.interface';
import { NoItemConfig } from '../../../interfaces/no-items.interface';

@Component({
	selector: 'app-no-items',
	templateUrl: './no-items.component.html',
	styleUrls: ['./no-items.component.css']
})
export class NoItemsComponent {
	@Input() config: NoItemConfig;

	public headerLevel = HeaderLevel;
}
