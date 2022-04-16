import { DialogMessage } from "../constants/messages.constants";
import { ConfirmDialogAction, Dialog, DialogAction, DialogPage } from "../interfaces/dialog.interface";
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

	public static titleForConfirmDialog(action: ConfirmDialogAction): string {
		let message: string;
		switch (action) {
			case ConfirmDialogAction.IdleTimeoutWarning:
				message = "Idle Warning";
				break;
			case ConfirmDialogAction.Logout:
				message = "Logout";
				break;
			case ConfirmDialogAction.SessionTimeoutWarning:
				message = "Logout Warning";
				break;
			default:
				message = "Confirm";
				break;
		}
		return message;
	}

	public static messageforStatusDialog(status: ResponseStatus, action: DialogAction, page: DialogPage): string {
		switch (status) {
			case ResponseStatus.SUCCESS:
				return DialogUtils.successStatusMessage(action, page);
			case ResponseStatus.ERROR:
				return DialogUtils.errorStatusMessage(action, page);
		}
	}

	private static successStatusMessage(action: DialogAction, page: DialogPage): string {
		const pageName = page.endsWith('s') ? `${page}` : `${page}s`;

		switch (action) {
			case DialogAction.Add:
				return `Added ${page}.`;
			case DialogAction.Delete:
				return `Deleted ${page}.`;
			case DialogAction.Edit:
				return `Saved ${page} changes.`;
			case DialogAction.Get:
				return `Fetched user ${pageName}.`;
			case DialogAction.Register:
				return `User created.`;
			case DialogAction.Save:
				return `Saved ${page}.`;
			default:
				return `Successfully made changes.`;
		}
	}

	private static errorStatusMessage(action: DialogAction, page: DialogPage): string {
		let message = '';
		const pageName = page.endsWith('s') ? `${page}` : `${page}s`;

		switch (action) {
			case DialogAction.Add:
				message = `Unable to add ${page}.`;
				break;
			case DialogAction.Delete:
				message = `Unable to delete ${page}.`;
				break;
			case DialogAction.Edit:
				message = `Unable to save ${page} changes.`;
				break;
			case DialogAction.Get:
				message = `Unable to fetch user ${pageName}.`;
				break;
			case DialogAction.Login:
				message = `Unable to login with this username and password.`;
				break;
			case DialogAction.Register:
				message = `Unable to create user.`;
				break;
			case DialogAction.Save:
				message = `Unable to save ${pageName}.`;
				break;
			default:
				message = `Unable to made changes at this time.`;
				break;
		}
		return message + ' Please try again later.';
	}

	public static messageforConfirmDialog(action: ConfirmDialogAction, page: DialogPage): string {
		let message: string;
		switch (action) {
			case ConfirmDialogAction.Cancel:
				message = DialogMessage.CANCEL_EDIT;
				break;
			case ConfirmDialogAction.Delete:
				message = `Are you sure you want to delete this ${page}?`;

				if (page === DialogPage.Recipient) {
					message += `This will also delete this ${page}'s gifts.`;
				}
				break;
			case ConfirmDialogAction.IdleTimeoutWarning:
				message = DialogMessage.IDLE_TIMEOUT_WARNING;
				break;
			case ConfirmDialogAction.Logout:
				message = DialogMessage.SESSION_TIMEOUT;
				break;
			case ConfirmDialogAction.SessionTimeoutWarning:
				message = DialogMessage.SESSION_TIMEOUT_WARNING;
				break;
			default:
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
}