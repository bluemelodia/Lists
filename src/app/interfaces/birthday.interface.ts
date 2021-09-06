export interface BirthdayConfig {
    action: BirthdayAction,
    buttonAction: string,
}

export enum BirthdayAction {
    Add = 'Add',
    Delete = 'Delete',
    Edit = 'Edit',
    Fetch = 'Fetch',
}

interface BirthdayFormSubmitAction {
    readonly [key: string]: string;
}

export const BirthdayFormSubmitActions: BirthdayFormSubmitAction = {
	[BirthdayAction.Add]: 'Submit',
	[BirthdayAction.Edit]: 'Update'
}