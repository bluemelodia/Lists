import { DialogMessage } from "../constants/messages";
import { Dialog } from "../types/dialog/dialog.types";
import { ResponseStatus } from "../types/response.types";

export class DialogUtils {
    public static titleForDialog(response: ResponseStatus) {
        switch (response) {
            case ResponseStatus.SUCCESS:
                return 'Success';
            case ResponseStatus.ERROR:
                return 'An Error Occurred';
        }
    }

    public static messageforConfirmDialog(dialogType: Dialog): string {
        let message;
        switch (dialogType) {
            case Dialog.CancelEdit:
                message = DialogMessage.CANCEL_EDIT;
                break;
        }

        return message;
    }

    public static messageforStatusDialog(response: ResponseStatus, dialogType: Dialog): string {
        let message;
        switch (dialogType) {
            case Dialog.AddBirthday:
            case Dialog.EditBirthday:
            case Dialog.DeleteBirthday:
                message = this.birthdayMessage(response, dialogType);
                break;
            case Dialog.GetBirthday:
                message = DialogMessage.FETCH_BIRTHDAYS_ERROR;
                break;
            default:
                break;
        }

        return message;
    }

    private static birthdayMessage(response: ResponseStatus, dialogType: Dialog): string {
        if (response === ResponseStatus.SUCCESS) {
            let birthdayMessage = '';

            switch (dialogType) {
                case Dialog.AddBirthday:
                    birthdayMessage = 'Added birthday.';
                    break;
                case Dialog.EditBirthday:
                    birthdayMessage = 'Updated birthday.';
                    break;
                case Dialog.DeleteBirthday:
                    birthdayMessage = 'Deleted birthday.';
                    break;
                default:
                    break;
            }

            return birthdayMessage;
        }

        return DialogMessage.GENERIC_ERROR;
    }
}