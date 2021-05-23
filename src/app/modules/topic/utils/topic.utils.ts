import {
    DEFAULT_IMAGE,
    TOPIC_MAP,
} from '../constants/topics.constants';
import { Topic } from "../interfaces/topic.interface";

export class TopicUtils {
    public static imageForTopic(topic: Topic) {
        const topicDetails = TOPIC_MAP[topic];
        return `../images/${ topicDetails ? topicDetails.image : DEFAULT_IMAGE }`;
    }
}
