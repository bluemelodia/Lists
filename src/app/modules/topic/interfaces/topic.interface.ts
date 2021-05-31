export interface ITopicDetails{
    image: string;
}

export interface ITopicMap {
    readonly [key: string]: ITopicDetails;
}
