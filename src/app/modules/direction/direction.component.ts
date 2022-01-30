import { ChangeDetectionStrategy, Component, Input, } from "@angular/core";

@Component({
	selector: "app-direction",
	templateUrl: "./direction.component.html",
	styleUrls: ["./direction.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionComponent {
	@Input() expanded = false;
}
