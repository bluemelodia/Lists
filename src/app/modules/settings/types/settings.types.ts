export enum Channel {
	email = "email",
	text = "text",
}

interface ChannelVadidation {
	[key: string]: boolean;
}

export const VALIDATE_CHANNEL: ChannelVadidation = {
	[Channel.email]: false,
	[Channel.text]: false,
}