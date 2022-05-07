export enum DialogType {
	Confirm,
	Error,
	Idle,
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
	Extend,
	IdleTimeoutWarning,
	Logout,
	SessionTimeoutWarning,
}

export enum Dialog {
	CancelEdit,
	LoadSettings,
	SaveSettings,
	UploadFailed,
}

export enum DialogPage {
	IdleTimeoutWarning = 'idle-timeout-warning',
	Login = 'login',
	Logout = 'logout',
	SessionTimeoutWarning = 'session-timeout-warning',
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
