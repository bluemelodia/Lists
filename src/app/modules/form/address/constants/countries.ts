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