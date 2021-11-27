import { CountryISO } from "./country-iso.constants";

export interface Country {
	readonly [key: string]: CountryData;
}

export interface CountryData {
	name: string;
	code: string;
}

export enum Region {
	County = "County",
	State = "State",
	Oblast = "Oblast",
	Prefecture = "Prefecture",
	Province = "Province",
}

export const countries: Country = {
    AF: {
        name: "Afghanistan",
        code: "AF",
    },
	AX: {
        name: "Aland Islands",
        code: "AX",
    },
	AL: {
        name: "Albania",
        code: "AL",
    },
	DZ: {
        name: "Algeria",
        code: "DZ",
    },
	AS: {
        name: "American Samoa",
        code: "AS",
    },
	AD: {
        name: "Andorra",
        code: "AD",
    },
	AO: {
        name: "Angola",
        code: "AO",
    },
    AI: {
        name: "Anguilla",
        code: "AI",
    },
	AQ: {
        name: "Antarctica",
        code: "AQ",
    },
	AG: {
        name: "Antigua and Barbuda",
        code: "AG",
    },
	AR: {
        name: "Argentina",
        code: "AR",
    },
	AM: {
        name: "Armenia",
        code: "AM",
    },
	AW: {
        name: "Aruba",
        code: "AW",
    },
	AU: {
        name: "Australia",
        code: "AU",
    },
	AT: {
        name: "Austria",
        code: "AT",
    },
    AZ: {
        name: "Azerbaijan",
        code: "AZ",
    },
    BS: {
        name: "Bahamas",
        code: "BS",
    },
	BH: {
        name: "Bahrain",
        code: "BH",
    },
	BD: {
        name: "Bangladesh",
        code: "BD",
    },
	BB: {
        name: "Barbados",
        code: "BB",
    },
	BY: {
        name: "Belarus",
        code: "BY",
    },
    BE: {
        name: "Belgium",
		code: "BE",
    },
	BZ: {
        name: "Belize",
        code: "BZ",
    },
	BJ: {
        name: "Benin",
        code: "BJ",
    },
	BM: {
        name: "Bermuda",
        code: "BM",
    },
	BT: {
        name: "Bhutan",
        code: "BT",
    },
	BO: {
        name: "Bolivia",
        code: "BO",
    },
	BQ: {
        name: "Bonaire, Saint Eustatius and Saba ",
        code: "BQ",
    },
	BA: {
        name: "Bosnia and Herzegovina",
        code: "BA",
    },
	BW: {
        name: "Botswana",
        code: "BW",
    },
	BV: {
        name: "Bouvet Island",
        code: "BV",
    },
	BR: {
        name: "Brazil",
        code: "BR",
    },
	IO: {
        name: "British Indian Ocean Territory",
        code: "IO",
    },
	VG: {
        name: "British Virgin Islands",
        code: "VG",
    },
	BN: {
        name: "Brunei",
        code: "BN",
    },
	BG: {
        name: "Bulgaria",
        code: "BG",
    },
    BF: {
        name: "Burkina Faso",
        code: "BF",
    },
	BI: {
        name: "Burundi",
        code: "BI",
    },
	KH: {
        name: "Cambodia",
        code: "KH",
    },
	CM: {
        name: "Cameroon",
        code: "CM",
    },
	CA: {
        name: "Canada",
        code: "CA",
    },
	CV: {
        name: "Cape Verde",
        code: "CV",
    },
	KY: {
        name: "Cayman Islands",
        code: "KY",
    },
	CF: {
        name: "Central African Republic",
        code: "CF",
    },
	TD: {
        name: "Chad",
        code: "TD",
    },
	CL: {
        name: "Chile",
        code: "CL",
    },
	CN: {
        name: "China",
        code: "CN",
    },
	CX: {
        name: "Christmas Island",
        code: "CX",
    },
	CC: {
        name: "Cocos Islands",
        code: "CC",
    },
	CO: {
        name: "Colombia",
        code: "CO",
    },
	KM: {
        name: "Comoros",
        code: "KM",
    },
	CK: {
        name: "Cook Islands",
        code: "CK",
    },
	CR: {
        name: "Costa Rica",
        code: "CR",
    },
	HR: {
        name: "Croatia",
        code: "HR",
    },
	CW: {
        name: "Curacao",
        code: "CW",
    },
	CU: {
        name: "Cuba",
        code: "CU",
    },
	CY: {
        name: "Cyprus",
        code: "CY",
    },
	CZ: {
        name: "Czech Republic",
        code: "CZ",
    },
    BL: {
        name: "Saint Barthelemy",
        code: "BL",
    },
    WF: {
        name: "Wallis and Futuna",
        code: "WF",
    },
    TL: {
        name: "East Timor",
        code: "TL",
    },
    JM: {
        name: "Jamaica",
        code: "JM",
    },
    
    
    WS: {
        name: "Samoa",
        code: "WS",
    },
    
    JE: {
        name: "Jersey",
        code: "JE",
    },
    
    RU: {
        name: "Russia",
        code: "RU",
    },
    RW: {
        name: "Rwanda",
        code: "RW",
    },
    RS: {
        name: "Serbia",
        code: "RS",
    },
    
    RE: {
        name: "Reunion",
        code: "RE",
    },
    TM: {
        name: "Turkmenistan",
        code: "TM",
    },
    TJ: {
        name: "Tajikistan",
        code: "TJ",
    },
    RO: {
        name: "Romania",
        code: "RO",
    },
    TK: {
        name: "Tokelau",
        code: "TK",
    },
    GW: {
        name: "Guinea-Bissau",
        code: "GW",
    },
    GU: {
        name: "Guam",
        code: "GU",
    },
    GT: {
        name: "Guatemala",
        code: "GT",
    },
    GS: {
        name: "South Georgia and the South Sandwich Islands",
        code: "GS",
    },
    GR: {
        name: "Greece",
        code: "GR",
    },
    GQ: {
        name: "Equatorial Guinea",
        code: "GQ",
    },
    GP: {
        name: "Guadeloupe",
        code: "GP",
    },
    JP: {
        name: "Japan",
        code: "JP",
    },
    GY: {
        name: "Guyana",
        code: "GY",
    },
    GG: {
        name: "Guernsey",
        code: "GG",
    },
    GF: {
        name: "French Guiana",
        code: "GF",
    },
    GE: {
        name: "Georgia",
        code: "GE",
    },
    GD: {
        name: "Grenada",
        code: "GD",
    },
    GB: {
        name: "United Kingdom",
        code: "GB",
    },
    GA: {
        name: "Gabon",
        code: "GA",
    },
    SV: {
        name: "El Salvador",
        code: "SV",
    },
    GN: {
        name: "Guinea",
        code: "GN",
    },
    GM: {
        name: "Gambia",
        code: "GM",
    },
    GL: {
        name: "Greenland",
        code: "GL",
    },
    GI: {
        name: "Gibraltar",
        code: "GI",
    },
    GH: {
        name: "Ghana",
        code: "GH",
    },
    OM: {
        name: "Oman",
        code: "OM",
    },
    TN: {
        name: "Tunisia",
        code: "TN",
    },
    JO: {
        name: "Jordan",
        code: "JO",
    },
    
    HT: {
        name: "Haiti",
        code: "HT",
    },
    HU: {
        name: "Hungary",
        code: "HU",
    },
    HK: {
        name: "Hong Kong",
        code: "HK",
    },
    HN: {
        name: "Honduras",
        code: "HN",
    },
    HM: {
        name: "Heard Island and McDonald Islands",
        code: "HM",
    },
    VE: {
        name: "Venezuela",
        code: "VE",
    },
    PR: {
        name: "Puerto Rico",
        code: "PR",
    },
    PS: {
        name: "Palestinian Territory",
        code: "PS",
    },
    PW: {
        name: "Palau",
        code: "PW",
    },
    PT: {
        name: "Portugal",
        code: "PT",
    },
    SJ: {
        name: "Svalbard and Jan Mayen",
        code: "SJ",
    },
    PY: {
        name: "Paraguay",
        code: "PY",
    },
    IQ: {
        name: "Iraq",
        code: "IQ",
    },
    PA: {
        name: "Panama",
        code: "PA",
    },
    PF: {
        name: "French Polynesia",
        code: "PF",
    },
    PG: {
        name: "Papua New Guinea",
        code: "PG",
    },
    PE: {
        name: "Peru",
        code: "PE",
    },
    PK: {
        name: "Pakistan",
        code: "PK",
    },
    PH: {
        name: "Philippines",
        code: "PH",
    },
    PN: {
        name: "Pitcairn",
        code: "PN",
    },
    PL: {
        name: "Poland",
        code: "PL",
    },
    PM: {
        name: "Saint Pierre and Miquelon",
        code: "PM",
    },
    ZM: {
        name: "Zambia",
        code: "ZM",
    },
    EH: {
        name: "Western Sahara",
        code: "EH",
    },
    EE: {
        name: "Estonia",
        code: "EE",
    },
    EG: {
        name: "Egypt",
        code: "EG",
    },
    ZA: {
        name: "South Africa",
        code: "ZA",
    },
    EC: {
        name: "Ecuador",
        code: "EC",
    },
    IT: {
        name: "Italy",
        code: "IT",
    },
    VN: {
        name: "Vietnam",
        code: "VN",
    },
    SB: {
        name: "Solomon Islands",
        code: "SB",
    },
    ET: {
        name: "Ethiopia",
        code: "ET",
    },
    SO: {
        name: "Somalia",
        code: "SO",
    },
    ZW: {
        name: "Zimbabwe",
        code: "ZW",
    },
    SA: {
        name: "Saudi Arabia",
        code: "SA",
    },
    ES: {
        name: "Spain",
        code: "ES",
    },
    ER: {
        name: "Eritrea",
        code: "ER",
    },
    ME: {
        name: "Montenegro",
        code: "ME",
    },
    MD: {
        name: "Moldova",
        code: "MD",
    },
    MG: {
        name: "Madagascar",
        code: "MG",
    },
    MF: {
        name: "Saint Martin",
        code: "MF",
    },
    MA: {
        name: "Morocco",
        code: "MA",
    },
    MC: {
        name: "Monaco",
        code: "MC",
    },
    UZ: {
        name: "Uzbekistan",
        code: "UZ",
    },
    MM: {
        name: "Myanmar",
        code: "MM",
    },
    ML: {
        name: "Mali",
        code: "ML",
    },
    MO: {
        name: "Macao",
        code: "MO",
    },
    MN: {
        name: "Mongolia",
        code: "MN",
    },
    MH: {
        name: "Marshall Islands",
        code: "MH",
    },
    MK: {
        name: "Macedonia",
        code: "MK",
    },
    MU: {
        name: "Mauritius",
        code: "MU",
    },
    MT: {
        name: "Malta",
        code: "MT",
    },
    MW: {
        name: "Malawi",
        code: "MW",
    },
    MV: {
        name: "Maldives",
        code: "MV",
    },
    MQ: {
        name: "Martinique",
        code: "MQ",
    },
    MP: {
        name: "Northern Mariana Islands",
        code: "MP",
    },
    MS: {
        name: "Montserrat",
        code: "MS",
    },
    MR: {
        name: "Mauritania",
        code: "MR",
    },
    IM: {
        name: "Isle of Man",
        code: "IM",
    },
    UG: {
        name: "Uganda",
        code: "UG",
    },
    TZ: {
        name: "Tanzania",
        code: "TZ",
    },
    MY: {
        name: "Malaysia",
        code: "MY",
    },
    MX: {
        name: "Mexico",
        code: "MX",
    },
    IL: {
        name: "Israel",
        code: "IL",
    },
    FR: {
        name: "France",
        code: "FR",
    },
    
    SH: {
        name: "Saint Helena",
        code: "SH",
    },
    FI: {
        name: "Finland",
        code: "FI",
    },
    FJ: {
        name: "Fiji",
        code: "FJ",
    },
    FK: {
        name: "Falkland Islands",
        code: "FK",
    },
    FM: {
        name: "Micronesia",
        code: "FM",
    },
    FO: {
        name: "Faroe Islands",
        code: "FO",
    },
    NI: {
        name: "Nicaragua",
        code: "NI",
    },
    NL: {
        name: "Netherlands",
        code: "NL",
    },
    NO: {
        name: "Norway",
        code: "NO",
    },
    NA: {
        name: "Namibia",
        code: "NA",
    },
    VU: {
        name: "Vanuatu",
        code: "VU",
    },
    NC: {
        name: "New Caledonia",
        code: "NC",
    },
    NE: {
        name: "Niger",
        code: "NE",
    },
    NF: {
        name: "Norfolk Island",
        code: "NF",
    },
    NG: {
        name: "Nigeria",
        code: "NG",
    },
    NZ: {
        name: "New Zealand",
        code: "NZ",
    },
    NP: {
        name: "Nepal",
        code: "NP",
    },
    NR: {
        name: "Nauru",
        code: "NR",
    },
    NU: {
        name: "Niue",
        code: "NU",
    },
    
    XK: {
        name: "Kosovo",
        code: "XK",
    },
    CI: {
        name: "Ivory Coast",
        code: "CI",
    },
    CH: {
        name: "Switzerland",
        code: "CH",
    },
    
    CG: {
        name: "Republic of the Congo",
        code: "CG",
    },

    CD: {
        name: "Democratic Republic of the Congo",
        code: "CD",
    },

    SZ: {
        name: "Swaziland",
        code: "SZ",
    },
    SY: {
        name: "Syria",
        code: "SY",
    },
    SX: {
        name: "Sint Maarten",
        code: "SX",
    },
    KG: {
        name: "Kyrgyzstan",
        code: "KG",
    },
    KE: {
        name: "Kenya",
        code: "KE",
    },
    SS: {
        name: "South Sudan",
        code: "SS",
    },
    SR: {
        name: "Suriname",
        code: "SR",
    },
    KI: {
        name: "Kiribati",
        code: "KI",
    },
    
    KN: {
        name: "Saint Kitts and Nevis",
        code: "KN",
    },
    
    ST: {
        name: "Sao Tome and Principe",
        code: "ST",
    },
    SK: {
        name: "Slovakia",
        code: "SK",
    },
    KR: {
        name: "South Korea",
        code: "KR",
    },
    SI: {
        name: "Slovenia",
        code: "SI",
    },
    KP: {
        name: "North Korea",
        code: "KP",
    },
    KW: {
        name: "Kuwait",
        code: "KW",
    },
    SN: {
        name: "Senegal",
        code: "SN",
    },
    SM: {
        name: "San Marino",
        code: "SM",
    },
    SL: {
        name: "Sierra Leone",
        code: "SL",
    },
    SC: {
        name: "Seychelles",
        code: "SC",
    },
    KZ: {
        name: "Kazakhstan",
        code: "KZ",
    },
    
    SG: {
        name: "Singapore",
        code: "SG",
    },
    SE: {
        name: "Sweden",
        code: "SE",
    },
    SD: {
        name: "Sudan",
        code: "SD",
    },
    DO: {
        name: "Dominican Republic",
        code: "DO",
    },
    DM: {
        name: "Dominica",
        code: "",
    },
    DJ: {
        name: "Djibouti",
        code: "DJ",
    },
    DK: {
        name: "Denmark",
        code: "DK",
    },

    DE: {
        name: "Germany",
        code: "DE",
    },
    YE: {
        name: "Yemen",
        code: "YE",
    },
    
    US: {
        name: "United States",
        code: "US",
    },
    UY: {
        name: "Uruguay",
        code: "UY",
    },
    YT: {
        name: "Mayotte",
        code: "YT",
    },
    UM: {
        name: "United States Minor Outlying Islands",
        code: "UM",
    },
    LB: {
        name: "Lebanon",
        code: "LB",
    },
    LC: {
        name: "Saint Lucia",
        code: "LC",
    },
    LA: {
        name: "Laos",
        code: "LA",
    },
    TV: {
        name: "Tuvalu",
        code: "TV",
    },
    TW: {
        name: "Taiwan",
        code: "TW",
    },
    TT: {
        name: "Trinidad and Tobago",
        code: "TT",
    },
    TR: {
        name: "Turkey",
        code: "TR",
    },
    LK: {
        name: "Sri Lanka",
        code: "LK",
    },
    LI: {
        name: "Liechtenstein",
        code: "LI",
    },
    LV: {
        name: "Latvia",
        code: "LV",
    },
    TO: {
        name: "Tonga",
        code: "TO",
    },
    LT: {
        name: "Lithuania",
        code: "LT",
    },
    LU: {
        name: "Luxembourg",
        code: "LU",
    },
    LR: {
        name: "Liberia",
        code: "LR",
    },
    LS: {
        name: "Lesotho",
        code: "LS",
    },
    TH: {
        name: "Thailand",
        code: "TH",
    },
    TF: {
        name: "French Southern Territories",
        code: "TF",
    },
    TG: {
        name: "Togo",
        code: "TG",
    },
    
    TC: {
        name: "Turks and Caicos Islands",
        code: "TC",
    },
    LY: {
        name: "Libya",
        code: "LY",
    },
    VA: {
        name: "Vatican",
        code: "VA",
    },
    VC: {
        name: "Saint Vincent and the Grenadines",
        code: "VC",
    },
    AE: {
        name: "United Arab Emirates",
        code: "AE",
    },
    VI: {
        name: "U.S. Virgin Islands",
        code: "VI",
    },
    IS: {
        name: "Iceland",
        code: "IS",
    },
    IR: {
        name: "Iran",
        code: "IR",
    },
    
    IN: {
        name: "India",
        code: "IN",
    },
    
    IE: {
        name: "Ireland",
        code: "IE",
    },
    ID: {
        name: "Indonesia",
        code: "ID",
    },
    UA: {
        name: "Ukraine",
        code: "UA",
    },
    QA: {
        name: "Qatar",
        code: "QA",
    },
    MZ: {
        name: "Mozambique",
		code: "MZ",
    }
};

export const allCountries = [
	[
		'Afghanistan (‫افغانستان‬‎)',
		CountryISO.Afghanistan,
		'93'
	],
    [
		'Albania (Shqipëri)',
		CountryISO.Albania,
		'355'
	],
	[
		'Algeria (‫الجزائر‬‎)',
		CountryISO.Algeria,
		'213'
	],
	[
		'American Samoa',
		'as',
		'1',
		1,
		[
			'684',
		]
	],
	[
		'Andorra',
		CountryISO.Andorra,
		'376'
	],
	[
		'Angola',
		CountryISO.Angola,
		'244'
	],
	[
		'Anguilla',
		'ai',
		'1',
		1,
		[
			'264',
		]
	],
	[
		'Antigua and Barbuda',
		'ag',
		'1',
		1,
		[
			'268',
		]
	],
	[
		'Argentina',
		CountryISO.Argentina,
		'54'
	],
	[
		'Armenia (Հայաստան)',
		CountryISO.Armenia,
		'374'
	],
	[
		'Aruba',
		CountryISO.Aruba,
		'297'
	],
	[
		'Australia',
		CountryISO.Australia,
		'61',
		0
	],
	[
		'Austria (Österreich)',
		CountryISO.Austria,
		'43'
	],
	[
		'Azerbaijan (Azərbaycan)',
		CountryISO.Azerbaijan,
		'994'
	],
	[
		'Bahamas',
		'bs',
		'1',
		1,
		[
			'242',
		]
	],
	[
		'Bahrain (‫البحرين‬‎)',
		CountryISO.Bahrain,
		'973'
	],
	[
		'Bangladesh (বাংলাদেশ)',
		CountryISO.Bangladesh,
		'880'
	],
	[
		'Barbados',
		'bb',
		'1',
		1,
		[
			'246',
		]
	],
	[
		'Belarus (Беларусь)',
		CountryISO.Belarus,
		'375'
	],
	[
		'Belgium (België)',
		CountryISO.Belgium,
		'32'
	],
	[
		'Belize',
		CountryISO.Belize,
		'501'
	],
	[
		'Benin (Bénin)',
		CountryISO.Benin,
		'229'
	],
	[
		'Bermuda',
		'bm',
		'1',
		1,
		[
			'441',
		]
	],
	[
		'Bhutan (འབྲུག)',
		CountryISO.Bhutan,
		'975'
	],
	[
		'Bolivia',
		CountryISO.Bolivia,
		'591'
	],
	[
		'Bosnia and Herzegovina (Босна и Херцеговина)',
		CountryISO.BosniaAndHerzegovina,
		'387'
	],
	[
		'Botswana',
		CountryISO.Botswana,
		'267'
	],
	[
		'Brazil (Brasil)',
		CountryISO.Brazil,
		'55'
	],
	[
		'British Indian Ocean Territory',
		CountryISO.BritishIndianOceanTerritory,
		'246'
	],
	[
		'British Virgin Islands',
		'vg',
		'1',
		1,
		[
			'284',
		]
	],
	[
		'Brunei',
		CountryISO.Brunei,
		'673'
	],
	[
		'Bulgaria (България)',
		CountryISO.Bulgaria,
		'359'
	],
	[
		'Burkina Faso',
		CountryISO.BurkinaFaso,
		'226'
	],
	[
		'Burundi (Uburundi)',
		CountryISO.Burundi,
		'257'
	],
	[
		'Cambodia (កម្ពុជា)',
		CountryISO.Cambodia,
		'855'
	],
	[
		'Cameroon (Cameroun)',
		CountryISO.Cameroon,
		'237'
	],
	[
		'Canada',
		CountryISO.Canada,
		'1',
		1,
		[
			'204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416',
			'418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587',
			'604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807',
			'819', '825', '867', '873', '902', '905'
		]
	],
	[
		'Cape Verde (Kabu Verdi)',
		CountryISO.CapeVerde,
		'238'
	],
	[
		'Caribbean Netherlands',
		CountryISO.CaribbeanNetherlands,
		'599',
		1
	],
	[
		'Cayman Islands',
		'ky',
		'1',
		1,
		[
			'345',
		]
	],
	[
		'Central African Republic (République centrafricaine)',
		CountryISO.CentralAfricanRepublic,
		'236'
	],
	[
		'Chad (Tchad)',
		CountryISO.Chad,
		'235'
	],
	[
		'Chile',
		CountryISO.Chile,
		'56'
	],
	[
		'China (中国)',
		CountryISO.China,
		'86'
	],
	[
		'Christmas Island',
		CountryISO.ChristmasIsland,
		'61',
		2
	],
	[
		'Cocos (Keeling) Islands',
		CountryISO.Cocos,
		'61',
		1
	],
	[
		'Colombia',
		CountryISO.Colombia,
		'57'
	],
	[
		'Comoros (‫جزر القمر‬‎)',
		CountryISO.Comoros,
		'269'
	],
	[
		'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
		CountryISO.CongoDRCJamhuriYaKidemokrasiaYaKongo,
		'243'
	],
	[
		'Congo (Republic) (Congo-Brazzaville)',
		CountryISO.CongoRepublicCongoBrazzaville,
		'242'
	],
	[
		'Cook Islands',
		CountryISO.CookIslands,
		'682'
	],
	[
		'Costa Rica',
		CountryISO.CostaRica,
		'506'
	],
	[
		'Côte d’Ivoire',
		CountryISO.CôteDIvoire,
		'225'
	],
	[
		'Croatia (Hrvatska)',
		CountryISO.Croatia,
		'385'
	],
	[
		'Cuba',
		CountryISO.Cuba,
		'53'
	],
	[
		'Curaçao',
		CountryISO.Curaçao,
		'599',
		0
	],
	[
		'Cyprus (Κύπρος)',
		CountryISO.Cyprus,
		'357'
	],
	[
		'Czech Republic (Česká republika)',
		CountryISO.CzechRepublic,
		'420'
	],
	[
		'Denmark (Danmark)',
		CountryISO.Denmark,
		'45'
	],
	[
		'Djibouti',
		CountryISO.Djibouti,
		'253'
	],
	[
		'Dominica',
		CountryISO.Dominica,
		'1767'
	],
	[
		'Dominican Republic (República Dominicana)',
		CountryISO.DominicanRepublic,
		'1',
		2,
		['809', '829', '849']
	],
	[
		'Ecuador',
		CountryISO.Ecuador,
		'593'
	],
	[
		'Egypt (‫مصر‬‎)',
		CountryISO.Egypt,
		'20'
	],
	[
		'El Salvador',
		CountryISO.ElSalvador,
		'503'
	],
	[
		'Equatorial Guinea (Guinea Ecuatorial)',
		CountryISO.EquatorialGuinea,
		'240'
	],
	[
		'Eritrea',
		CountryISO.Eritrea,
		'291'
	],
	[
		'Estonia (Eesti)',
		CountryISO.Estonia,
		'372'
	],
	[
		'Ethiopia',
		CountryISO.Ethiopia,
		'251'
	],
	[
		'Falkland Islands (Islas Malvinas)',
		CountryISO.FalklandIslands,
		'500'
	],
	[
		'Faroe Islands (Føroyar)',
		CountryISO.FaroeIslands,
		'298'
	],
	[
		'Fiji',
		CountryISO.Fiji,
		'679'
	],
	[
		'Finland (Suomi)',
		CountryISO.Finland,
		'358',
		0
	],
	[
		'France',
		CountryISO.France,
		'33'
	],
	[
		'French Guiana (Guyane française)',
		CountryISO.FrenchGuiana,
		'594'
	],
	[
		'French Polynesia (Polynésie française)',
		CountryISO.FrenchPolynesia,
		'689'
	],
	[
		'Gabon',
		CountryISO.Gabon,
		'241'
	],
	[
		'Gambia',
		CountryISO.Gambia,
		'220'
	],
	[
		'Georgia (საქართველო)',
		CountryISO.Georgia,
		'995'
	],
	[
		'Germany (Deutschland)',
		CountryISO.Germany,
		'49'
	],
	[
		'Ghana (Gaana)',
		CountryISO.Ghana,
		'233'
	],
	[
		'Gibraltar',
		CountryISO.Gibraltar,
		'350'
	],
	[
		'Greece (Ελλάδα)',
		CountryISO.Greece,
		'30'
	],
	[
		'Greenland (Kalaallit Nunaat)',
		CountryISO.Greenland,
		'299'
	],
	[
		'Grenada',
		CountryISO.Grenada,
		'1473'
	],
	[
		'Guadeloupe',
		CountryISO.Guadeloupe,
		'590',
		0
	],
	[
		'Guam',
		'gu',
		'1',
		1,
		[
			'671',
		]
	],
	[
		'Guatemala',
		CountryISO.Guatemala,
		'502'
	],
	[
		'Guernsey',
		CountryISO.Guernsey,
		'44',
		1,
		[1481]
	],
	[
		'Guinea (Guinée)',
		CountryISO.Guinea,
		'224'
	],
	[
		'Guinea-Bissau (Guiné Bissau)',
		CountryISO.GuineaBissau,
		'245'
	],
	[
		'Guyana',
		CountryISO.Guyana,
		'592'
	],
	[
		'Haiti',
		CountryISO.Haiti,
		'509'
	],
	[
		'Honduras',
		CountryISO.Honduras,
		'504'
	],
	[
		'Hong Kong (香港)',
		CountryISO.HongKong,
		'852'
	],
	[
		'Hungary (Magyarország)',
		CountryISO.Hungary,
		'36'
	],
	[
		'Iceland (Ísland)',
		CountryISO.Iceland,
		'354'
	],
	[
		'India (भारत)',
		CountryISO.India,
		'91'
	],
	[
		'Indonesia',
		CountryISO.Indonesia,
		'62'
	],
	[
		'Iran (‫ایران‬‎)',
		CountryISO.Iran,
		'98'
	],
	[
		'Iraq (‫العراق‬‎)',
		CountryISO.Iraq,
		'964'
	],
	[
		'Ireland',
		CountryISO.Ireland,
		'353'
	],
	[
		'Isle of Man',
		CountryISO.IsleOfMan,
		'44',
		2,
		[1624]
	],
	[
		'Israel (‫ישראל‬‎)',
		CountryISO.Israel,
		'972'
	],
	[
		'Italy (Italia)',
		CountryISO.Italy,
		'39',
		0
	],
	[
		'Jamaica',
		'jm',
		'1',
		1,
		[
			'876',
		]
	],
	[
		'Japan (日本)',
		CountryISO.Japan,
		'81'
	],
	[
		'Jersey',
		CountryISO.Jersey,
		'44',
		3,
		[1534]
	],
	[
		'Jordan (‫الأردن‬‎)',
		CountryISO.Jordan,
		'962'
	],
	[
		'Kazakhstan (Казахстан)',
		CountryISO.Kazakhstan,
		'7',
		1
	],
	[
		'Kenya',
		CountryISO.Kenya,
		'254'
	],
	[
		'Kiribati',
		CountryISO.Kiribati,
		'686'
	],
	[
		'Kosovo',
		CountryISO.Kosovo,
		'383'
	],
	[
		'Kuwait (‫الكويت‬‎)',
		CountryISO.Kuwait,
		'965'
	],
	[
		'Kyrgyzstan (Кыргызстан)',
		CountryISO.Kyrgyzstan,
		'996'
	],
	[
		'Laos (ລາວ)',
		CountryISO.Laos,
		'856'
	],
	[
		'Latvia (Latvija)',
		CountryISO.Latvia,
		'371'
	],
	[
		'Lebanon (‫لبنان‬‎)',
		CountryISO.Lebanon,
		'961'
	],
	[
		'Lesotho',
		CountryISO.Lesotho,
		'266'
	],
	[
		'Liberia',
		CountryISO.Liberia,
		'231'
	],
	[
		'Libya (‫ليبيا‬‎)',
		CountryISO.Libya,
		'218'
	],
	[
		'Liechtenstein',
		CountryISO.Liechtenstein,
		'423'
	],
	[
		'Lithuania (Lietuva)',
		CountryISO.Lithuania,
		'370'
	],
	[
		'Luxembourg',
		CountryISO.Luxembourg,
		'352'
	],
	[
		'Macau (澳門)',
		CountryISO.Macau,
		'853'
	],
	[
		'Macedonia (FYROM) (Македонија)',
		CountryISO.Macedonia,
		'389'
	],
	[
		'Madagascar (Madagasikara)',
		CountryISO.Madagascar,
		'261'
	],
	[
		'Malawi',
		CountryISO.Malawi,
		'265'
	],
	[
		'Malaysia',
		CountryISO.Malaysia,
		'60'
	],
	[
		'Maldives',
		CountryISO.Maldives,
		'960'
	],
	[
		'Mali',
		CountryISO.Mali,
		'223'
	],
	[
		'Malta',
		CountryISO.Malta,
		'356'
	],
	[
		'Marshall Islands',
		CountryISO.MarshallIslands,
		'692'
	],
	[
		'Martinique',
		CountryISO.Martinique,
		'596'
	],
	[
		'Mauritania (‫موريتانيا‬‎)',
		CountryISO.Mauritania,
		'222'
	],
	[
		'Mauritius (Moris)',
		CountryISO.Mauritius,
		'230'
	],
	[
		'Mayotte',
		CountryISO.Mayotte,
		'262',
		1
	],
	[
		'Mexico (México)',
		CountryISO.Mexico,
		'52'
	],
	[
		'Micronesia',
		CountryISO.Micronesia,
		'691'
	],
	[
		'Moldova (Republica Moldova)',
		CountryISO.Moldova,
		'373'
	],
	[
		'Monaco',
		CountryISO.Monaco,
		'377'
	],
	[
		'Mongolia (Монгол)',
		CountryISO.Mongolia,
		'976'
	],
	[
		'Montenegro (Crna Gora)',
		CountryISO.Montenegro,
		'382'
	],
	[
		'Montserrat',
		'ms',
		'1',
		1,
		[
			'664',
		]
	],
	[
		'Morocco (‫المغرب‬‎)',
		CountryISO.Morocco,
		'212',
		0
	],
	[
		'Mozambique (Moçambique)',
		CountryISO.Mozambique,
		'258'
	],
	[
		'Myanmar (Burma) (မြန်မာ)',
		CountryISO.Myanmar,
		'95'
	],
	[
		'Namibia (Namibië)',
		CountryISO.Namibia,
		'264'
	],
	[
		'Nauru',
		CountryISO.Nauru,
		'674'
	],
	[
		'Nepal (नेपाल)',
		CountryISO.Nepal,
		'977'
	],
	[
		'Netherlands (Nederland)',
		CountryISO.Netherlands,
		'31'
	],
	[
		'New Caledonia (Nouvelle-Calédonie)',
		CountryISO.NewCaledonia,
		'687'
	],
	[
		'New Zealand',
		CountryISO.NewZealand,
		'64'
	],
	[
		'Nicaragua',
		CountryISO.Nicaragua,
		'505'
	],
	[
		'Niger (Nijar)',
		CountryISO.Niger,
		'227'
	],
	[
		'Nigeria',
		CountryISO.Nigeria,
		'234'
	],
	[
		'Niue',
		CountryISO.Niue,
		'683'
	],
	[
		'Norfolk Island',
		CountryISO.NorfolkIsland,
		'672'
	],
	[
		'North Korea (조선 민주주의 인민 공화국)',
		CountryISO.NorthKorea,
		'850'
	],
	[
		'Northern Mariana Islands',
		CountryISO.NorthernMarianaIslands,
		'1670'
	],
	[
		'Norway (Norge)',
		CountryISO.Norway,
		'47',
		0
	],
	[
		'Oman (‫عُمان‬‎)',
		CountryISO.Oman,
		'968'
	],
	[
		'Pakistan (‫پاکستان‬‎)',
		CountryISO.Pakistan,
		'92'
	],
	[
		'Palau',
		CountryISO.Palau,
		'680'
	],
	[
		'Palestine (‫فلسطين‬‎)',
		CountryISO.Palestine,
		'970'
	],
	[
		'Panama (Panamá)',
		CountryISO.Panama,
		'507'
	],
	[
		'Papua New Guinea',
		CountryISO.PapuaNewGuinea,
		'675'
	],
	[
		'Paraguay',
		CountryISO.Paraguay,
		'595'
	],
	[
		'Peru (Perú)',
		CountryISO.Peru,
		'51'
	],
	[
		'Philippines',
		CountryISO.Philippines,
		'63'
	],
	[
		'Poland (Polska)',
		CountryISO.Poland,
		'48'
	],
	[
		'Portugal',
		CountryISO.Portugal,
		'351'
	],
	[
		'Puerto Rico',
		CountryISO.PuertoRico,
		'1',
		3,
		['787', '939']
	],
	[
		'Qatar (‫قطر‬‎)',
		CountryISO.Qatar,
		'974'
	],
	[
		'Réunion (La Réunion)',
		CountryISO.Réunion,
		'262',
		0
	],
	[
		'Romania (România)',
		CountryISO.Romania,
		'40'
	],
	[
		'Russia (Россия)',
		CountryISO.Russia,
		'7',
		0
	],
	[
		'Rwanda',
		CountryISO.Rwanda,
		'250'
	],
	[
		'Saint Barthélemy (Saint-Barthélemy)',
		CountryISO.SaintBarthélemy,
		'590',
		1
	],
	[
		'Saint Helena',
		CountryISO.SaintHelena,
		'290'
	],
	[
		'Saint Kitts and Nevis',
		CountryISO.SaintKittsAndNevis,
		'1869'
	],
	[
		'Saint Lucia',
		'lc',
		'1',
		1,
		[
			'758',
		]
	],
	[
		'Saint Martin (Saint-Martin (partie française))',
		CountryISO.SaintMartin,
		'590',
		2
	],
	[
		'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
		CountryISO.SaintPierreAndMiquelon,
		'508'
	],
	[
		'Saint Vincent and the Grenadines',
		'vc',
		'1',
		1,
		[
			'784',
		]
	],
	[
		'Samoa',
		CountryISO.Samoa,
		'685'
	],
	[
		'San Marino',
		CountryISO.SanMarino,
		'378'
	],
	[
		'São Tomé and Príncipe (São Tomé e Príncipe)',
		CountryISO.SãoToméAndPríncipe,
		'239'
	],
	[
		'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
		CountryISO.SaudiArabia,
		'966'
	],
	[
		'Senegal (Sénégal)',
		CountryISO.Senegal,
		'221'
	],
	[
		'Serbia (Србија)',
		CountryISO.Serbia,
		'381'
	],
	[
		'Seychelles',
		CountryISO.Seychelles,
		'248'
	],
	[
		'Sierra Leone',
		CountryISO.SierraLeone,
		'232'
	],
	[
		'Singapore',
		CountryISO.Singapore,
		'65'
	],
	[
		'Sint Maarten',
		'sx',
		'1',
		1,
		[
			'721',
		]
	],
	[
		'Slovakia (Slovensko)',
		CountryISO.Slovakia,
		'421'
	],
	[
		'Slovenia (Slovenija)',
		CountryISO.Slovenia,
		'386'
	],
	[
		'Solomon Islands',
		CountryISO.SolomonIslands,
		'677'
	],
	[
		'Somalia (Soomaaliya)',
		CountryISO.Somalia,
		'252'
	],
	[
		'South Africa',
		CountryISO.SouthAfrica,
		'27'
	],
	[
		'South Korea (대한민국)',
		CountryISO.SouthKorea,
		'82'
	],
	[
		'South Sudan (‫جنوب السودان‬‎)',
		CountryISO.SouthSudan,
		'211'
	],
	[
		'Spain (España)',
		CountryISO.Spain,
		'34'
	],
	[
		'Sri Lanka (ශ්‍රී ලංකාව)',
		CountryISO.SriLanka,
		'94'
	],
	[
		'Sudan (‫السودان‬‎)',
		CountryISO.Sudan,
		'249'
	],
	[
		'Suriname',
		CountryISO.Suriname,
		'597'
	],
	[
		'Svalbard and Jan Mayen',
		CountryISO.SvalbardAndJanMayen,
		'47',
		1
	],
	[
		'Swaziland',
		CountryISO.Swaziland,
		'268'
	],
	[
		'Sweden (Sverige)',
		CountryISO.Sweden,
		'46'
	],
	[
		'Switzerland (Schweiz)',
		CountryISO.Switzerland,
		'41'
	],
	[
		'Syria (‫سوريا‬‎)',
		CountryISO.Syria,
		'963'
	],
	[
		'Taiwan (台灣)',
		CountryISO.Taiwan,
		'886'
	],
	[
		'Tajikistan',
		CountryISO.Tajikistan,
		'992'
	],
	[
		'Tanzania',
		CountryISO.Tanzania,
		'255'
	],
	[
		'Thailand (ไทย)',
		CountryISO.Thailand,
		'66'
	],
	[
		'Timor-Leste',
		CountryISO.TimorLeste,
		'670'
	],
	[
		'Togo',
		CountryISO.Togo,
		'228'
	],
	[
		'Tokelau',
		CountryISO.Tokelau,
		'690'
	],
	[
		'Tonga',
		CountryISO.Tonga,
		'676'
	],
	[
		'Trinidad and Tobago',
		'tt',
		'1',
		1,
		[
			'868',
		]
	],
	[
		'Tunisia (‫تونس‬‎)',
		CountryISO.Tunisia,
		'216'
	],
	[
		'Turkey (Türkiye)',
		CountryISO.Turkey,
		'90'
	],
	[
		'Turkmenistan',
		CountryISO.Turkmenistan,
		'993'
	],
	[
		'Turks and Caicos Islands',
		CountryISO.TurksAndCaicosIslands,
		'1649'
	],
	[
		'Tuvalu',
		CountryISO.Tuvalu,
		'688'
	],
	[
		'U.S. Virgin Islands',
		'vi',
		'1',
		1,
		[
			'340',
		]
	],
	[
		'Uganda',
		CountryISO.Uganda,
		'256'
	],
	[
		'Ukraine (Україна)',
		CountryISO.Ukraine,
		'380'
	],
	[
		'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
		CountryISO.UnitedArabEmirates,
		'971'
	],
	[
		'United Kingdom',
		CountryISO.UnitedKingdom,
		'44',
		0
	],
	[
		'United States',
		CountryISO.UnitedStates,
		'1',
		0
	],
	[
		'Uruguay',
		CountryISO.Uruguay,
		'598'
	],
	[
		'Uzbekistan (Oʻzbekiston)',
		CountryISO.Uzbekistan,
		'998'
	],
	[
		'Vanuatu',
		CountryISO.Vanuatu,
		'678'
	],
	[
		'Vatican City (Città del Vaticano)',
		CountryISO.VaticanCity,
		'39',
		1
	],
	[
		'Venezuela',
		CountryISO.Venezuela,
		'58'
	],
	[
		'Vietnam (Việt Nam)',
		CountryISO.Vietnam,
		'84'
	],
	[
		'Wallis and Futuna',
		CountryISO.WallisAndFutuna,
		'681'
	],
	[
		'Western Sahara (‫الصحراء الغربية‬‎)',
		CountryISO.WesternSahara,
		'212',
		1
	],
	[
		'Yemen (‫اليمن‬‎)',
		CountryISO.Yemen,
		'967'
	],
	[
		'Zambia',
		CountryISO.Zambia,
		'260'
	],
	[
		'Zimbabwe',
		CountryISO.Zimbabwe,
		'263'
	],
	[
		'Åland Islands',
		CountryISO.ÅlandIslands,
		'358',
		1
	]
];