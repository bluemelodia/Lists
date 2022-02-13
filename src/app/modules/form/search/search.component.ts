import { Component, EventEmitter, Output } from '@angular/core';
import { Icon } from '../../../constants/icons.constants';

@Component({
	selector: 'ml-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {
	@Output() search = new EventEmitter<string>();

	public icon = Icon;
	public query = '';

	public onSearch(): void {
		this.search.emit(this.query);
	}
}
