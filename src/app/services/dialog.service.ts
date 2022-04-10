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

	showResponseStatusDialog(status: ResponseStatus, action: DialogAction, page: DialogPage): Observable<ConfirmDialogAction> {
		console.info('[Dialog Service] show status dialog: ', DialogUtils.titleForDialog(status), DialogUtils.messageforStatusDialog(status, action, page), page);
		this.show$.next({
			title: DialogUtils.titleForDialog(status),
			message: DialogUtils.messageforStatusDialog(status, action, page),
			dialogType: DialogType.Info
		});

		return this.onConfirmDialogAction$;
	}

	showConfirmDialog(action: ConfirmDialogAction, page: DialogPage): Observable<ConfirmDialogAction> {
		console.info('[Dialog Service] show confirm dialog: ', action, page);

		let dialogType;
		switch (action) {
			case ConfirmDialogAction.IdleTimeoutWarning:
				dialogType = DialogType.Idle;
				break;
			case ConfirmDialogAction.Logout:
			case ConfirmDialogAction.SessionTimeoutWarning:
				dialogType = DialogType.Session;
				break;
			default:
				dialogType = DialogType.Confirm;
				break;
		}

		this.show$.next({
			title: DialogUtils.titleForConfirmDialog(action),
			message: DialogUtils.messageforConfirmDialog(action, page),
			dialogType: dialogType
		});

		return this.onConfirmDialogAction$;
	}

	public showErrorDialog(dialogType: Dialog): void {
		this.show$.next({
			title: "Error",
			message: DialogUtils.messageForErrorDialog(dialogType),
			dialogType: DialogType.Error
		});
	}

	public hideDialog(): void {
		this.show$.next(null);
		this.onConfirmAction$.next(ConfirmDialogAction.Close);
	}

	public onCancel(): void {
		this.show$.next(null);
		this.onConfirmAction$.next(ConfirmDialogAction.Cancel);
	}

	public onContinue(): void {
		this.show$.next(null);
		this.onConfirmAction$.next(ConfirmDialogAction.Continue);
	}

	public onExtend(): void {
		this.show$.next(null);
		this.onConfirmAction$.next(ConfirmDialogAction.Extend);
	}

	public onLogout(): void {
		this.show$.next(null);
		this.onConfirmAction$.next(ConfirmDialogAction.Logout);
	}
}
