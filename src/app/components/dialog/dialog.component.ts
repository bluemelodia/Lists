import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { Icon } from "../../constants/icons.constants";
import { DialogConfig, DialogType } from "../../interfaces/dialog.interface";
import { DialogService } from "../../services/dialog.service";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.css"]
})
export class DialogComponent {
	public dialogType = DialogType;
	public icon = Icon;
	public showDialog$: Observable<DialogConfig> = this.dialogService.showDialog$;

	constructor(
		private dialogService: DialogService,
	) { }

	onCancel(): void {
		this.dialogService.onCancel();
	}

	onContinue(): void {
		this.dialogService.onContinue();
	}

	hideDialog(): void {
		this.dialogService.hideDialog();
	}
}
