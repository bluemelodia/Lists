import {
    IMenu,
    IMenuDetails,
    MENU,
    MenuItem,
    TOPICS,
} from '../constants/nav.constants';
import { Topic } from '../../../constants/topics';

export class NavUtils {
    public static getSubMenu(item: MenuItem): IMenu {
        return MENU[item]?.subMenu;
    }

    public static getTopic(topic: Topic): IMenuDetails {
        return TOPICS[topic];
    }
}