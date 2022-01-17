export enum DialogType {
	Confirm,
	Error,
	Info,
}

export enum DialogAction {
	Add,
	Cancel,
	Continue,
	Delete,
	Edit,
	Get,
	Login,
	Register,
	Save,
}

export enum ConfirmDialogAction {
	Cancel,
	Close,
	Continue,
	Delete
}

export enum Dialog {
	CancelEdit,
	LoadSettings,
	SaveSettings,
	UploadFailed,
}

export enum DialogPage {
	Login = 'login',
	Meeting = 'meeting',
	Gift = 'gift',
	Recipient = 'recipient',
	Register = 'register',
	Settings = 'settings',
	Tasks = 'task',
}

export interface DialogConfig {
	title: string;
	message: string;
	dialogType: DialogType;
}
