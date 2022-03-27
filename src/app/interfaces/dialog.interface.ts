export enum DialogType {
	Confirm,
	Error,
	Info,
	Session,
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
	Delete,
	Logout,
	LogoutWarning,
}

export enum Dialog {
	CancelEdit,
	LoadSettings,
	SaveSettings,
	UploadFailed,
}

export enum DialogPage {
	Login = 'login',
	Logout = 'logout',
	LogoutWarning = 'logout-warning',
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
