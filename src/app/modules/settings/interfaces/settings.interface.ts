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

export interface Settings {
	id?: string,
	country: string;
	email: string,
	phone: number,
	tasks: TopicSettings,
}

export interface TopicSettings {
	readonly [key: string]: boolean;
}