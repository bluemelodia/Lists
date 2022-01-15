import { countries, CountryData } from "../../../../constants/countries.constants";

export class CountryUtils {
	private static countryList: CountryData[];

	public static getCountries(): CountryData[] {
		if (!CountryUtils.countryList) {
			CountryUtils.countryList = CountryUtils.sortCountries();
		}
		return CountryUtils.countryList;
	}

	private static sortCountries(): CountryData[] {
		const sortedCountries: CountryData[] = [];
		Object.keys(countries).forEach((key: string) => {
			sortedCountries.push(countries[key]);
		});

		return sortedCountries.sort(CountryUtils.sortByName);
	}
	
	private static sortByName(a: CountryData, b: CountryData): number {
		return a.name < b.name ? -1 : (a.name > b.name) ? 1 : 0;
	}
}