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
	Meeting = 'meeting',
	Gift = 'gift',
	Recipient = 'recipient',
	Settings = 'settings',
	Tasks = 'tasks',
}

export interface DialogConfig {
	title: string;
	message: string;
	dialogType: DialogType;
}
