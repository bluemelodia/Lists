import { Component, EventEmitter, Input, Output } from "@angular/core";

import { SortOption } from "../../../../interfaces/event/event.interface";

import { SelectComponent } from "../select.component";

import { ClickService } from "../../../../services/click.service";
import { FocusService } from "../../../../services/focus.service";

@Component({
	selector: "app-sort-select",
	templateUrl: "./sort-select.component.html",
	styleUrls: [
		"../select.component.css",
		"./sort-select.component.css"
	]
})
export class SortSelectComponent extends SelectComponent {
	@Input() list: SortOption[];
	
	@Output() onSortSelected = new EventEmitter<SortOption>();

	public selectedSort: SortOption;

	/** 
	 * Inherit the services from the base class,
	 * instead of declaring our own (by adding private).
	 */
	constructor(
		_clickService: ClickService,
		_focus: FocusService
	) {
		super(_clickService, _focus);
	}

	selectOption(option: SortOption): void {
		this.showOptionList = false;
		this.selectedSort = option;
		this.onSortSelected.emit(option);
	}
}