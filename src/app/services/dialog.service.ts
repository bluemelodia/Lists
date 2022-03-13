import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { 
	ConfirmDialogAction,
	Dialog,
	DialogAction,
	DialogConfig,
	DialogPage,
	DialogType,
} from "../interfaces/dialog.interface";
import { ResponseStatus } from "../interfaces/response.interface";
import { DialogUtils } from "../utils/dialog.utils";

@Injectable({
	providedIn: "root"
})
export class DialogService {
	private show$ = new Subject<DialogConfig>();
	private onConfirmAction$ = new Subject<ConfirmDialogAction>();

	get showDialog$(): Observable<DialogConfig> {
		return this.show$.asObservable();
	}

	get onConfirmDialogAction$(): Observable<ConfirmDialogAction> {
		return this.onConfirmAction$.asObservable();
	}

	showResponseStatusDialog(status: ResponseStatus, action: DialogAction, page: DialogPage): void {
		console.info('[Dialog Service] show status dialog: ', DialogUtils.titleForDialog(status), DialogUtils.messageforStatusDialog(status, action, page), page);
		this.show$.next({
			title: DialogUtils.titleForDialog(status),
			message: DialogUtils.messageforStatusDialog(status, action, page),
			dialogType: DialogType.Info
		});
	}

	showConfirmDialog(action: ConfirmDialogAction, page: DialogPage): Observable<ConfirmDialogAction> {
		console.info('[Dialog Service] show confirm dialog: ', action, page);
		this.show$.next({
			title: DialogUtils.titleForConfirmDialog(action),
			message: DialogUtils.messageforConfirmDialog(action, page),
			dialogType: action !== ConfirmDialogAction.Logout ? DialogType.Confirm : DialogType.Session
		});

		return this.onConfirmDialogAction$;
	}

	showErrorDialog(dialogType: Dialog): void {
		console.info('[Dialog Service] show error dialog: ', dialogType);
		this.show$.next({
			title: "Error",
			message: DialogUtils.messageForErrorDialog(dialogType),
			dialogType: DialogType.Error
		});
	}

	hideDialog(): void {
		this.show$.next(null);
		this.onConfirmAction$.next(ConfirmDialogAction.Close);
	}

	onCancel(): void {
		this.show$.next(null);
		this.onConfirmAction$.next(ConfirmDialogAction.Cancel);
	}

	onContinue(): void {
		this.show$.next(null);
		this.onConfirmAction$.next(ConfirmDialogAction.Continue);
	}
}
