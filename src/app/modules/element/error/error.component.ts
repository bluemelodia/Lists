import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "ml-error",
	templateUrl: "./error.component.html",
	styleUrls: ["./error.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
	@Input() message = "An error occurred while loading this page. Please try again later.";
	@Output() retry = new EventEmitter<void>();

	public retryCalls(): void {
		this.retry.emit();
	}
}
