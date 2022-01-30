import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
	selector: "app-home-widget",
	templateUrl: "./home-widget.component.html",
	styleUrls: ["./home-widget.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeWidgetComponent {
	
}