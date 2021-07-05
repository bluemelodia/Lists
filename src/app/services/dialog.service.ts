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
	private hide$ = new Subject();
	private onHide$ = new Subject();

	constructor() { }

	showDialog$(): Observable<string> {
		return this.show$.asObservable();
	}

	hideDialog$(): Observable<any> {
		return this.hide$.asObservable();
	}

	onDialogHide$(): Observable<any> {
		return this.onHide$.asObservable();
	}

	showStatusDialog(status: ResponseStatus, dialogType: Dialog) {
		this.show$.next(DialogUtils.messageforDialog(status, dialogType));
	}

	showDialog(message: string) {
		this.show$.next(message);
	}

	hideDialog() {
		this.hide$.next();
	}

	onDialogHide() {
		this.onHide$.next();
	}
}
