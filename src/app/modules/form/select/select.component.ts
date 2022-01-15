import { 
	Component, 
	ElementRef, 
	HostListener,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { ReplaySubject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

import { FocusEvent, Key } from "../../../interfaces/focus.interface";

import { FocusService } from "../../../services/focus.service";

@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.css"]
})
export class SelectComponent implements OnInit, OnDestroy {
	@HostListener('document:click', ['$event'])
	click(event: MouseEvent): void {
		const elem: HTMLElement = this.elementRef.nativeElement;
		if (!elem.contains(event.target as HTMLElement)) {
			if (this.showOptionList) {
				this.showHideOptions();
			}
		}
	}

	@Input() id: string;
	@Input() default: string;
	@Input() form: FormGroup;
	@Input() placeholder = "";
	@Input() submitted;

	@ViewChild("select", { read: ElementRef, static: false }) select: ElementRef;

	public showOptionList = false;
	
	private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

	constructor(
		private elementRef: ElementRef,
		private focus: FocusService
	) { }

	ngOnInit(): void {
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

	showHideOptions(): void {
		this.showOptionList = !this.showOptionList;
	}

	onKeydownEvent(event: KeyboardEvent): void {
		if (event.key === "Enter" || event.key === " ") {
			this.showHideOptions();
		}
	}
}