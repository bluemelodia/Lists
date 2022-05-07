import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";

import { SortOption } from "../../../../interfaces/event/event.interface";

import { SelectComponent } from "../select.component";

import { FocusService } from "../../../../services/focus.service";

@Component({
	selector: "ml-sort-select",
	templateUrl: "./sort-select.component.html",
	styleUrls: [
		"../select.component.css",
		"./sort-select.component.css"
	]
})
export class SortSelectComponent extends SelectComponent {
	@Input() list: SortOption[];

	@Output() sortSelected = new EventEmitter<SortOption>();

	public selectedSort: SortOption;

	/** 
	 * Inherit the services from the base class,
	 * instead of declaring our own (by adding private).
	 */
	constructor(
		_element: ElementRef,
		_focus: FocusService
	) {
		super(_element, _focus);
	}

	selectOption(option: SortOption): void {
		this.showOptionList = false;
		this.selectedSort = option;
		this.sortSelected.emit(option);
	}
}