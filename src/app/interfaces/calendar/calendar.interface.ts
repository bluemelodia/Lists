export enum CalendarType {
	Lunar = "lunar",
	Solar = "solar"
}

export enum Month {
	January = "January",
	February = "February",
	March = "March",
	April = "April",
	May = "May",
	June = "June",
	July = "July",
	August = "August",
	September = "September",
	October = "October",
	November = "November",
	December = "December"
}

export const months = [
	Month.January,
	Month.February,
	Month.March,
	Month.April,
	Month.May,
	Month.June,
	Month.July,
	Month.August,
	Month.September,
	Month.October,
	Month.November,
	Month.December
];

export const shortMonths = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];

export const monthLengths = [
	31, // Jan
	29, // Feb
	31, // Mar
	30, // Apr
	31, // May
	31, // Jun
	30, // Jul
	31, // Aug
	30, // Sep
	31, // Oct
	30, // Nov
	31 // Dec
];