import {
    DEFAULT_IMAGE,
    TOPIC_MAP,
} from '../constants/topics.constants';
import { Topic } from '../../../constants/topics';

export class TopicUtils {
    public static imageForTopic(topic: Topic) {
        const topicDetails = TOPIC_MAP[topic];
        console.log("===> topicDetails: ", topicDetails, topic);
        return `./assets/images/${ topicDetails? topicDetails.image : DEFAULT_IMAGE }`;
    }
}
