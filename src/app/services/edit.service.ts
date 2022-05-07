import { Injectable } from "@angular/core";

import { Topic } from '../constants/topics.constants';

import { GiftDetails } from "../interfaces/event/gift.interface";
import { Task } from "../interfaces/event/task.interface";
import { AddMeeting, AddRecipient } from "../interfaces/service/service-objects.interface";

type Item = GiftDetails | AddMeeting | AddRecipient | Task;

@Injectable({
	providedIn: "root"
})
export class EditService {

	public editGift(gift: GiftDetails): void {
		this.saveItem(Topic.Gifts, gift);
	}

	public editMeeting(meeting: AddMeeting): void {
		this.saveItem(Topic.Meetings, meeting);
	}

	public editRecipient(recipient: AddRecipient): void {
		this.saveItem(Topic.Birthdays, recipient);
	}

	public editTask(task: Task): void {
		this.saveItem(Topic.Tasks, task);
	}

	public getItem(topic: Topic): Item {
		const item = JSON.parse(sessionStorage.getItem(topic)) as Item;
		console.info("[Edit Service] Fetched item from session storage: ", item);
		return item;
	}

	private saveItem(topic: Topic, value: Item): void {
		sessionStorage.setItem(topic, JSON.stringify(value));
	}

	public clearItem(topic: Topic): void {
		sessionStorage.removeItem(topic);
	}
}