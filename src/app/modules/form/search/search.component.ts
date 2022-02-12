import { Component, EventEmitter, Output } from '@angular/core';
import { Icon } from '../../../constants/icons.constants';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {
	@Output() search = new EventEmitter<string>();

	public icon = Icon;
	public query: string;

	public onSearch(): void {
		this.search.emit(this.query);
	}
}
