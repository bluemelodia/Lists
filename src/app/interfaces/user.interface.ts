
export enum UserAction {
	Login = "Login",
	Register = "Register",
}

export interface User {
	username: string;
	password: string;
}