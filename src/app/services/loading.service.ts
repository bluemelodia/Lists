import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
    private loadingStateChanged$ = new BehaviorSubject<boolean>(false);

	public get loadingChanged$(): Observable<boolean> {
		return this.loadingStateChanged$.asObservable();
	}

	public startLoading() {
        console.info("⭕️ 🏁 LoadingService ---> startLoading");
        this.loadingStateChanged$.next(true);
    }

    public stopLoading() {
        console.info("⭕️ 🛑 LoadingService ---> stopLoading");
        this.loadingStateChanged$.next(false);
    }
}
