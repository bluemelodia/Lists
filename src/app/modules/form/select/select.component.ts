/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

import { ClickService } from "../../../services/click.service";
import { FocusService } from "../../../services/focus.service";
import { FocusEvent, Key } from "../../../interfaces/focus.interface";

@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.css"]
})
export class SelectComponent implements OnInit, OnDestroy {
	@Input() placeholder = "";
	@Input() id: string;
	@Input() default: string;
	@Input() options: Set<string>;
	@Input() selected: string;

	@Output() optionSelected = new EventEmitter<string>();

	@ViewChild("select", { read: ElementRef, static: false }) select: ElementRef;

	public showOptionList = false;
	private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

	constructor(
		private clickService: ClickService,
		private focus: FocusService
	) { }

	ngOnInit(): void {
		this.clickService.clicked
			.pipe(takeUntil(this.destroyed$))
			.subscribe(target => {
				this.onDocumentClick(target);
			});

		this.focus.keyPressed$()
			.pipe(
				filter((event: FocusEvent) => event.elementID === this.id),
				takeUntil(this.destroyed$)
			)
			.subscribe((event: FocusEvent) => {
				switch (event.key) {
					case Key.Escape:
						if (this.showOptionList) {
							this.showHideOptions();
						}
						break;
				}
			});
	}

	ngOnDestroy(): void {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	onDocumentClick(target: any): void {
		if (!this.select.nativeElement.contains(target)) {
			if (this.showOptionList) {
				this.showHideOptions();
			}
		}
	}

	showHideOptions(): void {
		this.showOptionList = !this.showOptionList;
	}

	onKeydownEvent(event: KeyboardEvent): void {
		if (event.key === "Enter" || event.key === " ") {
			this.showHideOptions();
		}
	}

	selectOption(option: string): void {
		this.selected = option;
		this.showOptionList = false;
		this.optionSelected.emit(option);
	}
}