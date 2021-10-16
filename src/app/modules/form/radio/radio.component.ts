import { Component, Input, } from "@angular/core";

@Component({
	selector: "app-radio",
	templateUrl: "./radio.component.html",
	styleUrls: ["./radio.component.css"]
})
export class RadioComponent {
	@Input() label: string;
	@Input() name: string;
}
