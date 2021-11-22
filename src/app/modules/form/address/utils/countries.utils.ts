import { countries, CountryData } from "../constants/countries";

export class CountryUtils {
	private static countryList;

	public static getCountries() {
		if (!CountryUtils.countryList) {
			CountryUtils.countryList = CountryUtils.sortCountries();
		}
		console.log("===> return: ", CountryUtils.countryList);
		return CountryUtils.countryList;
	}

	private static sortCountries(): CountryData[] {
		const sortedCountries = [];
		Object.keys(countries).forEach((key: string) => {
			sortedCountries.push(countries[key]);
		});

		return sortedCountries.sort(CountryUtils.sortByName);
	}
	
	private static sortByName(a: CountryData, b: CountryData): number {
		return a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0;
	}
}