import { Dialog } from "../types/dialog/dialog.types";
import { ResponseStatus } from "../types/response.types";

export class DialogUtils {
    public static messageforDialog(response: ResponseStatus, dialogType: Dialog): string {
        let message;
        switch (dialogType) {
            case Dialog.AddBirthday:
                message = this.birthdayMessage(response);
                break;
            default:
                break;
        }

        return message;
    }

    private static birthdayMessage(response: ResponseStatus): string {
        return response === ResponseStatus.SUCCESS ? 'Added birthday.' : 'An error occurred. Please try again later.';
    }
}