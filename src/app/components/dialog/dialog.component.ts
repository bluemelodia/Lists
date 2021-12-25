import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { DialogConfig, DialogType } from "../../interfaces/dialog.interface";

import { DialogService } from "../../services/dialog.service";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.css"]
})
export class DialogComponent {
	public dialogType = DialogType;
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
