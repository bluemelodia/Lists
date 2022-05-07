import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { timer } from "rxjs";

/**
 * Phone field uses a third party library, we can"t chagne the library
 * code to fix the issue where focus goes to body on input click, so we
 * use a directive to address it instead.
 */
@Directive({
	selector: "[focus]"
})
export class FocusFixDirective {
	@Input() targetClass: string;

	private element;

	constructor(el: ElementRef) {
		this.element = el;
	}

	@HostListener("click", ["$event"]) onClickHandler(): void {
		const elem: ElementRef = this.element;
		const firstInput: HTMLElement = (elem?.nativeElement as HTMLElement).querySelector(`.${this.targetClass}`);
		timer(50)
			.subscribe(() => {
				firstInput?.focus();
			});
	}
}