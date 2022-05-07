import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class LoadingService {
	private loadingStateChanged$ = new Subject<boolean>();

	public get loadingChanged$(): Observable<boolean> {
		return this.loadingStateChanged$.asObservable();
	}

	public startLoading(): void {
		console.info("[Loading Service] Start loading...");
		this.loadingStateChanged$.next(true);
	}

	public stopLoading(): void {
		console.info("[Loading Service] Stop loading...");
		this.loadingStateChanged$.next(false);
	}
}
