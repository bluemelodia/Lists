import {
    IMenu,
    MENU,
    MenuItem,
} from '../constants/nav.constants';

export class NavUtils {
    public static getSubMenu(item: MenuItem): IMenu {
        return MENU[item]?.subMenu;
    }
}