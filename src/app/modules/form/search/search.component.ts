import { Component, EventEmitter, Output } from '@angular/core';
import { Icon } from '../../../constants/icons.constants';

@Component({
	selector: 'ml-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {
	@Output() clear = new EventEmitter<void>();
	@Output() search = new EventEmitter<string>();

	public icon = Icon;
	public query = '';

	public onSearch(): void {
		if (this.query.length > 0) {
			this.search.emit(this.query);
		} else {
			this.onClear();
		}
	}

	public onClear(): void {
		this.clear.emit();
	}
}
