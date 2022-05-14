
import { Endpoint } from "../constants/urls.constants";
import { UserAction } from "../interfaces/user.interface";

export class UserUtils {
	private static baseURL = Endpoint.USERS;
	private static forgotURL = `${UserUtils.baseURL}/forgot`;
	private static loginURL = `${UserUtils.baseURL}/login`;
	private static logoutURL = `${UserUtils.baseURL}/logout`;
	private static signupURL = `${UserUtils.baseURL}/register`;

	public static userURLForAction(action: UserAction): string {
		let url: string;

		switch (action) {
			case UserAction.Forgot:
				url = UserUtils.forgotURL;
				break;
			case UserAction.Login:
				url = UserUtils.loginURL;
				break;
			case UserAction.Logout:
				url = UserUtils.logoutURL;
				break;
			case UserAction.Register:
				url = UserUtils.signupURL;
				break;
		}

		return url;
	}
}