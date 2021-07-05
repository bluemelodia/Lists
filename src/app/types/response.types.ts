export interface Response {
    statusCode: number;
    responseData: any;
}

export enum ResponseStatus {
    SUCCESS,
    ERROR,
}