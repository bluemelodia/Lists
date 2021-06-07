export interface EventActions {
    call: boolean,
    text: boolean,
    gift: boolean
};

export enum Recurrence {
    Once = 'One Time',
    Weekly = 'Weekly',
    Biweekly = 'Every Other Week',
    Monthly = 'Monthly',
    Bimonthly = 'Every Other Month',
    Quarterly = 'Quarterly',
    Biannually = 'Every Six Months',
    Yearly = 'Yearly'
};

export interface Option {
    name: string, 
    value: any,
    selected?: boolean
};

export interface RecurrenceOption extends Option {};

export const recurrenceOptions: RecurrenceOption[] = [
    { name: Recurrence.Once, value: Recurrence.Once, selected: true },
    { name: Recurrence.Weekly, value: Recurrence.Weekly, selected: false },
    { name: Recurrence.Biweekly, value: Recurrence.Biweekly, selected: false},
    { name: Recurrence.Monthly, value: Recurrence.Monthly, selected: false },
    { name: Recurrence.Quarterly, value: Recurrence.Quarterly, selected: false },
    { name: Recurrence.Biannually, value: Recurrence.Biannually, selected: false },
    { name: Recurrence.Yearly, value: Recurrence.Yearly, selected: false },
];

export function getRecurrenceOptionByFrequency(recurrence: Recurrence): RecurrenceOption {
    return recurrenceOptions.find((option) => recurrence === option.value);
}

export enum EventType {
    Anniversary = 'Anniversary',
    Baby = 'Baby Shower',
    Birthday = 'Birthday',
    Bridal = 'Bridal Shower',
    CNY = 'Chinese New Year',
    Congrats = 'Congratulations',
    Engagement = 'Engagement',
    Father = 'Father\'s Day (US)',
    FatherTW = 'Father\'s Day (Taiwan)',
    Graduation = 'Graduation',
    Halloween = 'Halloween',
    Housewarming = 'Housewarming',
    Mother = 'Mother\'s Day (US)',
    MotherTW = 'Mother\'s Day (Taiwan)',
    NewYear = 'New Year',
    Wedding = 'Wedding',
    Valentines = 'Valentines',
    Xmas = 'Xmas',
    Other = 'Other'
};

export interface EventOption extends Option {
    recurrence?: Recurrence,
    lunar?: boolean, 
    nonConstant?: boolean, /* Date falls on a different day each year. CNY isn't nonConstant as it's always 1/1. */
    month?: number, 
    day?: number
};

/**
 * If it's lunar, then the event date will fall on a different solar date every year.
 */
export const eventTypes: EventOption[] = [
    { 
        name: EventType.Anniversary, 
        value: EventType.Anniversary, 
        selected: true, 
        recurrence: Recurrence.Yearly },
    { 
        name: EventType.Baby, 
        value: EventType.Baby,
        recurrence: Recurrence.Once
    },
    { 
        name: EventType.Birthday, 
        value: EventType.Birthday, 
        recurrence: Recurrence.Yearly
    },
    { 
        name: EventType.Bridal, 
        value: EventType.Bridal,
        recurrence: Recurrence.Once
    },
    { 
        name: EventType.CNY, 
        value: EventType.CNY, 
        recurrence: Recurrence.Yearly, 
        lunar: true 
    },
    { 
        name: EventType.Congrats, 
        value: EventType.Congrats,
        recurrence: Recurrence.Once
    },
    { 
        name: EventType.Engagement, 
        value: EventType.Engagement,
        recurrence: Recurrence.Once
    },
    { 
        name: EventType.Father, 
        value: EventType.Father, 
        recurrence: Recurrence.Yearly,
        nonConstant: true
    },
    { 
        name: EventType.FatherTW, 
        value: EventType.FatherTW, 
        recurrence: Recurrence.Yearly,
        month: 8,
        day: 8
    },
    { 
        name: EventType.Graduation, 
        value: EventType.Graduation,
        recurrence: Recurrence.Once
    },
    { 
        name: EventType.Halloween, 
        value: EventType.Halloween, 
        recurrence: Recurrence.Yearly,
        month: 10,
        day: 31
    },
    { 
        name: EventType.Housewarming, 
        value: EventType.Housewarming,
        recurrence: Recurrence.Once
    },
    { 
        name: EventType.Mother, 
        value: EventType.Mother, 
        recurrence: Recurrence.Yearly,
        nonConstant: true
    },
    { 
        name: EventType.MotherTW, 
        value: EventType.MotherTW, 
        recurrence: Recurrence.Yearly,
        nonConstant: true
    },
    { 
        name: EventType.NewYear, 
        value: EventType.NewYear, 
        recurrence: Recurrence.Yearly,
        month: 1,
        day: 1
    },
    { 
        name: EventType.Wedding, 
        value: EventType.Wedding,
        recurrence: Recurrence.Once
    },
    { 
        name: EventType.Valentines, 
        value: EventType.Valentines, 
        recurrence: Recurrence.Yearly,
        month: 2,
        day: 14
    },
    { 
        name: EventType.Xmas, 
        value: EventType.Xmas,
        recurrence: Recurrence.Yearly,
        month: 12,
        day: 25
    },
    { 
        name: EventType.Other, 
        value: EventType.Other 
    }
];