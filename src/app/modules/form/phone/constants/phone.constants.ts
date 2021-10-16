import { CountryISO, SearchCountryField } from "ngx-intl-tel-input";

export const PREFERRED_COUNTRIES = [
	CountryISO.UnitedStates,
	CountryISO.Canada,
];
export const SEARCH_COUNTRY_FIELDS = [
	SearchCountryField.Iso2,
	SearchCountryField.Name,
];
export const STARTING_COUNTRY = CountryISO.UnitedStates;