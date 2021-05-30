export interface TopicDetails {
    image: string;
}

export interface TopicMap {
    readonly [key: string]: TopicDetails;
}
