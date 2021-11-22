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
    BD: {
        name: "Bangladesh",
        code: "BD",
    },
    BE: {
        name: "Belgium",
		code: "BE",
    },
    BF: {
        name: "Burkina Faso",
        code: "BF",
    },
    BG: {
        name: "Bulgaria",
        code: "BG",
    },
    BA: {
        name: "Bosnia and Herzegovina",
        code: "BA",
    },
    BB: {
        name: "Barbados",
        code: "BB",
    },
    WF: {
        name: "Wallis and Futuna",
        code: "WF",
    },
    BL: {
        name: "Saint Barthelemy",
        code: "BL",
    },
    BM: {
        name: "Bermuda",
        code: "BM",
    },
    BN: {
        name: "Brunei",
        code: "BN",
    },
    BO: {
        name: "Bolivia",
        code: "BO",
    },
    BH: {
        name: "Bahrain",
        code: "BH",
    },
    BI: {
        name: "Burundi",
        code: "BI",
    },
    BJ: {
        name: "Benin",
        code: "BJ",
    },
    BT: {
        name: "Bhutan",
        code: "BT",
    },
    JM: {
        name: "Jamaica",
        code: "JM",
    },
    BV: {
        name: "Bouvet Island",
        code: "BV",
    },
    BW: {
        name: "Botswana",
        code: "BW",
    },
    WS: {
        name: "Samoa",
        code: "WS",
    },
    BQ: {
        name: "Bonaire, Saint Eustatius and Saba ",
        code: "BQ",
    },
    BR: {
        name: "Brazil",
        code: "BR",
    },
    BS: {
        name: "Bahamas",
        code: "BS",
    },
    JE: {
        name: "Jersey",
        code: "JE",
    },
    BY: {
        name: "Belarus",
        code: "BY",
    },
    BZ: {
        name: "Belize",
        code: "BZ",
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
    TL: {
        name: "East Timor",
        code: "TL",
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
    HR: {
        name: "Croatia",
        code: "HR",
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
    IO: {
        name: "British Indian Ocean Territory",
        code: "IO",
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
    CK: {
        name: "Cook Islands",
        code: "CK",
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
    CO: {
        name: "Colombia",
        code: "CO",
    },
    CN: {
        name: "China",
        code: "CN",
    },
    CM: {
        name: "Cameroon",
        code: "CM",
    },
    CL: {
        name: "Chile",
        code: "CL",
    },
    CC: {
        name: "Cocos Islands",
        code: "CC",
    },
    CA: {
        name: "Canada",
        code: "CA",
    },
    CG: {
        name: "Republic of the Congo",
        code: "CG",
    },
    CF: {
        name: "Central African Republic",
        code: "CF",
    },
    CD: {
        name: "Democratic Republic of the Congo",
        code: "CD",
    },
    CZ: {
        name: "Czech Republic",
        code: "CZ",
    },
    CY: {
        name: "Cyprus",
        code: "CY",
    },
    CX: {
        name: "Christmas Island",
        code: "CX",
    },
    CR: {
        name: "Costa Rica",
        code: "CR",
    },
    CW: {
        name: "Curacao",
        code: "CW",
    },
    CV: {
        name: "Cape Verde",
        code: "CV",
    },
    CU: {
        name: "Cuba",
        code: "CU",
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
    KH: {
        name: "Cambodia",
        code: "KH",
    },
    KN: {
        name: "Saint Kitts and Nevis",
        code: "KN",
    },
    KM: {
        name: "Comoros",
        code: "KM",
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
    KY: {
        name: "Cayman Islands",
        code: "KY",
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
    VG: {
        name: "British Virgin Islands",
        code: "VG",
    },
    DE: {
        name: "Germany",
        code: "DE",
    },
    YE: {
        name: "Yemen",
        code: "YE",
    },
    DZ: {
        name: "Algeria",
        code: "DZ",
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
    TD: {
        name: "Chad",
        code: "TD",
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
    AD: {
        name: "Andorra",
        code: "AD",
    },
    AG: {
        name: "Antigua and Barbuda",
        code: "AG",
    },
    AF: {
        name: "Afghanistan",
        code: "AF",
    },
    AI: {
        name: "Anguilla",
        code: "AI",
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
    AM: {
        name: "Armenia",
        code: "AM",
    },
    AL: {
        name: "Albania",
        code: "AL",
    },
    AO: {
        name: "Angola",
        code: "AO",
    },
    AQ: {
        name: "Antarctica",
        code: "AQ",
    },
    AS: {
        name: "American Samoa",
        code: "AS",
    },
    AR: {
        name: "Argentina",
        code: "AR",
    },
    AU: {
        name: "Australia",
        code: "AU",
    },
    AT: {
        name: "Austria",
        code: "AT",
    },
    AW: {
        name: "Aruba",
        code: "AW",
    },
    IN: {
        name: "India",
        code: "IN",
    },
    AX: {
        name: "Aland Islands",
        code: "AX",
    },
    AZ: {
        name: "Azerbaijan",
        code: "AZ",
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