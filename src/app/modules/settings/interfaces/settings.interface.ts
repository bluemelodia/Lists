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