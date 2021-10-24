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

		time += `:${minutes}`;
		time += hours >= 12 ? ' PM' : ' AM';

		return time;
	}

	public static get24HourTime(timeStr: string): Time {
		const time = timeStr.split(":");
		let hour = 0;
		let min = 0;
		if (time?.length > 0) {
			const minsAndZone = time[1].split(" ");
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
}