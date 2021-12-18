import { DialogMessage } from "../constants/messages.constants";
import { Dialog } from "../interfaces/dialog.interface";
import { ResponseStatus } from "../interfaces/response.interface";

export class DialogUtils {
	public static titleForDialog(response: ResponseStatus): string {
		switch (response) {
			case ResponseStatus.SUCCESS:
				return "Success";
			case ResponseStatus.ERROR:
				return "An Error Occurred";
		}
	}

	public static messageforConfirmDialog(dialogType: Dialog): string {
		let message: string;
		switch (dialogType) {
			case Dialog.CancelEdit:
				message = DialogMessage.CANCEL_EDIT;
				break;
			case Dialog.DeleteRecipient:
				message = DialogMessage.DELETE_BIRTHDAY_CONFIRM;
				break;
			case Dialog.DeleteMeeting:
				message = DialogMessage.DELETE_MEETING_CONFIRM;
				break;
		}

		return message;
	}

	public static messageForErrorDialog(dialogType: Dialog): string {
		let message: string;
		switch (dialogType) {
			case Dialog.UploadFailed:
				message = DialogMessage.UPLOAD_ERROR;
				break;
			case Dialog.LoadSettings:
				message = DialogMessage.LOAD_SETTINGS_ERROR;
				break;
		}

		return message;
	}

	public static messageforStatusDialog(response: ResponseStatus, dialogType: Dialog): string {
		let message: string;
		switch (dialogType) {
			case Dialog.AddRecipient:
			case Dialog.EditRecipient:
			case Dialog.DeleteRecipient:
			case Dialog.GetRecipients:
				message = this.birthdayMessage(response, dialogType);
				break;
			case Dialog.AddGift:
			case Dialog.EditGift:
			case Dialog.DeleteGift:
			case Dialog.GetGifts:
				message = this.giftMessage(response, dialogType);
				break;
			case Dialog.AddMeeting:
			case Dialog.EditMeeting:
			case Dialog.DeleteMeeting:
			case Dialog.GetMeetings:
				message = this.meetingMessage(response, dialogType);
				break;
			case Dialog.SaveSettings:
				message = this.settingsMessage(response, dialogType);
				break;
			default:
				break;
		}

		return message;
	}

	private static birthdayMessage(response: ResponseStatus, dialogType: Dialog): string {
		let birthdayMessage = DialogMessage.GENERIC_ERROR;
		if (response === ResponseStatus.SUCCESS) {
			switch (dialogType) {
				case Dialog.AddRecipient:
					birthdayMessage = "Added birthday.";
					break;
				case Dialog.EditRecipient:
					birthdayMessage = "Updated birthday.";
					break;
				case Dialog.DeleteRecipient:
					birthdayMessage = "Deleted birthday.";
					break;
				default:
					break;
			}
		} else {
			switch (dialogType) {
				case Dialog.GetRecipients:
					birthdayMessage = DialogMessage.FETCH_BIRTHDAYS_ERROR;
					break;
			}

		}

		return birthdayMessage;
	}

	private static giftMessage(response: ResponseStatus, dialogType: Dialog): string {
		let giftMessage = DialogMessage.GENERIC_ERROR;
		if (response === ResponseStatus.SUCCESS) {
			switch (dialogType) {
				case Dialog.AddGift:
					giftMessage = "Added gift.";
					break;
				case Dialog.EditGift:
					giftMessage = "Updated gift.";
					break;
				case Dialog.DeleteGift:
					giftMessage = "Deleted gift.";
					break;
				default:
					break;
			}
		} else {
			switch (dialogType) {
				case Dialog.GetGifts:
					giftMessage = DialogMessage.FETCH_GIFTS_ERROR;
					break;
			}

		}

		return giftMessage;
	}

	private static meetingMessage(response: ResponseStatus, dialogType: Dialog): string {
		let meetingMessage = DialogMessage.GENERIC_ERROR;
		if (response === ResponseStatus.SUCCESS) {
			switch (dialogType) {
				case Dialog.AddMeeting:
					meetingMessage = "Created new meeting.";
					break;
				case Dialog.EditMeeting:
					meetingMessage = "Updated meeting details.";
					break;
				case Dialog.DeleteMeeting:
					meetingMessage = 'Deleted meeting.';
					break;
				default:
					break;
			}
		} else {
			switch (dialogType) {
				case Dialog.GetMeetings:
					meetingMessage = DialogMessage.FETCH_MEETINGS_ERROR;
					break;
			}
		}

		return meetingMessage;
	}

	private static settingsMessage(response: ResponseStatus, dialogType: Dialog): string {
		if (response === ResponseStatus.SUCCESS) {
			let settingsMessage = "";

			switch (dialogType) {
				case Dialog.SaveSettings:
					settingsMessage = "Saved settings.";
					break;
				default:
					break;
			}

			return settingsMessage;
		}

		return DialogMessage.UPDATE_SETTINGS_ERROR;
	}
}