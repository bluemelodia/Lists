export enum Recurrence {
	Once = 'Once',
	Daily = 'Daily',
	Monthly = 'Monthly',
	Sunday = 'Sunday',
	Monday = 'Monday',
	Tuesday = 'Tuesday',
	Wednesday = 'Wednesday',
	Thursday = 'Thursday',
	Friday = 'Friday',
	Saturday = 'Saturday',
}

export interface RecurrenceMap {
	[Recurrence.Once]?: boolean;
	[Recurrence.Daily]?: boolean;
	[Recurrence.Monthly]?: boolean;
	[Recurrence.Sunday]?: boolean;
	[Recurrence.Monday]?: boolean;
	[Recurrence.Tuesday]?: boolean;
	[Recurrence.Wednesday]?: boolean;
	[Recurrence.Thursday]?: boolean;
	[Recurrence.Friday]?: boolean;
	[Recurrence.Saturday]?: boolean;
}