export enum Dialog {
	AddRecipient,
	AddMeeting,
	CancelEdit,
	DeleteBirthday,
	DeleteMeeting,
	EditBirthday,
	EditMeeting,
	GetBirthday,
	GetMeetings,
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
