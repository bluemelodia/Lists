import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Key, FocusEvent } from '../interfaces/focus.interface';

@Injectable({
	providedIn: 'root'
})
export class FocusService {
	private onKeyPressed$ = new Subject<FocusEvent>();

	keyPressed$(): Observable<FocusEvent> {
		return this.onKeyPressed$;
	}

	public keyPressed(key: Key, id: string, elementID: string): void {
		this.onKeyPressed$.next({
			key: key,
			elementID: elementID,
			id: id
		});
	}
}
