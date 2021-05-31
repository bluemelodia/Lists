import {
    IMenu,
    MenuItem,
    MENU_ITEMS,
} from '../constants/nav.constants';

export class NavUtils {
    public static getSubMenu(item: MenuItem): IMenu {
        return MENU_ITEMS[item].submenu;
    }
}