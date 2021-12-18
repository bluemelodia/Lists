export enum Dialog {
	AddMeeting,
	AddGift,
	AddRecipient,
	CancelEdit,
	DeleteGift,
	DeleteMeeting,
	DeleteRecipient,
	EditGift,
	EditMeeting,
	EditRecipient,
	GetMeetings,
	GetGifts,
	GetRecipients,
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
