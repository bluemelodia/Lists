import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { AddGift, Gift, GiftAction } from "../interfaces/event/gift.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
import { UserService } from "./user.service";
import { GiftUtils } from "../utils/gift.utils";

@Injectable({
	providedIn: "root"
})
export class GiftService {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {}

	public modifyGift(gift: Gift, action: GiftAction): Observable<ResponseStatus> {
		switch (action) {
			case GiftAction.Add:
				return this.postGift(gift);
			case GiftAction.Edit:
				return this.postGift(gift, GiftAction.Edit);
		}
	}

	public postGift(gift: Gift, action = GiftAction.Add): Observable<ResponseStatus> {
		console.info("[Gift Service] Post or edit recipient: ", gift);
		const userID = this.userService.getUser();

		return this.http.post<Response>(
			GiftUtils.giftURLForAction(action),
			GiftUtils.formatGift(gift, userID),
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
				}),
				catchError(() => {
					return of(ResponseStatus.ERROR);
				})
			)
	}

	public deleteGift(uuid: string): Observable<ResponseStatus> {
		console.info("[Gift Service] Delete gift with uuid: ", uuid);
		const userID = this.userService.getUser();

		return this.http.delete<Response>(
			`${GiftUtils.giftURLForAction(GiftAction.Delete)}/${userID}/${uuid}`,
			{
				headers: this.headers
			}
		)
			.pipe(
				map(() => {
					return ResponseStatus.SUCCESS;
				}),
				catchError(() => {
					return of(ResponseStatus.ERROR);
				})
			)
	}

	/**
	* @param userID 
	* @returns A sorted list of birthdays for this user.
	*/
	public getGifts(): Observable<AddGift[]> {
		const userID = this.userService.getUser();
		console.info("[Gift Service] Get gifts for id: ", userID);

		const getGift = `${GiftUtils.giftURLForAction(GiftAction.Fetch)}/${userID}`;
		
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.get<Response>(
			getGift
		)
			.pipe(
				map((response: Response) => {
					console.info("[Gift Service] Received gifts: ", response);
					return response.responseData as AddGift;
				}),
				catchError(() => {
					return of(null);
				})
			);
	}
}