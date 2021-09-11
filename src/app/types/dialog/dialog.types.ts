export enum Dialog {
	AddBirthday,
	CancelEdit,
	EditBirthday,
	DeleteBirthday,
	GetBirthday,
	LoadSettings,
	SaveSettings,
	UploadFailed,
}

export enum DialogAction {
	Cancel,
	Close,
	Continue,
}

export enum DialogType {
	Confirm,
	Error,
	Info
}

export interface DialogConfig {
	title: string;
	message: string;
	dialogType: DialogType;
}
