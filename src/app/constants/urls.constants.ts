// export const BASE_URL = '/todo/'
//'https://guacnbean.com/todo/';

interface URL {
    readonly [key: string]: string;
}

export const Endpoint: URL = {
    TODO: '/todo',
    CALENDAR: '/ccal',
}