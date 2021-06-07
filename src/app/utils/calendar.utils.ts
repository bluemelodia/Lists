import { CalendarMonth, CalendarWeek, CalendarDay, CalendarYear, CalendarKey } from '../types/calendar/calendar-response.types';

/*
* Cache calendar years that were previously fetched from the service, to save time
* and processing for subsequent requests.
*/
const cache = {};

export function cacheCalendar(year: number, calendar: CalendarYear): void {
    cache[year] = calendar;
}

export function getCachedCalendar(year: number): CalendarYear {
    return cache[year];
}

export function isLeapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

export function getParsedCalendar(calendar: any): CalendarYear {
    try {
      /* Already parsed. */
      if (calendar.year && calendar.months) {
          return calendar;
      }

      let calJSON = JSON.parse(calendar);
      const year = calJSON[CalendarKey.Year];
      const calYear = year.$.value;
      let months = parseMonths(year[CalendarKey.Month], calYear);
      
      const cal: CalendarYear = { 
        year: Number(calYear),
        months: months
      };
      console.log(`---> 📅 💚 Created calendar for ${ year }: `, cal);
      cacheCalendar(calYear, cal);
      return cal;
    } catch(error) {
      console.log(`---> 📅 🚨 Unable to generate calendar: `, error);
      return null;
    }
}  

/* 
* Date references are much easier if you add the year field to each month.
*/
function parseMonths(monthJSON: any, year: number): CalendarMonth[] {
    const months = [];
    for (let monthObj of monthJSON) {
      const month = monthObj.$;
      const weeks = parseWeek(monthObj[CalendarKey.Week]);
      months.push({
        cname: month.cname,
        name: month.name,
        value: Number(month.value),
        weeks: weeks,
        year: Number(year)
      });
    }
    return months;
}

function parseWeek(weekJSON: any): CalendarWeek[] {
  const week = [];
  for (let weekObj of weekJSON) {
      const days = parseDays(weekObj[CalendarKey.Day]);
      week.push({
        days: days
      });
  }
  return week;
}

function parseDays(daysJSON: any): CalendarDay[] {
  const days = [];
  for (let dayObj of daysJSON) {
    const day = dayObj.$;
    if (day) {
      days.push({
        value: day.value, 
        cmonth: Number(day.cmonth),
        leap: day.leap ? true : false,
        cdate: Number(day.cdate),
        cmonthname: day.cmonthname
      });
    } else {
      days.push({
        value: -1
      });
    }
  }
  return days;
}