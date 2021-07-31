export interface BirthdayConfig {
    action: BirthdayFormAction,
    buttonAction: string,
}

export enum BirthdayFormAction {
    Add = 'Add',
    Edit = 'Edit'
}

interface BirthdayFormSubmitAction {
    readonly [key: string]: string;
}

export const BirthdayFormSubmitActions: BirthdayFormSubmitAction = {
    [BirthdayFormAction.Add]: 'Submit',
    [BirthdayFormAction.Edit]: 'Update'
}