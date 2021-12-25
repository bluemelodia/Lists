import { Injectable } from "@angular/core";

import { Topic } from '../constants/topics.constants';

import { GiftDetails } from "../interfaces/event/gift.interface";

@Injectable({
	providedIn: "root"
})
export class EditService {
	public editGift(gift: GiftDetails): void {
		this.saveItem(Topic.Gifts, gift);
	}

	public getItem(topic: Topic): GiftDetails {
		const item = JSON.parse(sessionStorage.getItem(topic));
		console.info("[Edit Service] Fetched item from session storage: ", item);
		return item;
	}

	private saveItem(topic: Topic, value: GiftDetails): void {
		sessionStorage.setItem(topic, JSON.stringify(value));
	}
}