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
				message = this.birthdayMessage(response, dialogType);
				break;
			case Dialog.GetBirthday:
				message = DialogMessage.FETCH_BIRTHDAYS_ERROR;
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
		if (response === ResponseStatus.SUCCESS) {
			let birthdayMessage = "";

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

			return birthdayMessage;
		}

		return DialogMessage.GENERIC_ERROR;
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