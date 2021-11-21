export interface Country {
	readonly [key: string]: CountryData;
}

export interface CountryData {
	name: string;
	region?: Region;
	areas?: string[];
}

export enum Region {
	County = "County",
	State = "State",
	Oblast = "Oblast",
	Prefecture = "Prefecture",
	Province = "Province",
}

export const countries: Country = {
    "BD":{
        name: "Bangladesh"
    },
    "BE":{
        name: "Belgium"
    },
    "BF":{
        name: "Burkina Faso"
    },
    "BG":{
        name: "Bulgaria"
    },
    "BA":{
        name: "Bosnia and Herzegovina"
    },
    "BB":{
        name: "Barbados"
    },
    "WF":{
        name: "Wallis and Futuna"
    },
    "BL":{
        name: "Saint Barthelemy"
    },
    "BM":{
        name: "Bermuda"
    },
    "BN":{
        name: "Brunei"
    },
    "BO":{
        name: "Bolivia"
    },
    "BH":{
        name: "Bahrain"
    },
    "BI":{
        name: "Burundi"
    },
    "BJ":{
        name: "Benin"
    },
    "BT":{
        name: "Bhutan"
    },
    "JM":{
        name: "Jamaica"
    },
    "BV":{
        name: "Bouvet Island"
    },
    "BW":{
        name: "Botswana"
    },
    "WS":{
        name: "Samoa"
    },
    "BQ":{
        name: "Bonaire, Saint Eustatius and Saba "
    },
    "BR":{
        name: "Brazil",
		region: Region.State,
		areas: [
			"Acre",
			"Alagoas",
			"Amapá",
			"Amazonas",
			"Bahia",
			"Ceará",
			"Distrito Federal",
			"Espírito Santo",
			"Goiás",
			"Maranhão",
			"Mato Grosso",
			"Mato Grosso do Sul",
			"Minas Gerais",
			"Pará",
			"Paraíba",
			"Paraná",
			"Pernambuco",
			"Piauí",
			"Rio de Janeiro",
			"Rio Grande do Norte",
			"Rio Grande do Sul",
			"Rondônia",
			"Roraima",
			"Santa Catarina",
			"São Paulo",
			"Sergipe",
			"Tocantins",
		]
    },
    "BS":{
        name: "Bahamas"
    },
    "JE":{
        name: "Jersey"
    },
    "BY":{
        name: "Belarus"
    },
    "BZ":{
        name: "Belize"
    },
    "RU":{
        name: "Russia",
		region: Region.Oblast,
		areas: [
			"Amur",
			"Arkhangelsk",
			"Astrakhan",
			"Belgorod",
			"Bryansk",
			"Chelyabinsk",
			"Irkutsk",
			"Ivanovo",
			"Kaliningrad",
			"Kaluga",
			"Kemerovo",
			"Kirov",
			"Kostroma",
			"Kurgan",
			"Kursk",
			"Leningrad",
			"Lipetsk",
			"Magadan",
			"Moscow",
			"Murmansk",
			"Nizhny Novgorod",
			"Novgorod",
			"Novosibirsk",
			"Omsk",
			"Orenburg",
			"Oryol",
			"Penza",
			"Pskov",
			"Rostov",
			"Ryazan",
			"Sakhalin",
			"Samara",
			"Saratov",
			"Smolensk",
			"Sverdlovsk",
			"Tambov",
			"Tomsk",
			"Tver",
			"Tula",
			"Tyumen",
			"Ulyanovsk",
			"Vladimir",
			"Volgograd",
			"Vologda",
			"Voronezh",
			"Yaroslavl",
		]
    },
    "RW":{
        name: "Rwanda"
    },
    "RS":{
        name: "Serbia"
    },
    "TL":{
        name: "East Timor"
    },
    "RE":{
        name: "Reunion"
    },
    "TM":{
        name: "Turkmenistan"
    },
    "TJ":{
        name: "Tajikistan"
    },
    "RO":{
        name: "Romania"
    },
    "TK":{
        name: "Tokelau"
    },
    "GW":{
        name: "Guinea-Bissau"
    },
    "GU":{
        name: "Guam"
    },
    "GT":{
        name: "Guatemala"
    },
    "GS":{
        name: "South Georgia and the South Sandwich Islands"
    },
    "GR":{
        name: "Greece"
    },
    "GQ":{
        name: "Equatorial Guinea"
    },
    "GP":{
        name: "Guadeloupe"
    },
    "JP":{
        name: "Japan",
		region: Region.Prefecture,
		areas: [
			"Aichi",
			"Akita",
			"Aomori",
			"Chiba",
			"Ehime",
			"Fukui",
			"Fukuoka",
			"Fukushima",
			"Gifu",
			"Gunma",
			"Hiroshima",
			"Hokkaido",
			"Hyōgo",
			"Ibaraki",
			"Ishikawa",
			"Iwate",
			"Kagawa",
			"Kagoshima",
			"Kanagawa",
			"Kōchi",
			"Kumamoto",
			"Kyoto",
			"Mie",
			"Miyazaki",
			"Nagano",
			"Nagasaki",
			"Nara",
			"Niigata",
			"Ōita",
			"Okayama",
			"Okinawa",
			"Osaka",
			"Saga",
			"Saitama",
			"Shiga",
			"Shimane",
			"Shizuoka",
			"Tochigi",
			"Tokushima",
			"Tokyo",
			"Tottori",
			"Toyama",
			"Wakayama",
			"Yamaguchi",
			"Yamanashi",
		]
    },
    "GY":{
        name: "Guyana"
    },
    "GG":{
        name: "Guernsey"
    },
    "GF":{
        name: "French Guiana"
    },
    "GE":{
        name: "Georgia"
    },
    "GD":{
        name: "Grenada"
    },
    "GB":{
        name: "United Kingdom",
		region: Region.County,
		areas: [
			"Aberdeen",
			"Anglesey",
			"Antrim",
			"Argyll",
			"Armagh",
			"Ayr",
			"Banff",
			"Bedford",
			"Berks",
			"Berwick",
			"Brecon",
			"Buckingham",
			"Bute",
			"Caernarfon",
			"Caithness",
			"Cambridge",
			"Cardigan",
			"Carmarthen",
			"Chester",
			"Clackmannan",
			"Cornwall",
			"Cromarty",
			"Cumberland",
			"Denbigh",
			"Derby",
			"Devon",
			"Dorset",
			"Down",
			"Dumfries",
			"Dunbarton",
			"Durham",
			"Edinburgh",
			"Elgin/Moray",
			"Essex",
			"Fermanagh",
			"Fife",
			"Flint",
			"Forfar",
			"Glamorgan",
			"Gloucester",
			"Haddington",
			"Hereford",
			"Hertford",
			"Huntingdon",
			"Inverness",
			"Kent",
			"Kincardine",
			"Kinross",
			"Kirkcudbright",
			"Lanark",
			"Lancaster",
			"Leicester",
			"Lincoln",
			"Linlithgow",
			"Londonderry",
			"Merioneth",
			"Middlesex",
			"Monmouth",
			"Montgomery",
			"Nairn",
			"Norfolk",
			"Northampton",
			"Northumberland",
			"Nottingham",
			"Orkney",
			"Oxford",
			"Peebles",
			"Pembroke",
			"Perth",
			"Radnor",
			"Renfrew",
			"Ross",
			"Roxburgh",
			"Rutland",
			"Selkirk",
			"Shetland",
			"Shrewsbury/Salop",
			"Somerset",
			"Southampton",
			"Stafford",
			"Stirling",
			"Suffolk",
			"Surrey",
			"Sussex",
			"Sutherland",
			"Tyrone",
			"Warwick",
			"Westmorland",
			"Wigtown",
			"Wilts",
			"Worcester",
			"York",
		]
    },
    "GA":{
        name: "Gabon"
    },
    "SV":{
        name: "El Salvador"
    },
    "GN":{
        name: "Guinea"
    },
    "GM":{
        name: "Gambia"
    },
    "GL":{
        name: "Greenland"
    },
    "GI":{
        name: "Gibraltar"
    },
    "GH":{
        name: "Ghana"
    },
    "OM":{
        name: "Oman"
    },
    "TN":{
        name: "Tunisia"
    },
    "JO":{
        name: "Jordan"
    },
    "HR":{
        name: "Croatia"
    },
    "HT":{
        name: "Haiti"
    },
    "HU":{
        name: "Hungary"
    },
    "HK":{
        name: "Hong Kong"
    },
    "HN":{
        name: "Honduras"
    },
    "HM":{
        name: "Heard Island and McDonald Islands"
    },
    "VE":{
        name: "Venezuela"
    },
    "PR":{
        name: "Puerto Rico"
    },
    "PS":{
        name: "Palestinian Territory"
    },
    "PW":{
        name: "Palau"
    },
    "PT":{
        name: "Portugal"
    },
    "SJ":{
        name: "Svalbard and Jan Mayen"
    },
    "PY":{
        name: "Paraguay"
    },
    "IQ":{
        name: "Iraq"
    },
    "PA":{
        name: "Panama"
    },
    "PF":{
        name: "French Polynesia"
    },
    "PG":{
        name: "Papua New Guinea"
    },
    "PE":{
        name: "Peru"
    },
    "PK":{
        name: "Pakistan"
    },
    "PH":{
        name: "Philippines"
    },
    "PN":{
        name: "Pitcairn"
    },
    "PL":{
        name: "Poland"
    },
    "PM":{
        name: "Saint Pierre and Miquelon"
    },
    "ZM":{
        name: "Zambia"
    },
    "EH":{
        name: "Western Sahara"
    },
    "EE":{
        name: "Estonia"
    },
    "EG":{
        name: "Egypt"
    },
    "ZA":{
        name: "South Africa"
    },
    "EC":{
        name: "Ecuador"
    },
    "IT":{
        name: "Italy",
		region: Region.Province,
		areas: [
			"Agrigento",
			"Alessandria",
			"Ancona",
			"Aosta",
			"Arezzo",
			"Ascoli Piceno",
			"Asti",
			"Avellino",
			"Bari",
			"Barletta-Andria-Trani",
			"Belluno",
			"Benevento",
			"Bergamo",
			"Biella",
			"Bologna",
			"Brescia",
			"Brindisi",
			"Cagliari",
			"Caltanissetta",
			"Campobasso",
			"Caserta",
			"Catania",
			"Catanzaro",
			"Chieti",
			"Como",
			"Cosenza",
			"Cremona",
			"Crotone",
			"Cuneo",
			"Enna",
			"Fermo",
			"Ferrara",
			"Florence",
			"Foggia",
			"Forlì-Cesena",
			"Frosinone",
			"Genoa",
			"Gorizia",
			"Grosseto",
			"Imperia",
			"Isernia",
			"La Spezia",
			"L'Aquila",
			"Latina",
			"Lecce",
			"Lecco",
			"Livorno",
			"Lodi",
			"Lucca",
			"Macerata",
			"Mantua",
			"Massa and Carrara",
			"Matera",
			"Messina",
			"Milan",
			"Modena",
			"Monza and Brianza",
			"Naples",
			"Novara",
			"Nuoro",
			"Oristano",
			"Padua",
			"Palermo",
			"Parma",
			"Pavia",
			"Perugia",
			"Pesaro and Urbino",
			"Pescara",
			"Piacenza",
			"Pisa",
			"Pistoia",
			"Pordenone",
			"Potenza",
			"Prato",
			"Ragusa",
			"Ravenna",
			"Reggio Calabria",
			"Reggio Emilia",
			"Rieti",
			"Rimini",
			"Rome",
			"Rovigo",
			"Salerno",
			"Sassari",
			"Savona",
			"Siena",
			"Sondrio",
			"South Sardinia",
			"South Tyrol",
			"Syracuse",
			"Taranto",
			"Teramo",
			"Terni",
			"Trapani",
			"Trento",
			"Treviso",
			"Trieste",
			"Turin",
			"Udine",
			"Varese",
			"Venice",
			"Verbano-Cusio-Ossola",
			"Vercelli",
			"Verona",
			"Vibo Valentia",
			"Vicenza",
			"Viterbo",
		]
    },
    "VN":{
        name: "Vietnam",
		region: Region.Province,
		areas: [
			"An Giang",
			"Bà Rịa-Vũng Tàu",
			"Bắc Giang",
			"Bắc Kạn",
			"Bạc Liêu",
			"Bắc Ninh",
			"Bến Tre",
			"Bình Định",
			"Bình Dương",
			"Bình Phước",
			"Bình Thuận",
			"Cà Mau",
			"Cần Thơ",
			"Cao Bằng",
			"Đà Nẵng",
			"Đắk Lắk",
			"Đắk Nông",
			"Điện Biên",
			"Đồng Nai",
			"Đồng Tháp",
			"Gia Lai",
			"Hà Giang",
			"Hà Nam",
			"Hà Nội",
			"Hà Tĩnh",
			"Hải Dương",
			"Hải Phòng",
			"Hậu Giang",
			"Hồ Chí Minh",
			"Hòa Bình",
			"Hưng Yên",
			"Khánh Hòa",
			"Kiên Giang",
			"Kon Tum",
			"Lâm Đồng",
			"Lạng Sơn",
			"Lai Châu",
			"Lào Cai",
			"Long An",
			"Nam Định",
			"Nghệ An",
			"Ninh Bình",
			"Ninh Thuận",
			"Phú Thọ",
			"Phú Yên",
			"Quảng Bình",
			"Quảng Nam",
			"Quảng Ngãi",
			"Quảng Ninh",
			"Quảng Trị",
			"Sóc Trăng",
			"Sơn La",
			"Tây Ninh",
			"Thái Bình",
			"Thái Nguyên",
			"Thanh Hóa",
			"Thừa Thiên-Huế",
			"Tiền Giang",
			"Trà Vinh",
			"Tuyên Quang",
			"Vĩnh Long",
			"Vĩnh Yên",
			"Yên Bái",
		]
    },
    "SB":{
        name: "Solomon Islands"
    },
    "ET":{
        name: "Ethiopia",
		region: Region.State,
		areas: [
			"Afar",
			"Amhara",
			"Benishangul-Gumuz",
			"Gambela",
			"Harari",
			"Oromia",
			"Somali",
			"Southern Nations",
			"Tigray",
		]
    },
    "SO":{
        name: "Somalia"
    },
    "ZW":{
        name: "Zimbabwe"
    },
    "SA":{
        name: "Saudi Arabia"
    },
    "ES":{
        name: "Spain",
		region: Region.Province,
		areas: [
			"La Coruña",
			"Álava",
			"Albacete",
			"Alicante",
			"Almería",
			"Asturias",
			"Ávila",
			"Badajoz",
			"Balearic Islands",
			"Barcelona",
			"Biscay",
			"Burgos",
			"Cáceres",
			"Cádiz",
			"Cantabria",
			"Castellón",
			"Ciudad Real",
			"Córdoba",
			"Cuenca",
			"Guipúzcoa",
			"Girona",
			"Granada",
			"Guadalajara",
			"Huelva",
			"Huesca",
			"Jaén",
			"La Rioja",
			"Las Palmas",
			"León",
			"Lleida",
			"Lugo",
			"Madrid",
			"Málaga",
			"Murcia",
			"Navarre",
			"Ourense",
			"Palencia",
			"Pontevedra",
			"Salamanca",
			"Santa Cruz de Tenerife",
			"Segovia",
			"Seville",
			"Soria",
			"Tarragona",
			"Teruel",
			"Toledo",
			"Valencia",
			"Valladolid",
			"Zamora",
			"Zaragoza",
		]
    },
    "ER":{
        name: "Eritrea"
    },
    "ME":{
        name: "Montenegro"
    },
    "MD":{
        name: "Moldova"
    },
    "MG":{
        name: "Madagascar"
    },
    "MF":{
        name: "Saint Martin"
    },
    "MA":{
        name: "Morocco"
    },
    "MC":{
        name: "Monaco"
    },
    "UZ":{
        name: "Uzbekistan"
    },
    "MM":{
        name: "Myanmar"
    },
    "ML":{
        name: "Mali"
    },
    "MO":{
        name: "Macao"
    },
    "MN":{
        name: "Mongolia"
    },
    "MH":{
        name: "Marshall Islands"
    },
    "MK":{
        name: "Macedonia"
    },
    "MU":{
        name: "Mauritius"
    },
    "MT":{
        name: "Malta"
    },
    "MW":{
        name: "Malawi"
    },
    "MV":{
        name: "Maldives"
    },
    "MQ":{
        name: "Martinique"
    },
    "MP":{
        name: "Northern Mariana Islands"
    },
    "MS":{
        name: "Montserrat"
    },
    "MR":{
        name: "Mauritania"
    },
    "IM":{
        name: "Isle of Man"
    },
    "UG":{
        name: "Uganda"
    },
    "TZ":{
        name: "Tanzania"
    },
    "MY":{
        name: "Malaysia"
    },
    "MX":{
        name: "Mexico",
		region: Region.State,
		areas: [
			"Aguascalientes",
			"Baja California",
			"Baja California Sur",
			"Campeche",
			"Chiapas",
			"Chihuahua",
			"Coahuila",
			"Colima",
			"Durango",
			"Guanajuato",
			"Guerrero",
			"Hidalgo",
			"Jalisco",
			"México",
			"Mexico City",
			"Michoacán",
			"Morelos",
			"Nayarit",
			"Nuevo León",
			"Oaxaca",
			"Puebla",
			"Querétaro",
			"Quintana Roo",
			"San Luis Potosí",
			"Sinaloa",
			"Sonora",
			"Tabasco",
			"Tamaulipas",
			"Tlaxcala",
			"Veracruz",
			"Yucatán",
			"Zacatecas",
		]
    },
    "IL":{
        name: "Israel"
    },
    "FR":{
        name: "France"
    },
    "IO":{
        name: "British Indian Ocean Territory"
    },
    "SH":{
        name: "Saint Helena"
    },
    "FI":{
        name: "Finland"
    },
    "FJ":{
        name: "Fiji"
    },
    "FK":{
        name: "Falkland Islands"
    },
    "FM":{
        name: "Micronesia"
    },
    "FO":{
        name: "Faroe Islands"
    },
    "NI":{
        name: "Nicaragua"
    },
    "NL":{
        name: "Netherlands"
    },
    "NO":{
        name: "Norway"
    },
    "NA":{
        name: "Namibia"
    },
    "VU":{
        name: "Vanuatu"
    },
    "NC":{
        name: "New Caledonia"
    },
    "NE":{
        name: "Niger"
    },
    "NF":{
        name: "Norfolk Island"
    },
    "NG":{
        name: "Nigeria"
    },
    "NZ":{
        name: "New Zealand"
    },
    "NP":{
        name: "Nepal"
    },
    "NR":{
        name: "Nauru"
    },
    "NU":{
        name: "Niue"
    },
    "CK":{
        name: "Cook Islands"
    },
    "XK":{
        name: "Kosovo"
    },
    "CI":{
        name: "Ivory Coast"
    },
    "CH":{
        name: "Switzerland"
    },
    "CO":{
        name: "Colombia"
    },
    "CN":{
        name: "China",
		region: Region.Province,
		areas: [
			"Anhui",
			"Fujian",
			"Gansu",
			"Guangdong",
			"Guangxi",
			"Guizhou",
			"Hainan",
			"Hebei",
			"Heilongjiang",
			"Henan",
			"Hubei",
			"Hunan",
			"Inner Mongolia",
			"Jiangsu",
			"Jiangxi",
			"Jilin",
			"Liaoning",
			"Ningxia Hui",
			"Qinghai",
			"Shaanxi",
			"Shangdong",
			"Sichuan",
			"Tibet",
			"Xinjiang",
			"Yunnan",
			"Zhejiang",
		]
    },
    "CM":{
        name: "Cameroon"
    },
    "CL":{
        name: "Chile"
    },
    "CC":{
        name: "Cocos Islands"
    },
    "CA":{
        name: "Canada",
		region: Region.Province,
		areas: [
			"Alberta", 
			"British Columbia", 
			"Manitoba",
			"New Brunswick",
			"Newfoundland",
			"Nova Scotia",
			"Ontario",
			"Prince Edward Island",
			"Quebec",
			"Saskatchewan",
		],
    },
    "CG":{
        name: "Republic of the Congo"
    },
    "CF":{
        name: "Central African Republic"
    },
    "CD":{
        name: "Democratic Republic of the Congo"
    },
    "CZ":{
        name: "Czech Republic"
    },
    "CY":{
        name: "Cyprus"
    },
    "CX":{
        name: "Christmas Island"
    },
    "CR":{
        name: "Costa Rica"
    },
    "CW":{
        name: "Curacao"
    },
    "CV":{
        name: "Cape Verde"
    },
    "CU":{
        name: "Cuba"
    },
    "SZ":{
        name: "Swaziland"
    },
    "SY":{
        name: "Syria"
    },
    "SX":{
        name: "Sint Maarten"
    },
    "KG":{
        name: "Kyrgyzstan"
    },
    "KE":{
        name: "Kenya"
    },
    "SS":{
        name: "South Sudan"
    },
    "SR":{
        name: "Suriname"
    },
    "KI":{
        name: "Kiribati"
    },
    "KH":{
        name: "Cambodia"
    },
    "KN":{
        name: "Saint Kitts and Nevis"
    },
    "KM":{
        name: "Comoros"
    },
    "ST":{
        name: "Sao Tome and Principe"
    },
    "SK":{
        name: "Slovakia"
    },
    "KR":{
        name: "South Korea"
    },
    "SI":{
        name: "Slovenia"
    },
    "KP":{
        name: "North Korea"
    },
    "KW":{
        name: "Kuwait"
    },
    "SN":{
        name: "Senegal"
    },
    "SM":{
        name: "San Marino"
    },
    "SL":{
        name: "Sierra Leone"
    },
    "SC":{
        name: "Seychelles"
    },
    "KZ":{
        name: "Kazakhstan"
    },
    "KY":{
        name: "Cayman Islands"
    },
    "SG":{
        name: "Singapore"
    },
    "SE":{
        name: "Sweden"
    },
    "SD":{
        name: "Sudan"
    },
    "DO":{
        name: "Dominican Republic"
    },
    "DM":{
        name: "Dominica"
    },
    "DJ":{
        name: "Djibouti"
    },
    "DK":{
        name: "Denmark"
    },
    "VG":{
        name: "British Virgin Islands"
    },
    "DE":{
        name: "Germany"
    },
    "YE":{
        name: "Yemen"
    },
    "DZ":{
        name: "Algeria"
    },
    "US":{
        name: "United States",
		region: Region.State,
		areas: [
			"Alabama",
			"Alaska",
			"Arizona",
			"Arkansas",
			"California",
			"Colorado",
			"Connecticut",
			"Delaware",
			"Florida",
			"Georgia",
			"Hawaii",
			"Idaho",
			"Illinois",
			"Indiana",
			"Iowa",
			"Kansas",
			"Kentucky",
			"Louisiana",
			"Maine",
			"Maryland",
			"Massachusetts",
			"Michigan",
			"Minnesota",
			"Mississippi",
			"Missouri",
			"Montana",
			"Nebraska",
			"Nevada",
			"New Hampshire",
			"New Jersey",
			"New Mexico",
			"New York",
			"North Carolina",
			"North Dakota",
			"Ohio",
			"Oklahoma",
			"Oregon",
			"Pennsylvania",
			"Rhode Island",
			"South Carolina",
			"South Dakota",
			"Tennessee",
			"Texas",
			"Utah",
			"Vermont",
			"Virginia",
			"Washington",
			"West Virginia",
			"Wisconsin",
			"Wyoming",
		]
    },
    "UY":{
        name: "Uruguay"
    },
    "YT":{
        name: "Mayotte"
    },
    "UM":{
        name: "United States Minor Outlying Islands"
    },
    "LB":{
        name: "Lebanon"
    },
    "LC":{
        name: "Saint Lucia"
    },
    "LA":{
        name: "Laos"
    },
    "TV":{
        name: "Tuvalu"
    },
    "TW":{
        name: "Taiwan"
    },
    "TT":{
        name: "Trinidad and Tobago"
    },
    "TR":{
        name: "Turkey"
    },
    "LK":{
        name: "Sri Lanka"
    },
    "LI":{
        name: "Liechtenstein"
    },
    "LV":{
        name: "Latvia"
    },
    "TO":{
        name: "Tonga"
    },
    "LT":{
        name: "Lithuania"
    },
    "LU":{
        name: "Luxembourg"
    },
    "LR":{
        name: "Liberia"
    },
    "LS":{
        name: "Lesotho"
    },
    "TH":{
        name: "Thailand"
    },
    "TF":{
        name: "French Southern Territories"
    },
    "TG":{
        name: "Togo"
    },
    "TD":{
        name: "Chad"
    },
    "TC":{
        name: "Turks and Caicos Islands"
    },
    "LY":{
        name: "Libya"
    },
    "VA":{
        name: "Vatican"
    },
    "VC":{
        name: "Saint Vincent and the Grenadines"
    },
    "AE":{
        name: "United Arab Emirates"
    },
    "AD":{
        name: "Andorra"
    },
    "AG":{
        name: "Antigua and Barbuda"
    },
    "AF":{
        name: "Afghanistan"
    },
    "AI":{
        name: "Anguilla"
    },
    "VI":{
        name: "U.S. Virgin Islands"
    },
    "IS":{
        name: "Iceland"
    },
    "IR":{
        name: "Iran"
    },
    "AM":{
        name: "Armenia"
    },
    "AL":{
        name: "Albania"
    },
    "AO":{
        name: "Angola"
    },
    "AQ":{
        name: "Antarctica"
    },
    "AS":{
        name: "American Samoa"
    },
    "AR":{
        name: "Argentina"
    },
    "AU":{
        name: "Australia",
		region: Region.State,
		areas: [
			"New South Wales",
			"Queensland",
			"South Australia", 
			"Tasmania",
			"Victoria", 
			"Western Australia",
		]
    },
    "AT":{
        name: "Austria"
    },
    "AW":{
        name: "Aruba"
    },
    "IN":{
        name: "India",
		region: Region.State,
		areas: [
			"Andhra Pradesh",
			"Arunachal Pradesh",
			"Assam",
			"Bihar",
			"Chhattisgarh",
			"Goa",
			"Gujarat",
			"Haryana",
			"Himachal Pradesh",
			"Jharkhand",
			"Karnataka",
			"Kerala",
			"Madhya Pradesh",
			"Maharashtra",
			"Manipur",
			"Meghalaya",
			"Mizoram",
			"Nagaland",
			"Odisha",
			"Punjab",
			"Rajasthan",
			"Sikkim",
			"Tamil Nadu",
			"Telangana",
			"Tripura",
			"Uttar Pradesh",
			"Uttarakhand",
			"West Bengal",
		],
    },
    "AX":{
        name: "Aland Islands"
    },
    "AZ":{
        name: "Azerbaijan"
    },
    "IE":{
        name: "Ireland"
    },
    "ID":{
        name: "Indonesia",
		region: Region.State,
		areas: [
			"Aceh",
			"Bali",
			"Bangka Belitung Islands",
			"Banten",
			"Bengkulu",
			"Central Java",
			"Central Kalimantan",
			"Central Sulawesi",
			"East Java",
			"East Kalimantan",
			"East Nusa Tenggara",
			"Gorontalo",
			"Special Capital Region of Jakarta",
			"Jambi",
			"Lampung",
			"Maluku",
			"North Kalimantan",
			"North Maluku",
			"North Sulawesi",
			"North Sumatra",
			"Papua",
			"Riau",
			"Riau Islands",
			"Southeast Sulawesi",
			"South Kalimantan",
			"South Sulawesi",
			"South Sumatra",
			"West Java",
			"West Kalimantan",
			"West Nusa Tenggara",
			"West Papua",
			"West Sulawesi",
			"West Sumatra",
			"Special Region of Yogyakarta",
		],
    },
    "UA":{
        name: "Ukraine"
    },
    "QA":{
        name: "Qatar"
    },
    "MZ":{
        name: "Mozambique"
    }
};