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

	get showDialog$(): Observable<DialogConfig> {
		return this.show$.asObservable();
	}

	get onDialogAction$(): Observable<DialogAction> {
		return this.onAction$.asObservable();
	}

	showResponseStatusDialog(status: ResponseStatus, dialogType: Dialog): void {
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

	showErrorDialog(dialogType: Dialog): void {
		this.show$.next({
			title: 'Error',
			message: DialogUtils.messageForErrorDialog(dialogType),
			dialogType: DialogType.Error
		});
	}

	hideDialog(): void {
		this.show$.next(null);
		this.onAction$.next(DialogAction.Close);
	}

	onCancel(): void {
		this.show$.next(null);
		this.onAction$.next(DialogAction.Cancel);
	}

	onContinue(): void {
		this.show$.next(null);
		this.onAction$.next(DialogAction.Continue);
	}
}
