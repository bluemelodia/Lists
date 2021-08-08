export enum Dialog {
    AddBirthday,
    CancelEdit,
    EditBirthday,
    DeleteBirthday,
    GetBirthday,
}

export enum DialogAction {
    Cancel,
    Close,
    Continue,
}

export enum DialogType {
    Confirm,
    Info
}

export interface DialogConfig {
    title: string;
    message: string;
    dialogType: DialogType;
}
