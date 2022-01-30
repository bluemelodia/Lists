import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-no-results",
	templateUrl: "./no-results.component.html",
	styleUrls: ["./no-results.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoResultsComponent {
	@Input() message = "No results found.";
}
