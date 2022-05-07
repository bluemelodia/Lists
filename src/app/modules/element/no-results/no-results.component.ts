import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "ml-no-results",
	templateUrl: "./no-results.component.html",
	styleUrls: ["./no-results.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoResultsComponent {
	@Input() message = "No results found.";
}
