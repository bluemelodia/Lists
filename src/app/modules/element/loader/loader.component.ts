import { Component, HostBinding, Input, } from "@angular/core";

@Component({
	selector: "app-loader",
	templateUrl: "./loader.component.html",
	styleUrls: ["./loader.component.css"]
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
