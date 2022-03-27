interface Message {
	readonly [key: string]: string;
}

export const DialogMessage: Message = {
	CANCEL_EDIT: "Are you sure you want to discard your changes?",
	GENERIC_ERROR: "An error occurred. Please try again later.",
	IDLE_TIMEOUT_WARNING: "Your session is about to end due to inactivity. Would you like to continue your session?",
	LOAD_SETTINGS_ERROR: "Unable to laod settings at this time. Please try again later.",
	SESSION_TIMEOUT: "Your session has ended. Please login again.",
	SESSION_TIMEOUT_WARNING: "Your session is about to end. Please complete any unfinished tasks.",
	UPDATE_SETTINGS_ERROR: "Unable to save settings at this time. Please try again later.",
	UPLOAD_ERROR: "The image you selected cannot be uploaded. Please choose a different image.",
};