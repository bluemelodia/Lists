import { Topic } from '../../../constants/topics';
import { TopicMap } from '../interfaces/topic.interface';

export const DEFAULT_IMAGE = 'default.png';

/**
 * These are the default topics. The user can
 * add more categories and choose an image to
 * upload for their category.
 * 
 * They can also change the image for the default
 * topics.
 */
export const topics: Topic[] = [
    Topic.Gifts,
    Topic.Family,
    Topic.Finance,
    Topic.Health,
    Topic.Hobby,
    Topic.Home,
    Topic.Study,
    Topic.Travel,
    Topic.Work,
];

export const TOPIC_MAP: TopicMap = {
    [Topic.Gifts]: {
        image: 'birthday.png',
    },
    [Topic.Family]: {
        image: 'family.png',
    },
    [Topic.Finance]: {
        image: 'finance.png',
    },
    [Topic.Health]: {
        image: 'health.png',
    },
    [Topic.Home]: {
        image: 'home.png',
    },
    [Topic.Hobby]: {
        image: 'hobby.png',
    },
    [Topic.Study]: {
        image: 'study.png',
    },
    [Topic.Travel]: {
        image: 'travel.png',
    },
    [Topic.Work]: {
        image: 'work.png',
    }
};