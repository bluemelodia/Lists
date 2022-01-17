// export const BASE_URL = "/todo/"
//"https://guacnbean.com/todo/";

interface URL {
	readonly [key: string]: string;
}

const BASE_URL = "/todo";
export const Endpoint: URL = {
	BIRTHDAY: BASE_URL + "/birthdays",
	CALENDAR: BASE_URL + "/ccal",
	GIFT: BASE_URL + "/gifts",
	MEETING: BASE_URL + "/meetings",
	SETTINGS: BASE_URL + "/settings",
	TASKS: BASE_URL + "/tasks",
	USERS: BASE_URL + "/users",
}
