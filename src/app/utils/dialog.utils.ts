import { DialogMessage } from "../constants/messages";
import { Dialog } from "../types/dialog/dialog.types";
import { ResponseStatus } from "../types/response.types";

export class DialogUtils {
    public static messageforDialog(response: ResponseStatus, dialogType: Dialog): string {
        let message;
        switch (dialogType) {
            case Dialog.AddBirthday:
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