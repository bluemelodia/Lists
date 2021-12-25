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
		return JSON.parse(sessionStorage.getItem(topic));
	}

	private saveItem(topic: Topic, value: GiftDetails): void {
		sessionStorage.setItem(topic, JSON.stringify(value));
	}
}