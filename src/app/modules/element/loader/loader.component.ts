import { ChangeDetectionStrategy, Component, HostBinding, Input, } from "@angular/core";

@Component({
	selector: "ml-loader",
	templateUrl: "./loader.component.html",
	styleUrls: ["./loader.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
	@HostBinding("class") public get hostClasses(): string {
		const hostStyles = [];

		if (this.fullScreen) {
			hostStyles.push("full-screen");
		}

		return hostStyles.join(" ");
	}

	@Input() fullScreen = false;
}
