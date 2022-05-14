
export enum UserAction {
	Login = "Login",
	Forgot = "Forgot",
	Register = "Register",
	Logout = "Logout",
}

export interface User {
	username: string;
	password: string;
}