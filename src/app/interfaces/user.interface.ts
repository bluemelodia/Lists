
export enum UserAction {
	Encrypt = "Encrypt",
	Login = "Login",
	Register = "Register",
	Logout = "Logout",
}

export interface User {
	username: string;
	password: string;
}