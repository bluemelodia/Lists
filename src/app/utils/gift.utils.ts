import { Endpoint } from "../constants/urls.constants";
import { EventUtils } from "./event.utils";
import {
	AddGift,
	Gift,
	GiftAction,
	GiftConfig,
	GiftFormSubmitActions,
} from "../interfaces/event/gift.interface";

export class GiftUtils {
	private static baseURL = Endpoint.Gift;
	private static addGiftURL = `${GiftUtils.baseURL}/addGift`;
	private static deleteGiftURL = `${GiftUtils.baseURL}/deleteGift`;
	private static editGiftURL = `${GiftUtils.baseURL}/editGift`;
	private static getGiftURL = `${GiftUtils.baseURL}/getGifts`;

	public static giftURLForAction(action: GiftAction): string {
		let url: string;

		switch (action) {
			case GiftAction.Add:
				url = GiftUtils.addGiftURL;
				break;
			case GiftAction.Delete:
				url = GiftUtils.deleteGiftURL;
				break;
			case GiftAction.Edit:
				url = GiftUtils.editGiftURL;
				break;
			case GiftAction.Fetch:
				url = GiftUtils.getGiftURL;
				break;
		}

		return url;
	}

	public static createGiftFormConfig(action: GiftAction): GiftConfig {
		const config: GiftConfig = {
			action: action,
			buttonAction: GiftFormSubmitActions[action]
		};

		return config;
	}

	public static formatGift(gift: Gift): AddGift {
		const addGift: AddGift = {
			...gift,
			id: "guest",
			filename: EventUtils.extractFileURL(gift.giftImage?.fileName),
			image: gift.giftImage?.image || '',
		};
		console.log("===> send gift: ", addGift);
		return addGift;
	}
}