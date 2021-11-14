export enum Channel {
	email = "email",
	text = "text",
}

export interface ChannelValidation {
	[key: string]: boolean;
}

export const VALIDATE_CHANNEL: ChannelValidation = {
	[Channel.email]: false,
	[Channel.text]: false,
}