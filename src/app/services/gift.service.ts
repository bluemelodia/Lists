import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { AddGift, Gift, GiftAction } from "../interfaces/event/gift.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
import { GiftUtils } from "../utils/gift.utils";

@Injectable({
	providedIn: "root"
})
export class GiftService {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private http: HttpClient,
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

		return this.http.post<Response>(
			GiftUtils.giftURLForAction(action),
			GiftUtils.formatGift(gift),
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

		return this.http.delete<Response>(
			`${GiftUtils.giftURLForAction(GiftAction.Delete)}/guest/${uuid}`,
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
	public getGifts(userID = "guest"): Observable<AddGift[]> {
		console.info("[Gift Service] Get gifts for id: ", userID);

		const getGift = `${GiftUtils.giftURLForAction(GiftAction.Fetch)}/${userID}`;
		return this.http.get<Response>(
			getGift
		)
			.pipe(
				map((response: Response) => {
					console.info("[Recipient Service] Received gifts: ", response);
					return response.responseData;
				}),
				catchError(() => {
					return of(null);
				})
			);
		}
}