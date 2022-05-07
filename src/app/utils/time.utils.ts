interface Time {
	hours: number,
	minutes: number,
}

export class TimeUtils {
	public static get12HourTime(hours: number, minutes: number): string {
		let time = '';
		if (hours > 12) { // 1pm - 11pm
			time += `${hours - 12}`;
		} else if (hours === 0) { // 12am
			time += '12';
		} else { // 1am to 11am
			time += hours;
		}

		time += `:${minutes < 10 ? `0${minutes}` : minutes }`;
		time += hours >= 12 ? ' PM' : ' AM';

		return time;
	}

	public static get24HourTime(timeStr: string): Time {
		const time = timeStr?.split(":");
		let hour = 0;
		let min = 0;
		if (time?.length > 0) {
			const minsAndZone = time[1]?.split(" ");
			hour = Number(time[0]);
			if (minsAndZone?.length > 0) {
				min = Number(minsAndZone[0]);
				if (minsAndZone[1] === 'PM') {
					if (hour !== 12) {
						hour += 12;
					}
				} else {
					if (hour === 12) { // 12AM -> 0
						hour = 0;
					}
				}
			}
		}

		return {
			hours: hour,
			minutes: min
		};
	}

	public static getDayOfWeek(meetingDay: number): string {
		switch (meetingDay) {
			case 0:
				return "Sun";
			case 1:
				return "Mon";
			case 2:
				return "Tues";
			case 3:
				return "Wed";
			case 4:
				return "Thu";
			case 5:
				return "Fri";
			case 6:
				return "Sat";
		}
	}

	public static getMonth(month: number): string {
		switch (month) {
			case 0:
				return "Jan";
			case 1:
				return "Feb";
			case 2:
				return "Mar";
			case 3:
				return "Apr";
			case 4:
				return "May";
			case 5:
				return "Jun";
			case 6:
				return "Jul";
			case 7:
				return "Aug";
			case 8:
				return "Sep";
			case 9:
				return "Oct";
			case 10:
				return "Nov";
			case 11:
				return "Dec";
		}
	}

	public static getDateOfMonth(date: number): string {
		const remainder = date % 10;
		let suffix = 'th';

		if (remainder === 1 && date !== 11) { // 1st, 21st, 31st
			suffix = 'st';
		} else if (remainder === 2 && date !== 12) { // 2nd, 22nd
			suffix = 'nd';
		} else if (remainder === 3 && date !== 13) { // 3rd, 23rd
			suffix = 'rd';
		}

		return `${date}${suffix}`;
	}
}