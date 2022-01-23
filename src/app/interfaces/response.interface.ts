export interface Response {
    statusCode: number;
    responseData;
}

export enum ResponseStatus {
    SUCCESS,
    ERROR,
	LOGOUT
}