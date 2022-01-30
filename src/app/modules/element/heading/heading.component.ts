import { ChangeDetectionStrategy, Component, Input, } from "@angular/core";

import { HeaderLevel } from "../../../interfaces/header.interface";

@Component({
	selector: "app-heading",
	templateUrl: "./heading.component.html",
	styleUrls: ["./heading.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent {
	@Input() level: HeaderLevel = HeaderLevel.H2;
	@Input() text: string;
	
	public HeaderLevel = HeaderLevel;
}
