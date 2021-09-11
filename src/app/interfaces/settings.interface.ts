import { Phone } from "./phone.interface";

export interface Settings {
	id?: string,
	phone: Phone,
	email: string,
	tasks: TopicSettings,
}

export interface TopicSettings {
	readonly [key: string]: boolean;
}
