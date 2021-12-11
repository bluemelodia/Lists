import { GiftAction, GiftConfig, GiftFormSubmitActions } from "../interfaces/event/gift.interface";

export class GiftUtils {
	public static createGiftFormConfig(action: GiftAction): GiftConfig {
		const config: GiftConfig = {
			action: action,
			buttonAction: GiftFormSubmitActions[action]
		};

		return config;
	}
}