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
			case Dialog.DeleteBirthday:
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
			case Dialog.AddBirthday:
			case Dialog.EditBirthday:
			case Dialog.DeleteBirthday:
			case Dialog.GetBirthday:
				message = this.birthdayMessage(response, dialogType);
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
				case Dialog.AddBirthday:
					birthdayMessage = "Added birthday.";
					break;
				case Dialog.EditBirthday:
					birthdayMessage = "Updated birthday.";
					break;
				case Dialog.DeleteBirthday:
					birthdayMessage = "Deleted birthday.";
					break;
				default:
					break;
			}
		} else {
			switch (dialogType) {
				case Dialog.GetBirthday:
					birthdayMessage = DialogMessage.FETCH_BIRTHDAYS_ERROR;
					break;
			}

		}

		return birthdayMessage;
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