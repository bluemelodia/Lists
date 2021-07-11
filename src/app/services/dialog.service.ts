import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Dialog } from '../types/dialog/dialog.types';
import { ResponseStatus } from '../types/response.types';
import { DialogUtils } from '../utils/dialog.utils';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private show$ = new Subject<string>();
	private onClose$ = new Subject<void>();

	constructor() { }

	get showDialog$(): Observable<string> {
		return this.show$.asObservable();
	}

	get onDialogClose$(): Observable<void> {
		return this.onClose$.asObservable();
	}

	showStatusDialog(status: ResponseStatus, dialogType: Dialog) {
		this.show$.next(DialogUtils.messageforDialog(status, dialogType));
	}

	showDialog(message: string) {
		this.show$.next(message);
	}

	hideDialog() {
		this.show$.next(null);
		this.onClose$.next();
	}
}
