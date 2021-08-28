export interface FocusEvent {
	id: string,
	elementID: string,
	key: Key
}

export enum Key {
	Tab = "Tab",
	Escape = "Escape",
	Enter = "Enter",
	Space = " "
}
