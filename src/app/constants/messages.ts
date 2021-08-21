interface Message {
    readonly [key: string]: string;
}

export const DialogMessage: Message = {
    CANCEL_EDIT: 'Are you sure you want to discard your changes?',
    GENERIC_ERROR: 'An error occurred. Please try again later.',
    FETCH_BIRTHDAYS_ERROR: 'Unable to fetch list of birthdays at this time. Please try again later.',
    UPLOAD_ERROR: 'The image you selected cannot be uploaded. Please choose a different image.',
};