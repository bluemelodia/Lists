export enum Topic {
    Birthday = 'Birthday',
    Family = 'Family',
    Finance = 'Finance',
    Health = 'Health',
    Hobby = 'Hobby',
    Home = 'Home',
    Study = 'Study',
    Work = 'Work',
}

export interface TopicDetails {
    image: string;
}

export interface TopicMap {
    readonly [key: string]: TopicDetails;
}
