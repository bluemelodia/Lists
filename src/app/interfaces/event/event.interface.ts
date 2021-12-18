export interface FormSubmitAction {
	readonly [key: string]: string;
}

/**
* Personalizable image. 
*/
export interface EventImage {
	fileName: string;
	image: string;
}