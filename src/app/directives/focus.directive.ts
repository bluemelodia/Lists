import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { FocusService } from "../services/focus.service";
import { Key } from "../interfaces/focus.interface";

/**
 * Loop focus for open navigation panels and modals. 
 * Consumers are responsible for supplying the correct classes. 
 * 
 * Due to different propagation times for the "Space" and "Enter" events,
 * it"s not advisable to have this directive manage the activation/deactivation of 
 * the tab stop. 
 * 
 * Ex. By the time the Space event is processed, the nav bar is not opened yet,
 * but by the time the Enter event is processed, the nav bar is already opened.
 * 
 * Having the consumer manage the tab stop ensures its state is consistent with the
 * state of the items to focus on.
 * 
 * The element to loop focus back to should have the "focus-origin" CSS class.
 * 
 * All elements that the screenreader should loop through should have the "focus-option" CSS class.
 * 
 * The tab stop should have the "tab-stop" CSS class.
 */
@Directive({
	selector: "[appFocus]"
})
export class FocusDirective {
	/**
	* Unique ID for the element. Consumers can use this to filter for their own events.
	*/
	@Input() id;

	constructor(
		private focus: FocusService,
		private el: ElementRef
	) {
	}

	/**
	 * Don"t do this if there"s only one element (there"s nothing to loop through).
	 * This will be true when the container is closed (ex. nav menu is closed).
	 */
	private getFirstFocusableElement(): HTMLElement {
		let buttons = this.el.nativeElement.getElementsByClassName("focus-option");
		buttons = Array.from(buttons).filter((el: HTMLElement) => {
			return el.classList.contains("focus-origin") || el.getAttribute("aria-hidden") === "false";
		});
		return buttons.length > 1 ? buttons[0] : null;
	}

	@HostListener("document:keyup", ["$event"]) onKeyDownHandler(event: KeyboardEvent): void {
		const target = event.target as HTMLElement;

		switch (event.key) {
			case Key.Tab:
				if (target.classList.contains("tab-stop")) {
					/**
					* Tab stop element. If this element has tabindex = -1 and aria-hidden = true, 
					* then allow users to tab outside of the container.
					*/
					const firstElement = this.getFirstFocusableElement();
					if (firstElement) {
						firstElement.focus();
					}
				} else {
					this.focus.keyPressed(event.key, target.id, this.id);
				}
				break;
			case Key.Space:
			case Key.Enter:
			case Key.Escape:
				this.focus.keyPressed(event.key, target.id, this.id);
				break;
		}
	}
}