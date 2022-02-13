import { ChangeDetectionStrategy, Component, Input, } from "@angular/core";

@Component({
	selector: "ml-direction",
	templateUrl: "./direction.component.html",
	styleUrls: ["./direction.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionComponent {
	@Input() expanded = false;
}
