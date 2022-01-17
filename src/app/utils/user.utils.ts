
import { Endpoint } from "../constants/urls.constants";
import { UserAction } from "../interfaces/user.interface";

export class UserUtils {
	private static baseURL = Endpoint.USERS;
	private static loginURL = `${UserUtils.baseURL}/login`;
	private static signupURL = `${UserUtils.baseURL}/register`;

	public static userURLForAction(action: UserAction): string {
		let url: string;

		switch (action) {
			case UserAction.Register:
				url = UserUtils.signupURL;
				break;
			case UserAction.Login:
				url = UserUtils.loginURL;
				break;
		}

		return url;
	}
}