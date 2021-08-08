import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Dialog, DialogAction, DialogConfig, DialogType } from '../types/dialog/dialog.types';
import { ResponseStatus } from '../types/response.types';
import { DialogUtils } from '../utils/dialog.utils';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private show$ = new Subject<DialogConfig>();
	private onAction$ = new Subject<DialogAction>();

	constructor() { }

	get showDialog$(): Observable<DialogConfig> {
		return this.show$.asObservable();
	}

	get onDialogAction$(): Observable<DialogAction> {
		return this.onAction$.asObservable();
	}

	showStatusDialog(status: ResponseStatus, dialogType: Dialog) {
		this.show$.next({
			title: DialogUtils.titleForDialog(status),
			message: DialogUtils.messageforStatusDialog(status, dialogType),
			dialogType: DialogType.Info
		});
	}

	showConfirmDialog(dialogType: Dialog): Observable<DialogAction> {
		this.show$.next({
			title: 'Confirm',
			message: DialogUtils.messageforConfirmDialog(dialogType),
			dialogType: DialogType.Confirm
		});

		return this.onDialogAction$;
	}

	hideDialog() {
		this.show$.next(null);
		this.onAction$.next(DialogAction.Close);
	}

	onCancel() {
		this.show$.next(null);
		this.onAction$.next(DialogAction.Cancel);
	}

	onContinue() {
		this.show$.next(null);
		this.onAction$.next(DialogAction.Continue);
	}
}
