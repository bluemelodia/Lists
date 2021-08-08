export enum Dialog {
    AddBirthday,
    EditBirthday,
    DeleteBirthday,
    GetBirthday,
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
