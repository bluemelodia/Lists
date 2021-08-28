export interface Response {
    statusCode: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responseData: any;
}

export enum ResponseStatus {
    SUCCESS,
    ERROR,
}