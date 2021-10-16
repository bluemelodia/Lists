export enum Recurrence {
	Once = "One Time",
	Daily = "Daily",
	Weekly = "Weekly",
	Biweekly = "Every Other Week",
	Monthly = "Monthly",
	Bimonthly = "Every Other Month",
	Quarterly = "Quarterly",
	Biannually = "Every Six Months",
	Yearly = "Yearly"
}

export interface Option {
	name: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any,
	selected?: boolean
}

export const recurrenceOptions: Option[] = [
	{ name: Recurrence.Once, value: Recurrence.Once, selected: true },
	{ name: Recurrence.Weekly, value: Recurrence.Weekly, selected: false },
	{ name: Recurrence.Biweekly, value: Recurrence.Biweekly, selected: false },
	{ name: Recurrence.Monthly, value: Recurrence.Monthly, selected: false },
	{ name: Recurrence.Quarterly, value: Recurrence.Quarterly, selected: false },
	{ name: Recurrence.Biannually, value: Recurrence.Biannually, selected: false },
	{ name: Recurrence.Yearly, value: Recurrence.Yearly, selected: false },
];

export function getRecurrenceOptionByFrequency(recurrence: Recurrence): Option {
	return recurrenceOptions.find((option) => recurrence === option.value);
}