(function() {
  window.app = angular.module('ngShipper', ['ngMaterial', 'ngRoute', 'angular-inview']).controller('AppCtrl', [function($scope) {}]);

}).call(this);

(function() {
  var countriesList;

  window.countries = [
    {
      "name": "Afghanistan",
      "countryCode": 93,
      "countryCodeUnique": 1,
      "ISO2": "AF",
      "ISO3": "AFG"
    }, {
      "name": "Albania",
      "countryCode": 355,
      "countryCodeUnique": 2,
      "ISO2": "AL",
      "ISO3": "ALB"
    }, {
      "name": "Algeria",
      "countryCode": 213,
      "countryCodeUnique": 3,
      "ISO2": "DZ",
      "ISO3": "DZA"
    }, {
      "name": "American Samoa",
      "countryCode": 1,
      "countryCodeUnique": 4,
      "ISO2": "AS",
      "ISO3": "ASM"
    }, {
      "name": "Andorra",
      "countryCode": 376,
      "countryCodeUnique": 5,
      "ISO2": "AD",
      "ISO3": "AND"
    }, {
      "name": "Angola",
      "countryCode": 244,
      "countryCodeUnique": 6,
      "ISO2": "AO",
      "ISO3": "AGO"
    }, {
      "name": "Anguilla",
      "countryCode": 1,
      "countryCodeUnique": 7,
      "ISO2": "AI",
      "ISO3": "AIA"
    }, {
      "name": "Antarctica",
      "countryCode": 672,
      "countryCodeUnique": 8,
      "ISO2": "AQ",
      "ISO3": "ATA"
    }, {
      "name": "Antigua and Barbuda",
      "countryCode": 1,
      "countryCodeUnique": 9,
      "ISO2": "AG",
      "ISO3": "ATG"
    }, {
      "name": "Argentina",
      "countryCode": 54,
      "countryCodeUnique": 10,
      "ISO2": "AR",
      "ISO3": "ARG"
    }, {
      "name": "Armenia",
      "countryCode": 374,
      "countryCodeUnique": 11,
      "ISO2": "AM",
      "ISO3": "ARM"
    }, {
      "name": "Aruba",
      "countryCode": 297,
      "countryCodeUnique": 12,
      "ISO2": "AW",
      "ISO3": "ABW"
    }, {
      "name": "Australia",
      "countryCode": 61,
      "countryCodeUnique": 13,
      "ISO2": "AU",
      "ISO3": "AUS"
    }, {
      "name": "Austria",
      "countryCode": 43,
      "countryCodeUnique": 14,
      "ISO2": "AT",
      "ISO3": "AUT"
    }, {
      "name": "Azerbaijan",
      "countryCode": 994,
      "countryCodeUnique": 15,
      "ISO2": "AZ",
      "ISO3": "AZE"
    }, {
      "name": "Bahamas",
      "countryCode": 1,
      "countryCodeUnique": 16,
      "ISO2": "BS",
      "ISO3": "BHS"
    }, {
      "name": "Bahrain",
      "countryCode": 973,
      "countryCodeUnique": 17,
      "ISO2": "BH",
      "ISO3": "BHR"
    }, {
      "name": "Bangladesh",
      "countryCode": 880,
      "countryCodeUnique": 18,
      "ISO2": "BD",
      "ISO3": "BGD"
    }, {
      "name": "Barbados",
      "countryCode": 1,
      "countryCodeUnique": 19,
      "ISO2": "BB",
      "ISO3": "BRB"
    }, {
      "name": "Belarus",
      "countryCode": 375,
      "countryCodeUnique": 20,
      "ISO2": "BY",
      "ISO3": "BLR"
    }, {
      "name": "Belgium",
      "countryCode": 32,
      "countryCodeUnique": 21,
      "ISO2": "BE",
      "ISO3": "BEL"
    }, {
      "name": "Belize",
      "countryCode": 501,
      "countryCodeUnique": 22,
      "ISO2": "BZ",
      "ISO3": "BLZ"
    }, {
      "name": "Benin",
      "countryCode": 229,
      "countryCodeUnique": 23,
      "ISO2": "BJ",
      "ISO3": "BEN"
    }, {
      "name": "Bermuda",
      "countryCode": 1,
      "countryCodeUnique": 24,
      "ISO2": "BM",
      "ISO3": "BMU"
    }, {
      "name": "Bhutan",
      "countryCode": 975,
      "countryCodeUnique": 25,
      "ISO2": "BT",
      "ISO3": "BTN"
    }, {
      "name": "Bolivia",
      "countryCode": 591,
      "countryCodeUnique": 26,
      "ISO2": "BO",
      "ISO3": "BOL"
    }, {
      "name": "Bosnia and Herzegovina",
      "countryCode": 387,
      "countryCodeUnique": 27,
      "ISO2": "BA",
      "ISO3": "BIH"
    }, {
      "name": "Botswana",
      "countryCode": 267,
      "countryCodeUnique": 28,
      "ISO2": "BW",
      "ISO3": "BWA"
    }, {
      "name": "Brazil",
      "countryCode": 55,
      "countryCodeUnique": 29,
      "ISO2": "BR",
      "ISO3": "BRA"
    }, {
      "name": "British Virgin Islands",
      "countryCode": 1,
      "countryCodeUnique": 31,
      "ISO2": "VG",
      "ISO3": "VGB"
    }, {
      "name": "Brunei",
      "countryCode": 673,
      "countryCodeUnique": 32,
      "ISO2": "BN",
      "ISO3": "BRN"
    }, {
      "name": "Bulgaria",
      "countryCode": 359,
      "countryCodeUnique": 33,
      "ISO2": "BG",
      "ISO3": "BGR"
    }, {
      "name": "Burkina Faso",
      "countryCode": 226,
      "countryCodeUnique": 34,
      "ISO2": "BF",
      "ISO3": "BFA"
    }, {
      "name": "Burma (Myanmar)",
      "countryCode": 95,
      "countryCodeUnique": 35,
      "ISO2": "MM",
      "ISO3": "MMR"
    }, {
      "name": "Burundi",
      "countryCode": 257,
      "countryCodeUnique": 36,
      "ISO2": "BI",
      "ISO3": "BDI"
    }, {
      "name": "Cambodia",
      "countryCode": 855,
      "countryCodeUnique": 37,
      "ISO2": "KH",
      "ISO3": "KHM"
    }, {
      "name": "Cameroon",
      "countryCode": 237,
      "countryCodeUnique": 38,
      "ISO2": "CM",
      "ISO3": "CMR"
    }, {
      "name": "Canada",
      "countryCode": 1,
      "countryCodeUnique": 39,
      "ISO2": "CA",
      "ISO3": "CAN"
    }, {
      "name": "Cape Verde",
      "countryCode": 238,
      "countryCodeUnique": 40,
      "ISO2": "CV",
      "ISO3": "CPV"
    }, {
      "name": "Cayman Islands",
      "countryCode": 1,
      "countryCodeUnique": 41,
      "ISO2": "KY",
      "ISO3": "CYM"
    }, {
      "name": "Central African Republic",
      "countryCode": 236,
      "countryCodeUnique": 42,
      "ISO2": "CF",
      "ISO3": "CAF"
    }, {
      "name": "Chad",
      "countryCode": 235,
      "countryCodeUnique": 43,
      "ISO2": "TD",
      "ISO3": "TCD"
    }, {
      "name": "Chile",
      "countryCode": 56,
      "countryCodeUnique": 44,
      "ISO2": "CL",
      "ISO3": "CHL"
    }, {
      "name": "China",
      "countryCode": 86,
      "countryCodeUnique": 45,
      "ISO2": "CN",
      "ISO3": "CHN"
    }, {
      "name": "Christmas Island",
      "countryCode": 61,
      "countryCodeUnique": 46,
      "ISO2": "CX",
      "ISO3": "CXR"
    }, {
      "name": "Cocos (Keeling) Islands",
      "countryCode": 61,
      "countryCodeUnique": 47,
      "ISO2": "CC",
      "ISO3": "CCK"
    }, {
      "name": "Colombia",
      "countryCode": 57,
      "countryCodeUnique": 48,
      "ISO2": "CO",
      "ISO3": "COL"
    }, {
      "name": "Comoros",
      "countryCode": 269,
      "countryCodeUnique": 49,
      "ISO2": "KM",
      "ISO3": "COM"
    }, {
      "name": "Cook Islands",
      "countryCode": 682,
      "countryCodeUnique": 50,
      "ISO2": "CK",
      "ISO3": "COK"
    }, {
      "name": "Costa Rica",
      "countryCode": 506,
      "countryCodeUnique": 51,
      "ISO2": "CR",
      "ISO3": "CRC"
    }, {
      "name": "Croatia",
      "countryCode": 385,
      "countryCodeUnique": 52,
      "ISO2": "HR",
      "ISO3": "HRV"
    }, {
      "name": "Cuba",
      "countryCode": 53,
      "countryCodeUnique": 53,
      "ISO2": "CU",
      "ISO3": "CUB"
    }, {
      "name": "Cyprus",
      "countryCode": 357,
      "countryCodeUnique": 54,
      "ISO2": "CY",
      "ISO3": "CYP"
    }, {
      "name": "Czech Republic",
      "countryCode": 420,
      "countryCodeUnique": 55,
      "ISO2": "CZ",
      "ISO3": "CZE"
    }, {
      "name": "Democratic Republic of the Congo",
      "countryCode": 243,
      "countryCodeUnique": 56,
      "ISO2": "CD",
      "ISO3": "COD"
    }, {
      "name": "Denmark",
      "countryCode": 45,
      "countryCodeUnique": 57,
      "ISO2": "DK",
      "ISO3": "DNK"
    }, {
      "name": "Djibouti",
      "countryCode": 253,
      "countryCodeUnique": 58,
      "ISO2": "DJ",
      "ISO3": "DJI"
    }, {
      "name": "Dominica",
      "countryCode": 1,
      "countryCodeUnique": 59,
      "ISO2": "DM",
      "ISO3": "DMA"
    }, {
      "name": "Dominican Republic",
      "countryCode": 1,
      "countryCodeUnique": 60,
      "ISO2": "DO",
      "ISO3": "DOM"
    }, {
      "name": "Ecuador",
      "countryCode": 593,
      "countryCodeUnique": 61,
      "ISO2": "EC",
      "ISO3": "ECU"
    }, {
      "name": "Egypt",
      "countryCode": 20,
      "countryCodeUnique": 62,
      "ISO2": "EG",
      "ISO3": "EGY"
    }, {
      "name": "El Salvador",
      "countryCode": 503,
      "countryCodeUnique": 63,
      "ISO2": "SV",
      "ISO3": "SLV"
    }, {
      "name": "Equatorial Guinea",
      "countryCode": 240,
      "countryCodeUnique": 64,
      "ISO2": "GQ",
      "ISO3": "GNQ"
    }, {
      "name": "Eritrea",
      "countryCode": 291,
      "countryCodeUnique": 65,
      "ISO2": "ER",
      "ISO3": "ERI"
    }, {
      "name": "Estonia",
      "countryCode": 372,
      "countryCodeUnique": 66,
      "ISO2": "EE",
      "ISO3": "EST"
    }, {
      "name": "Ethiopia",
      "countryCode": 251,
      "countryCodeUnique": 67,
      "ISO2": "ET",
      "ISO3": "ETH"
    }, {
      "name": "Falkland Islands",
      "countryCode": 500,
      "countryCodeUnique": 68,
      "ISO2": "FK",
      "ISO3": "FLK"
    }, {
      "name": "Faroe Islands",
      "countryCode": 298,
      "countryCodeUnique": 69,
      "ISO2": "FO",
      "ISO3": "FRO"
    }, {
      "name": "Fiji",
      "countryCode": 679,
      "countryCodeUnique": 70,
      "ISO2": "FJ",
      "ISO3": "FJI"
    }, {
      "name": "Finland",
      "countryCode": 358,
      "countryCodeUnique": 71,
      "ISO2": "FI",
      "ISO3": "FIN"
    }, {
      "name": "France",
      "countryCode": 33,
      "countryCodeUnique": 72,
      "ISO2": "FR",
      "ISO3": "FRA"
    }, {
      "name": "French Polynesia",
      "countryCode": 689,
      "countryCodeUnique": 73,
      "ISO2": "PF",
      "ISO3": "PYF"
    }, {
      "name": "Gabon",
      "countryCode": 241,
      "countryCodeUnique": 74,
      "ISO2": "GA",
      "ISO3": "GAB"
    }, {
      "name": "Gambia",
      "countryCode": 220,
      "countryCodeUnique": 75,
      "ISO2": "GM",
      "ISO3": "GMB"
    }, {
      "name": "Gaza Strip",
      "countryCode": 970,
      "countryCodeUnique": 76,
      "ISO2": "",
      "ISO3": ""
    }, {
      "name": "Georgia",
      "countryCode": 995,
      "countryCodeUnique": 77,
      "ISO2": "GE",
      "ISO3": "GEO"
    }, {
      "name": "Germany",
      "countryCode": 49,
      "countryCodeUnique": 78,
      "ISO2": "DE",
      "ISO3": "DEU"
    }, {
      "name": "Ghana",
      "countryCode": 233,
      "countryCodeUnique": 79,
      "ISO2": "GH",
      "ISO3": "GHA"
    }, {
      "name": "Gibraltar",
      "countryCode": 350,
      "countryCodeUnique": 80,
      "ISO2": "GI",
      "ISO3": "GIB"
    }, {
      "name": "Greece",
      "countryCode": 30,
      "countryCodeUnique": 81,
      "ISO2": "GR",
      "ISO3": "GRC"
    }, {
      "name": "Greenland",
      "countryCode": 299,
      "countryCodeUnique": 82,
      "ISO2": "GL",
      "ISO3": "GRL"
    }, {
      "name": "Grenada",
      "countryCode": 1,
      "countryCodeUnique": 83,
      "ISO2": "GD",
      "ISO3": "GRD"
    }, {
      "name": "Guam",
      "countryCode": 1,
      "countryCodeUnique": 84,
      "ISO2": "GU",
      "ISO3": "GUM"
    }, {
      "name": "Guatemala",
      "countryCode": 502,
      "countryCodeUnique": 85,
      "ISO2": "GT",
      "ISO3": "GTM"
    }, {
      "name": "Guinea",
      "countryCode": 224,
      "countryCodeUnique": 86,
      "ISO2": "GN",
      "ISO3": "GIN"
    }, {
      "name": "Guinea-Bissau",
      "countryCode": 245,
      "countryCodeUnique": 87,
      "ISO2": "GW",
      "ISO3": "GNB"
    }, {
      "name": "Guyana",
      "countryCode": 592,
      "countryCodeUnique": 88,
      "ISO2": "GY",
      "ISO3": "GUY"
    }, {
      "name": "Haiti",
      "countryCode": 509,
      "countryCodeUnique": 89,
      "ISO2": "HT",
      "ISO3": "HTI"
    }, {
      "name": "Holy See (Vatican City)",
      "countryCode": 39,
      "countryCodeUnique": 90,
      "ISO2": "VA",
      "ISO3": "VAT"
    }, {
      "name": "Honduras",
      "countryCode": 504,
      "countryCodeUnique": 91,
      "ISO2": "HN",
      "ISO3": "HND"
    }, {
      "name": "Hong Kong",
      "countryCode": 852,
      "countryCodeUnique": 92,
      "ISO2": "HK",
      "ISO3": "HKG"
    }, {
      "name": "Hungary",
      "countryCode": 36,
      "countryCodeUnique": 93,
      "ISO2": "HU",
      "ISO3": "HUN"
    }, {
      "name": "Iceland",
      "countryCode": 354,
      "countryCodeUnique": 94,
      "ISO2": "IS",
      "ISO3": "IS"
    }, {
      "name": "India",
      "countryCode": 91,
      "countryCodeUnique": 95,
      "ISO2": "IN",
      "ISO3": "IND"
    }, {
      "name": "Indonesia",
      "countryCode": 62,
      "countryCodeUnique": 96,
      "ISO2": "ID",
      "ISO3": "IDN"
    }, {
      "name": "Iran",
      "countryCode": 98,
      "countryCodeUnique": 97,
      "ISO2": "IR",
      "ISO3": "IRN"
    }, {
      "name": "Iraq",
      "countryCode": 964,
      "countryCodeUnique": 98,
      "ISO2": "IQ",
      "ISO3": "IRQ"
    }, {
      "name": "Ireland",
      "countryCode": 353,
      "countryCodeUnique": 99,
      "ISO2": "IE",
      "ISO3": "IRL"
    }, {
      "name": "Isle of Man",
      "countryCode": 44,
      "countryCodeUnique": 100,
      "ISO2": "IM",
      "ISO3": "IMN"
    }, {
      "name": "Israel",
      "countryCode": 972,
      "countryCodeUnique": 101,
      "ISO2": "IL",
      "ISO3": "ISR"
    }, {
      "name": "Italy",
      "countryCode": 39,
      "countryCodeUnique": 102,
      "ISO2": "IT",
      "ISO3": "ITA"
    }, {
      "name": "Ivory Coast",
      "countryCode": 225,
      "countryCodeUnique": 103,
      "ISO2": "CI",
      "ISO3": "CIV"
    }, {
      "name": "Jamaica",
      "countryCode": 1,
      "countryCodeUnique": 104,
      "ISO2": "JM",
      "ISO3": "JAM"
    }, {
      "name": "Japan",
      "countryCode": 81,
      "countryCodeUnique": 105,
      "ISO2": "JP",
      "ISO3": "JPN"
    }, {
      "name": "Jordan",
      "countryCode": 962,
      "countryCodeUnique": 107,
      "ISO2": "JO",
      "ISO3": "JOR"
    }, {
      "name": "Kazakhstan",
      "countryCode": 7,
      "countryCodeUnique": 108,
      "ISO2": "KZ",
      "ISO3": "KAZ"
    }, {
      "name": "Kenya",
      "countryCode": 254,
      "countryCodeUnique": 109,
      "ISO2": "KE",
      "ISO3": "KEN"
    }, {
      "name": "Kiribati",
      "countryCode": 686,
      "countryCodeUnique": 110,
      "ISO2": "KI",
      "ISO3": "KIR"
    }, {
      "name": "Kosovo",
      "countryCode": 381,
      "countryCodeUnique": 111,
      "ISO2": "",
      "ISO3": ""
    }, {
      "name": "Kuwait",
      "countryCode": 965,
      "countryCodeUnique": 112,
      "ISO2": "KW",
      "ISO3": "KWT"
    }, {
      "name": "Kyrgyzstan",
      "countryCode": 996,
      "countryCodeUnique": 113,
      "ISO2": "KG",
      "ISO3": "KGZ"
    }, {
      "name": "Laos",
      "countryCode": 856,
      "countryCodeUnique": 114,
      "ISO2": "LA",
      "ISO3": "LAO"
    }, {
      "name": "Latvia",
      "countryCode": 371,
      "countryCodeUnique": 115,
      "ISO2": "LV",
      "ISO3": "LVA"
    }, {
      "name": "Lebanon",
      "countryCode": 961,
      "countryCodeUnique": 116,
      "ISO2": "LB",
      "ISO3": "LBN"
    }, {
      "name": "Lesotho",
      "countryCode": 266,
      "countryCodeUnique": 117,
      "ISO2": "LS",
      "ISO3": "LSO"
    }, {
      "name": "Liberia",
      "countryCode": 231,
      "countryCodeUnique": 118,
      "ISO2": "LR",
      "ISO3": "LBR"
    }, {
      "name": "Libya",
      "countryCode": 218,
      "countryCodeUnique": 119,
      "ISO2": "LY",
      "ISO3": "LBY"
    }, {
      "name": "Liechtenstein",
      "countryCode": 423,
      "countryCodeUnique": 120,
      "ISO2": "LI",
      "ISO3": "LIE"
    }, {
      "name": "Lithuania",
      "countryCode": 370,
      "countryCodeUnique": 121,
      "ISO2": "LT",
      "ISO3": "LTU"
    }, {
      "name": "Luxembourg",
      "countryCode": 352,
      "countryCodeUnique": 122,
      "ISO2": "LU",
      "ISO3": "LUX"
    }, {
      "name": "Macau",
      "countryCode": 853,
      "countryCodeUnique": 123,
      "ISO2": "MO",
      "ISO3": "MAC"
    }, {
      "name": "Macedonia",
      "countryCode": 389,
      "countryCodeUnique": 124,
      "ISO2": "MK",
      "ISO3": "MKD"
    }, {
      "name": "Madagascar",
      "countryCode": 261,
      "countryCodeUnique": 125,
      "ISO2": "MG",
      "ISO3": "MDG"
    }, {
      "name": "Malawi",
      "countryCode": 265,
      "countryCodeUnique": 126,
      "ISO2": "MW",
      "ISO3": "MWI"
    }, {
      "name": "Malaysia",
      "countryCode": 60,
      "countryCodeUnique": 127,
      "ISO2": "MY",
      "ISO3": "MYS"
    }, {
      "name": "Maldives",
      "countryCode": 960,
      "countryCodeUnique": 128,
      "ISO2": "MV",
      "ISO3": "MDV"
    }, {
      "name": "Mali",
      "countryCode": 223,
      "countryCodeUnique": 129,
      "ISO2": "ML",
      "ISO3": "MLI"
    }, {
      "name": "Malta",
      "countryCode": 356,
      "countryCodeUnique": 130,
      "ISO2": "MT",
      "ISO3": "MLT"
    }, {
      "name": "Marshall Islands",
      "countryCode": 692,
      "countryCodeUnique": 131,
      "ISO2": "MH",
      "ISO3": "MHL"
    }, {
      "name": "Mauritania",
      "countryCode": 222,
      "countryCodeUnique": 132,
      "ISO2": "MR",
      "ISO3": "MRT"
    }, {
      "name": "Mauritius",
      "countryCode": 230,
      "countryCodeUnique": 133,
      "ISO2": "MU",
      "ISO3": "MUS"
    }, {
      "name": "Mayotte",
      "countryCode": 262,
      "countryCodeUnique": 134,
      "ISO2": "YT",
      "ISO3": "MYT"
    }, {
      "name": "Mexico",
      "countryCode": 52,
      "countryCodeUnique": 135,
      "ISO2": "MX",
      "ISO3": "MEX"
    }, {
      "name": "Micronesia",
      "countryCode": 691,
      "countryCodeUnique": 136,
      "ISO2": "FM",
      "ISO3": "FSM"
    }, {
      "name": "Moldova",
      "countryCode": 373,
      "countryCodeUnique": 137,
      "ISO2": "MD",
      "ISO3": "MDA"
    }, {
      "name": "Monaco",
      "countryCode": 377,
      "countryCodeUnique": 138,
      "ISO2": "MC",
      "ISO3": "MCO"
    }, {
      "name": "Mongolia",
      "countryCode": 976,
      "countryCodeUnique": 139,
      "ISO2": "MN",
      "ISO3": "MNG"
    }, {
      "name": "Montenegro",
      "countryCode": 382,
      "countryCodeUnique": 140,
      "ISO2": "ME",
      "ISO3": "MNE"
    }, {
      "name": "Montserrat",
      "countryCode": 1,
      "countryCodeUnique": 141,
      "ISO2": "MS",
      "ISO3": "MSR"
    }, {
      "name": "Morocco",
      "countryCode": 212,
      "countryCodeUnique": 142,
      "ISO2": "MA",
      "ISO3": "MAR"
    }, {
      "name": "Mozambique",
      "countryCode": 258,
      "countryCodeUnique": 143,
      "ISO2": "MZ",
      "ISO3": "MOZ"
    }, {
      "name": "Namibia",
      "countryCode": 264,
      "countryCodeUnique": 144,
      "ISO2": "NA",
      "ISO3": "NAM"
    }, {
      "name": "Nauru",
      "countryCode": 674,
      "countryCodeUnique": 145,
      "ISO2": "NR",
      "ISO3": "NRU"
    }, {
      "name": "Nepal",
      "countryCode": 977,
      "countryCodeUnique": 146,
      "ISO2": "NP",
      "ISO3": "NPL"
    }, {
      "name": "Netherlands",
      "countryCode": 31,
      "countryCodeUnique": 147,
      "ISO2": "NL",
      "ISO3": "NLD"
    }, {
      "name": "Netherlands Antilles",
      "countryCode": 599,
      "countryCodeUnique": 148,
      "ISO2": "AN",
      "ISO3": "ANT"
    }, {
      "name": "New Caledonia",
      "countryCode": 687,
      "countryCodeUnique": 149,
      "ISO2": "NC",
      "ISO3": "NCL"
    }, {
      "name": "New Zealand",
      "countryCode": 64,
      "countryCodeUnique": 150,
      "ISO2": "NZ",
      "ISO3": "NZL"
    }, {
      "name": "Nicaragua",
      "countryCode": 505,
      "countryCodeUnique": 151,
      "ISO2": "NI",
      "ISO3": "NIC"
    }, {
      "name": "Niger",
      "countryCode": 227,
      "countryCodeUnique": 152,
      "ISO2": "NE",
      "ISO3": "NER"
    }, {
      "name": "Nigeria",
      "countryCode": 234,
      "countryCodeUnique": 153,
      "ISO2": "NG",
      "ISO3": "NGA"
    }, {
      "name": "Niue",
      "countryCode": 683,
      "countryCodeUnique": 154,
      "ISO2": "NU",
      "ISO3": "NIU"
    }, {
      "name": "Norfolk Island",
      "countryCode": 672,
      "countryCodeUnique": 155,
      "ISO2": "",
      "ISO3": "NFK"
    }, {
      "name": "North Korea",
      "countryCode": 850,
      "countryCodeUnique": 156,
      "ISO2": "KP",
      "ISO3": "PRK"
    }, {
      "name": "Northern Mariana Islands",
      "countryCode": 1,
      "countryCodeUnique": 157,
      "ISO2": "MP",
      "ISO3": "MNP"
    }, {
      "name": "Norway",
      "countryCode": 47,
      "countryCodeUnique": 158,
      "ISO2": "NO",
      "ISO3": "NOR"
    }, {
      "name": "Oman",
      "countryCode": 968,
      "countryCodeUnique": 159,
      "ISO2": "OM",
      "ISO3": "OMN"
    }, {
      "name": "Pakistan",
      "countryCode": 92,
      "countryCodeUnique": 160,
      "ISO2": "PK",
      "ISO3": "PAK"
    }, {
      "name": "Palau",
      "countryCode": 680,
      "countryCodeUnique": 161,
      "ISO2": "PW",
      "ISO3": "PLW"
    }, {
      "name": "Panama",
      "countryCode": 507,
      "countryCodeUnique": 162,
      "ISO2": "PA",
      "ISO3": "PAN"
    }, {
      "name": "Papua New Guinea",
      "countryCode": 675,
      "countryCodeUnique": 163,
      "ISO2": "PG",
      "ISO3": "PNG"
    }, {
      "name": "Paraguay",
      "countryCode": 595,
      "countryCodeUnique": 164,
      "ISO2": "PY",
      "ISO3": "PRY"
    }, {
      "name": "Peru",
      "countryCode": 51,
      "countryCodeUnique": 165,
      "ISO2": "PE",
      "ISO3": "PER"
    }, {
      "name": "Philippines",
      "countryCode": 63,
      "countryCodeUnique": 166,
      "ISO2": "PH",
      "ISO3": "PHL"
    }, {
      "name": "Pitcairn Islands",
      "countryCode": 870,
      "countryCodeUnique": 167,
      "ISO2": "PN",
      "ISO3": "PCN"
    }, {
      "name": "Poland",
      "countryCode": 48,
      "countryCodeUnique": 168,
      "ISO2": "PL",
      "ISO3": "POL"
    }, {
      "name": "Portugal",
      "countryCode": 351,
      "countryCodeUnique": 169,
      "ISO2": "PT",
      "ISO3": "PRT"
    }, {
      "name": "Puerto Rico",
      "countryCode": 1,
      "countryCodeUnique": 170,
      "ISO2": "PR",
      "ISO3": "PRI"
    }, {
      "name": "Qatar",
      "countryCode": 974,
      "countryCodeUnique": 171,
      "ISO2": "QA",
      "ISO3": "QAT"
    }, {
      "name": "Republic of the Congo",
      "countryCode": 242,
      "countryCodeUnique": 172,
      "ISO2": "CG",
      "ISO3": "COG"
    }, {
      "name": "Romania",
      "countryCode": 40,
      "countryCodeUnique": 173,
      "ISO2": "RO",
      "ISO3": "ROU"
    }, {
      "name": "Russia",
      "countryCode": 7,
      "countryCodeUnique": 174,
      "ISO2": "RU",
      "ISO3": "RUS"
    }, {
      "name": "Rwanda",
      "countryCode": 250,
      "countryCodeUnique": 175,
      "ISO2": "RW",
      "ISO3": "RWA"
    }, {
      "name": "Saint Barthelemy",
      "countryCode": 590,
      "countryCodeUnique": 176,
      "ISO2": "BL",
      "ISO3": "BLM"
    }, {
      "name": "Saint Helena",
      "countryCode": 290,
      "countryCodeUnique": 177,
      "ISO2": "SH",
      "ISO3": "SHN"
    }, {
      "name": "Saint Kitts and Nevis",
      "countryCode": 1,
      "countryCodeUnique": 178,
      "ISO2": "KN",
      "ISO3": "KNA"
    }, {
      "name": "Saint Lucia",
      "countryCode": 1,
      "countryCodeUnique": 179,
      "ISO2": "LC",
      "ISO3": "LCA"
    }, {
      "name": "Saint Martin",
      "countryCode": 1,
      "countryCodeUnique": 180,
      "ISO2": "MF",
      "ISO3": "MAF"
    }, {
      "name": "Saint Pierre and Miquelon",
      "countryCode": 508,
      "countryCodeUnique": 181,
      "ISO2": "PM",
      "ISO3": "SPM"
    }, {
      "name": "Saint Vincent and the Grenadines",
      "countryCode": 1,
      "countryCodeUnique": 182,
      "ISO2": "VC",
      "ISO3": "VCT"
    }, {
      "name": "Samoa",
      "countryCode": 685,
      "countryCodeUnique": 183,
      "ISO2": "WS",
      "ISO3": "WSM"
    }, {
      "name": "San Marino",
      "countryCode": 378,
      "countryCodeUnique": 184,
      "ISO2": "SM",
      "ISO3": "SMR"
    }, {
      "name": "Sao Tome and Principe",
      "countryCode": 239,
      "countryCodeUnique": 185,
      "ISO2": "ST",
      "ISO3": "STP"
    }, {
      "name": "Saudi Arabia",
      "countryCode": 966,
      "countryCodeUnique": 186,
      "ISO2": "SA",
      "ISO3": "SAU"
    }, {
      "name": "Senegal",
      "countryCode": 221,
      "countryCodeUnique": 187,
      "ISO2": "SN",
      "ISO3": "SEN"
    }, {
      "name": "Serbia",
      "countryCode": 381,
      "countryCodeUnique": 188,
      "ISO2": "RS",
      "ISO3": "SRB"
    }, {
      "name": "Seychelles",
      "countryCode": 248,
      "countryCodeUnique": 189,
      "ISO2": "SC",
      "ISO3": "SYC"
    }, {
      "name": "Sierra Leone",
      "countryCode": 232,
      "countryCodeUnique": 190,
      "ISO2": "SL",
      "ISO3": "SLE"
    }, {
      "name": "Singapore",
      "countryCode": 65,
      "countryCodeUnique": 191,
      "ISO2": "SG",
      "ISO3": "SGP"
    }, {
      "name": "Slovakia",
      "countryCode": 421,
      "countryCodeUnique": 192,
      "ISO2": "SK",
      "ISO3": "SVK"
    }, {
      "name": "Slovenia",
      "countryCode": 386,
      "countryCodeUnique": 193,
      "ISO2": "SI",
      "ISO3": "SVN"
    }, {
      "name": "Solomon Islands",
      "countryCode": 677,
      "countryCodeUnique": 194,
      "ISO2": "SB",
      "ISO3": "SLB"
    }, {
      "name": "Somalia",
      "countryCode": 252,
      "countryCodeUnique": 195,
      "ISO2": "SO",
      "ISO3": "SOM"
    }, {
      "name": "South Africa",
      "countryCode": 27,
      "countryCodeUnique": 196,
      "ISO2": "ZA",
      "ISO3": "ZAF"
    }, {
      "name": "South Korea",
      "countryCode": 82,
      "countryCodeUnique": 197,
      "ISO2": "KR",
      "ISO3": "KOR"
    }, {
      "name": "Spain",
      "countryCode": 34,
      "countryCodeUnique": 198,
      "ISO2": "ES",
      "ISO3": "ESP"
    }, {
      "name": "Sri Lanka",
      "countryCode": 94,
      "countryCodeUnique": 199,
      "ISO2": "LK",
      "ISO3": "LKA"
    }, {
      "name": "Sudan",
      "countryCode": 249,
      "countryCodeUnique": 200,
      "ISO2": "SD",
      "ISO3": "SDN"
    }, {
      "name": "Suriname",
      "countryCode": 597,
      "countryCodeUnique": 201,
      "ISO2": "SR",
      "ISO3": "SUR"
    }, {
      "name": "Swaziland",
      "countryCode": 268,
      "countryCodeUnique": 203,
      "ISO2": "SZ",
      "ISO3": "SWZ"
    }, {
      "name": "Sweden",
      "countryCode": 46,
      "countryCodeUnique": 204,
      "ISO2": "SE",
      "ISO3": "SWE"
    }, {
      "name": "Switzerland",
      "countryCode": 41,
      "countryCodeUnique": 205,
      "ISO2": "CH",
      "ISO3": "CHE"
    }, {
      "name": "Syria",
      "countryCode": 963,
      "countryCodeUnique": 206,
      "ISO2": "SY",
      "ISO3": "SYR"
    }, {
      "name": "Taiwan",
      "countryCode": 886,
      "countryCodeUnique": 207,
      "ISO2": "TW",
      "ISO3": "TWN"
    }, {
      "name": "Tajikistan",
      "countryCode": 992,
      "countryCodeUnique": 208,
      "ISO2": "TJ",
      "ISO3": "TJK"
    }, {
      "name": "Tanzania",
      "countryCode": 255,
      "countryCodeUnique": 209,
      "ISO2": "TZ",
      "ISO3": "TZA"
    }, {
      "name": "Thailand",
      "countryCode": 66,
      "countryCodeUnique": 210,
      "ISO2": "TH",
      "ISO3": "THA"
    }, {
      "name": "Timor-Leste",
      "countryCode": 670,
      "countryCodeUnique": 211,
      "ISO2": "TL",
      "ISO3": "TLS"
    }, {
      "name": "Togo",
      "countryCode": 228,
      "countryCodeUnique": 212,
      "ISO2": "TG",
      "ISO3": "TGO"
    }, {
      "name": "Tokelau",
      "countryCode": 690,
      "countryCodeUnique": 213,
      "ISO2": "TK",
      "ISO3": "TKL"
    }, {
      "name": "Tonga",
      "countryCode": 676,
      "countryCodeUnique": 214,
      "ISO2": "TO",
      "ISO3": "TON"
    }, {
      "name": "Trinidad and Tobago",
      "countryCode": 1,
      "countryCodeUnique": 215,
      "ISO2": "TT",
      "ISO3": "TTO"
    }, {
      "name": "Tunisia",
      "countryCode": 216,
      "countryCodeUnique": 216,
      "ISO2": "TN",
      "ISO3": "TUN"
    }, {
      "name": "Turkey",
      "countryCode": 90,
      "countryCodeUnique": 217,
      "ISO2": "TR",
      "ISO3": "TUR"
    }, {
      "name": "Turkmenistan",
      "countryCode": 993,
      "countryCodeUnique": 218,
      "ISO2": "TM",
      "ISO3": "TKM"
    }, {
      "name": "Turks and Caicos Islands",
      "countryCode": 1,
      "countryCodeUnique": 219,
      "ISO2": "TC",
      "ISO3": "TCA"
    }, {
      "name": "Tuvalu",
      "countryCode": 688,
      "countryCodeUnique": 220,
      "ISO2": "TV",
      "ISO3": "TUV"
    }, {
      "name": "Uganda",
      "countryCode": 256,
      "countryCodeUnique": 221,
      "ISO2": "UG",
      "ISO3": "UGA"
    }, {
      "name": "Ukraine",
      "countryCode": 380,
      "countryCodeUnique": 222,
      "ISO2": "UA",
      "ISO3": "UKR"
    }, {
      "name": "United Arab Emirates",
      "countryCode": 971,
      "countryCodeUnique": 223,
      "ISO2": "AE",
      "ISO3": "ARE"
    }, {
      "name": "United Kingdom",
      "countryCode": 44,
      "countryCodeUnique": 224,
      "ISO2": "GB",
      "ISO3": "GBR"
    }, {
      "name": "United States",
      "countryCode": 1,
      "countryCodeUnique": 225,
      "ISO2": "US",
      "ISO3": "USA"
    }, {
      "name": "Uruguay",
      "countryCode": 598,
      "countryCodeUnique": 226,
      "ISO2": "UY",
      "ISO3": "URY"
    }, {
      "name": "US Virgin Islands",
      "countryCode": 1,
      "countryCodeUnique": 227,
      "ISO2": "VI",
      "ISO3": "VIR"
    }, {
      "name": "Uzbekistan",
      "countryCode": 998,
      "countryCodeUnique": 228,
      "ISO2": "UZ",
      "ISO3": "UZB"
    }, {
      "name": "Vanuatu",
      "countryCode": 678,
      "countryCodeUnique": 229,
      "ISO2": "VU",
      "ISO3": "VUT"
    }, {
      "name": "Venezuela",
      "countryCode": 58,
      "countryCodeUnique": 230,
      "ISO2": "VE",
      "ISO3": "VEN"
    }, {
      "name": "Vietnam",
      "countryCode": 84,
      "countryCodeUnique": 231,
      "ISO2": "VN",
      "ISO3": "VNM"
    }, {
      "name": "Wallis and Futuna",
      "countryCode": 681,
      "countryCodeUnique": 232,
      "ISO2": "WF",
      "ISO3": "WLF"
    }, {
      "name": "West Bank",
      "countryCode": 970,
      "countryCodeUnique": 233,
      "ISO2": "",
      "ISO3": ""
    }, {
      "name": "Yemen",
      "countryCode": 967,
      "countryCodeUnique": 235,
      "ISO2": "YE",
      "ISO3": "YEM"
    }, {
      "name": "Zambia",
      "countryCode": 260,
      "countryCodeUnique": 236,
      "ISO2": "ZM",
      "ISO3": "ZMB"
    }, {
      "name": "Zimbabwe",
      "countryCode": 263,
      "countryCodeUnique": 237,
      "ISO2": "ZW",
      "ISO3": "ZWE"
    }
  ];

  countriesList = null;

  window.getCountryList = function() {
    var country, _i, _len, _ref;
    if (countriesList) {
      return countriesList;
    }
    countriesList = [];
    _ref = window.countries;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      country = _ref[_i];
      countriesList.push({
        header: country.name,
        subheader: country.ISO3,
        id: country.countryCode
      });
    }
    return countriesList;
  };

}).call(this);

(function() {


}).call(this);

(function() {
  window.app.directive('mdFloat', [
    function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          var hadValue;
          hadValue = false;
          return scope.$watch(function() {
            return ngModel.$modelValue;
          }, function(value) {
            if (!value && typeof value !== 'number') {
              if (hadValue) {
                element.addClass('md-warn');
              }
              return;
            }
            if (typeof value === 'number') {
              value = value.toString();
            }
            if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value.trim())) {
              return element.removeClass('md-warn');
            } else {
              return element.addClass('md-warn');
            }
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  window.app.directive('mdInt', [
    function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          var hadValue;
          hadValue = false;
          return scope.$watch(function() {
            return ngModel.$modelValue;
          }, function(value) {
            if (!value && typeof value !== 'number') {
              if (hadValue) {
                element.addClass('md-warn');
              }
              return;
            }
            if (typeof value === 'number') {
              value = value.toString();
            }
            hadValue = true;
            if (/^[-+]?\d+$/.test(value.trim())) {
              return element.removeClass('md-warn');
            } else {
              return element.addClass('md-warn');
            }
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  window.app.directive('mdRequired', [
    function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          var hadValue;
          hadValue = false;
          return scope.$watch(function() {
            return ngModel.$modelValue;
          }, function(value) {
            if (!value && typeof value !== 'number') {
              if (hadValue) {
                element.addClass('md-warn');
              }
              return;
            }
            hadValue = true;
            return element.removeClass('md-warn');
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/home', {
        controller: 'HomeCtrl',
        templateUrl: 'app/home/home.html'
      });
    }
  ]).controller('HomeCtrl', ['$scope', function($scope) {}]);

}).call(this);

(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/item', {
        controller: 'ItemCtrl',
        templateUrl: 'app/item/item.html'
      }).when('/item/:itemId', {
        controller: 'ItemCtrl',
        templateUrl: 'app/item/item.html'
      });
    }
  ]).controller('ItemCtrl', [
    '$scope', 'showSelect', function($scope, showSelect) {
      var decimal;
      decimal = 10000;
      $scope.number = function(val) {
        if (!val) {
          return 'md-warn';
        }
        val = parseFloat(val);
        if (isNaN(val)) {
          return 'md-warn';
        }
      };
      $scope.loading = false;
      $scope.general = {
        facilities: [
          {
            id: null,
            header: 'Disassociate',
            subheader: 'Disassociate with a facility'
          }, {
            id: 1,
            header: 'Napier',
            subheader: 'Napier, New Zealand'
          }, {
            id: 2,
            header: 'Hastings',
            subheader: 'Hastings, New Zealand'
          }, {
            id: 3,
            header: 'Auckland',
            subheader: 'Auckland, New Zealand'
          }
        ],
        customers: {
          1: [
            {
              id: 1,
              header: 'Fabian',
              facility: 1
            }, {
              id: 2,
              header: 'Joel',
              facility: 1
            }
          ],
          2: [
            {
              id: 2,
              header: 'Joel'
            }, {
              id: 3,
              header: 'Mark'
            }
          ],
          3: [
            {
              id: 4,
              header: 'David'
            }
          ]
        },
        facility: null,
        customer: null,
        country: null,
        selectFacility: function($event) {
          $scope.loading = true;
          return showSelect('Select a Facility', $scope.general.facilities, $event, $scope.general.facility, false, function() {
            return $scope.loading = false;
          }).then(function(facility) {
            var customerId;
            if (!facility || !facility.id) {
              $scope.general.facility = null;
              return;
            }
            $scope.general.facility = facility;
            if (!$scope.general.customer) {
              return;
            }
            customerId = $scope.general.customer.id;
            if (!_.any($scope.general.customers[$scope.general.facility.id], {
              id: customerId
            })) {
              return $scope.general.customer = null;
            }
          });
        },
        selectCustomer: function($event) {
          var customer, customerIds, customers, key, val, _i, _len;
          $scope.loading = true;
          customers = [];
          customerIds = [];
          if ($scope.general.facility) {
            customers = $scope.general.customers[$scope.general.facility.id];
          } else {
            for (key in $scope.general.customers) {
              val = $scope.general.customers[key];
              for (_i = 0, _len = val.length; _i < _len; _i++) {
                customer = val[_i];
                if (_.contains(customerIds, customer.id)) {
                  continue;
                }
                customers.push(customer);
                customerIds.push(customer.id);
              }
            }
          }
          return showSelect('Select a Customer', customers, $event, $scope.general.customer, false, function() {
            return $scope.loading = false;
          }).then(function(customer) {
            if (!customer || !customer.id) {
              $scope.general.customer = null;
              return;
            }
            return $scope.general.customer = customer;
          });
        },
        selectCountry: function($event) {
          var countries;
          countries = getCountryList();
          if (!$scope.general.country) {
            $scope.general.country = countries[147];
          }
          return showSelect('Select a Country', countries, $event, $scope.general.country, false, function() {}).then(function(country) {
            if (!country || !country.id) {
              $scope.general.country = null;
              return;
            }
            return $scope.general.country = country;
          });
        },
        selectCategory: function() {},
        setup: function() {
          if (this.facilities.length === 1) {
            return this.facility = this.facilities[0];
          }
        }
      };
      $scope.general.setup();
      $scope.dimensions = {
        imperial: false,
        length: '',
        width: '',
        height: '',
        weight: '',
        volume: '',
        perVolume: '∞',
        perWeight: '∞',
        perCapacity: '∞',
        pallet: {
          length: '1.2',
          width: '1',
          height: '0.14',
          actualHeight: '',
          actualWeight: '',
          weight: '13',
          tier: '',
          high: '',
          itemsPer: ''
        },
        calculateVolume: function() {
          var actualCubic, cubic, height, length, width;
          length = parseFloat($scope.dimensions.length);
          width = parseFloat($scope.dimensions.width);
          height = parseFloat($scope.dimensions.height);
          if (isNaN(length) || isNaN(width) || isNaN(height)) {
            return '';
          }
          if (length <= 0 || width <= 0 || height <= 0) {
            return '';
          }
          $scope.dimensions.calculatePerVolume(length, width, height);
          actualCubic = length * width * height;
          actualCubic = ($scope.dimensions.imperial ? actualCubic / (12 * 12 * 12) : actualCubic / (100 * 100 * 100));
          if (cubic < 1 / decimal) {
            $scope.dimensions.volume = "< " + (1 / decimal);
            return;
          }
          cubic = Math.floor(actualCubic * decimal) / decimal;
          if (cubic < 1 / decimal) {
            $scope.dimensions.volume = "< " + (1 / decimal);
            return;
          }
          return $scope.dimensions.volume = cubic.toString();
        },
        calculatePerVolume: function(length, width, height) {
          var cubic;
          if ($scope.dimensions.imperial) {
            length = length / 12;
            height = height / 12;
            width = width / 12;
          } else {
            length = length / 100;
            height = height / 100;
            width = width / 100;
          }
          length = 1 / length;
          height = 1 / height;
          width = 1 / width;
          cubic = length * width * height;
          return $scope.dimensions.perVolume = (Math.floor(cubic * decimal) / decimal).toString();
        },
        calculatePerWeight: function() {
          var weight;
          weight = $scope.dimensions.weight;
          if (!weight) {
            $scope.dimensions.perWeight = '∞';
            return;
          }
          weight = parseFloat(weight);
          if (isNaN(weight) || weight <= 0) {
            $scope.dimensions.perWeight = '∞';
            return;
          }
          weight = 1 / weight;
          if (isNaN(weight) || weight <= 0) {
            $scope.dimensions.perWeight = '∞';
            return;
          }
          if (weight < 1 / decimal) {
            $scope.dimensions.perWeight = "< " + (1 / decimal);
            return;
          }
          weight = Math.floor(weight * decimal) / decimal;
          return $scope.dimensions.perWeight = weight.toString();
        },
        calculatePerCapacity: function() {
          var capacity;
          capacity = $scope.dimensions.capacity;
          if (!capacity) {
            $scope.dimensions.perCapacity = '∞';
            return;
          }
          capacity = parseFloat(capacity);
          if (isNaN(capacity) || capacity <= 0) {
            $scope.dimensions.perCapacity = '∞';
            return;
          }
          capacity = 1 / capacity;
          if (isNaN(capacity) || capacity <= 0) {
            $scope.dimensions.perCapacity = '∞';
            return;
          }
          if (capacity < 1 / decimal) {
            $scope.dimensions.perCapacity = "< " + (1 / capacity);
            return;
          }
          capacity = Math.floor(capacity * decimal) / decimal;
          return $scope.dimensions.perCapacity = capacity.toString();
        },
        calculatePalletHeight: function() {
          var height, high, palletHeight;
          height = $scope.dimensions.height;
          palletHeight = $scope.dimensions.pallet.height;
          high = $scope.dimensions.pallet.high;
          height = parseFloat(height);
          palletHeight = parseFloat(palletHeight);
          high = parseFloat(high);
          if (isNaN(height) || isNaN(palletHeight) || isNaN(high)) {
            if (!isNaN(palletHeight)) {
              $scope.dimensions.pallet.actualHeight = palletHeight;
              return;
            }
            $scope.dimensions.pallet.actualHeight = '';
            return;
          }
          if (height <= 0 || palletHeight <= 0 || high <= 0) {
            if (palletHeight > 0) {
              $scope.dimensions.pallet.actualHeight = palletHeight;
              return;
            }
            $scope.dimensions.pallet.actualHeight = '';
            return;
          }
          palletHeight += high * ($scope.dimensions.imperial ? height / 12 : height / 100);
          palletHeight = Math.floor(palletHeight * decimal) / decimal;
          return $scope.dimensions.pallet.actualHeight = palletHeight.toString();
        },
        calculatePalletWeight: function() {
          var items, palletWeight, weight;
          $scope.dimensions.calculatePalletItems();
          items = $scope.dimensions.pallet.itemsPer;
          palletWeight = $scope.dimensions.pallet.weight;
          weight = $scope.dimensions.weight;
          items = parseFloat(items);
          palletWeight = parseFloat(palletWeight);
          weight = parseFloat(weight);
          if (isNaN(palletWeight) || palletWeight < 0) {
            palletWeight = 0;
          }
          if (isNaN(items) || isNaN(weight)) {
            if (palletWeight > 0) {
              $scope.dimensions.pallet.actualWeight = palletWeight.toString();
              return;
            }
            $scope.dimensions.pallet.actualWeight = '';
            return;
          }
          if (items <= 0 || weight <= 0) {
            if (palletWeight > 0) {
              $scope.dimensions.pallet.actualWeight = palletWeight.toString();
              return;
            }
            $scope.dimensions.pallet.actualWeight = '';
            return;
          }
          weight *= items;
          weight += palletWeight;
          weight = Math.floor(weight * decimal) / decimal;
          return $scope.dimensions.pallet.actualWeight = weight.toString();
        },
        calculatePalletItems: function() {
          var high, per, tier;
          high = $scope.dimensions.pallet.high;
          tier = $scope.dimensions.pallet.tier;
          high = parseFloat(high);
          tier = parseFloat(tier);
          if (isNaN(high) || isNaN(tier)) {
            $scope.dimensions.pallet.itemsPer = '';
            return;
          }
          if (high <= 0 || tier <= 0) {
            $scope.dimensions.pallet.itemsPer = '';
            return;
          }
          per = Math.floor(high * tier);
          return $scope.dimensions.pallet.itemsPer = per.toString();
        },
        setDefaultPallet: function() {
          if (!$scope.dimensions.imperial) {
            if ($scope.dimensions.pallet.width !== '3.28084') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            if ($scope.dimensions.pallet.height !== '0.4593176') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            if ($scope.dimensions.pallet.length !== '3.93701') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            $scope.dimensions.pallet.width = '1';
            $scope.dimensions.pallet.height = '0.14';
            $scope.dimensions.pallet.length = '1.2';
            if ($scope.dimensions.pallet.weight === '30') {
              $scope.dimensions.pallet.weight = '13';
            }
          } else {
            if ($scope.dimensions.pallet.width !== '1') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            if ($scope.dimensions.pallet.height !== '0.14') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            if ($scope.dimensions.pallet.length !== '1.2') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            $scope.dimensions.pallet.width = '3.28084';
            $scope.dimensions.pallet.height = '0.4593176';
            $scope.dimensions.pallet.length = '3.93701';
            if ($scope.dimensions.pallet.weight === '13') {
              $scope.dimensions.pallet.weight = '30';
            }
          }
          return $scope.dimensions.calculatePalletHeight();
        },
        setup: function() {
          $scope.$watch(function() {
            return $scope.dimensions.imperial;
          }, $scope.dimensions.calculateVolume);
          $scope.$watch(function() {
            return $scope.dimensions.imperial;
          }, $scope.dimensions.setDefaultPallet);
          $scope.$watch(function() {
            return $scope.dimensions.length;
          }, $scope.dimensions.calculateVolume);
          $scope.$watch(function() {
            return $scope.dimensions.width;
          }, $scope.dimensions.calculateVolume);
          $scope.$watch(function() {
            return $scope.dimensions.height;
          }, $scope.dimensions.calculateVolume);
          $scope.$watch(function() {
            return $scope.dimensions.height;
          }, $scope.dimensions.calculatePalletHeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.high;
          }, $scope.dimensions.calculatePalletHeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.height;
          }, $scope.dimensions.calculatePalletHeight);
          $scope.$watch(function() {
            return $scope.dimensions.weight;
          }, $scope.dimensions.calculatePerWeight);
          $scope.$watch(function() {
            return $scope.dimensions.capacity;
          }, $scope.dimensions.calculatePerCapacity);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.high;
          }, $scope.dimensions.calculatePalletItems);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.tier;
          }, $scope.dimensions.calculatePalletItems);
          $scope.$watch(function() {
            return $scope.dimensions.weight;
          }, $scope.dimensions.calculatePalletWeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.weight;
          }, $scope.dimensions.calculatePalletWeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.high;
          }, $scope.dimensions.calculatePalletWeight);
          return $scope.$watch(function() {
            return $scope.dimensions.pallet.tier;
          }, $scope.dimensions.calculatePalletWeight);
        }
      };
      $scope.dimensions.setup();
      $scope.grouping = {
        items: '1',
        width: '',
        height: '',
        length: '',
        capacity: '',
        volume: '',
        filled: '',
        filledCapacity: '',
        maximum: '',
        calculateVolume: function() {
          var height, length, volume, width;
          length = parseFloat($scope.grouping.length);
          width = parseFloat($scope.grouping.width);
          height = parseFloat($scope.grouping.height);
          if (isNaN(length) || isNaN(width) || isNaN(height)) {
            $scope.grouping.volume = '';
            return;
          }
          if (length <= 0 || width <= 0 || height <= 0) {
            $scope.grouping.volume = '';
            return;
          }
          volume = length * width * height;
          if (volume < 1 / decimal) {
            $scope.grouping.volume = "< " + (1 / decimal);
            return;
          }
          volume = Math.floor(volume * decimal) / decimal;
          return $scope.grouping.volume = volume.toString();
        },
        calculateFilled: function() {
          var filled, height, items, length, maximum, percent, width;
          length = $scope.dimensions.length;
          width = $scope.dimensions.width;
          height = $scope.dimensions.height;
          items = $scope.grouping.items;
          length = parseFloat(length);
          width = parseFloat(width);
          height = parseFloat(height);
          items = parseFloat(items);
          if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(items)) {
            $scope.grouping.filled = '';
            return;
          }
          if (length <= 0 || width <= 0 || height <= 0 || items <= 0) {
            $scope.grouping.filled = '';
            return;
          }
          filled = width * length * height * items;
          filled = Math.floor(filled * decimal) / decimal;
          $scope.grouping.filled = filled.toString();
          maximum = $scope.grouping.maximum;
          maximum = parseFloat(maximum);
          if (isNaN(maximum)) {
            return;
          }
          if (maximum < 1) {
            return;
          }
          percent = filled / maximum * 100;
          percent = Math.floor(percent * decimal) / decimal;
          if (percent <= 0) {
            return;
          }
          return $scope.grouping.filled = $scope.grouping.filled + (" (" + percent + "%)");
        },
        calculateMaximum: function() {
          var item, max;
          max = $scope.grouping.calculateMaximumWithFigures($scope.grouping.length, $scope.grouping.width, $scope.grouping.height, $scope.dimensions.length, $scope.dimensions.width, $scope.dimensions.height);
          if (isNaN(max) || max <= 0) {
            $scope.grouping.maximum = '';
            if ($scope.grouping.capacity && $scope.dimensions.capacity) {
              max = $scope.grouping.capacity;
              item = $scope.dimensions.capacity;
              max = parseFloat(max);
              item = parseFloat(item);
              if (isNaN(max) || isNaN(item)) {
                return;
              }
              if (max <= 0 || item <= 0) {
                return;
              }
              max = max / item;
              max = Math.floor(max);
              $scope.grouping.maximum = max.toString();
            }
            return;
          }
          max = Math.floor(max);
          return $scope.grouping.maximum = max.toString();
        },
        calculateMaximumWithFigures: function(l, w, h, il, iw, ih) {
          var max;
          l = parseFloat(l);
          w = parseFloat(w);
          h = parseFloat(h);
          il = parseFloat(il);
          iw = parseFloat(iw);
          ih = parseFloat(ih);
          if (isNaN(l) || isNaN(w) || isNaN(h)) {
            return NaN;
          }
          if (isNaN(il) || isNaN(iw) || isNaN(ih)) {
            return NaN;
          }
          if (l <= 0 || w <= 0 || h <= 0) {
            return NaN;
          }
          if (il <= 0 || iw <= 0 || ih <= 0) {
            return NaN;
          }
          return max = $scope.grouping.calculateAllCombinations([l, w, h], [il, iw, ih]);
        },
        calculateAllCombinations: function(a, b) {
          var aAll, bAll, i, k, max, res, v, va, val, vb, z, _i, _j, _k, _len, _len1, _len2;
          aAll = [];
          bAll = [];
          i = 0;
          while (i < a.length) {
            res = [];
            k = 0;
            while (k < a.length) {
              z = i + k;
              if (z >= a.length) {
                z -= a.length;
              }
              res.push(a[z]);
              k += 1;
            }
            i += 1;
            aAll.push(res);
          }
          i = 0;
          while (i < b.length) {
            res = [];
            k = 0;
            while (k < b.length) {
              z = i + k;
              if (z >= b.length) {
                z -= b.length;
              }
              res.push(b[z]);
              k += 1;
            }
            i += 1;
            bAll.push(res);
          }
          max = 0;
          for (_i = 0, _len = aAll.length; _i < _len; _i++) {
            va = aAll[_i];
            for (_j = 0, _len1 = bAll.length; _j < _len1; _j++) {
              vb = bAll[_j];
              v = [];
              i = 0;
              while (i < va.length && i < vb.length) {
                v.push(va[i] / vb[i]);
                i++;
              }
              val = null;
              for (_k = 0, _len2 = v.length; _k < _len2; _k++) {
                k = v[_k];
                if (val === null) {
                  val = k;
                  continue;
                }
                val *= k;
              }
              if (val > max) {
                max = val;
              }
            }
          }
          if (max <= 0) {
            return 0;
          }
          return max;
        },
        setup: function() {
          $scope.$watch(function() {
            return $scope.grouping.length;
          }, $scope.grouping.calculateVolume);
          $scope.$watch(function() {
            return $scope.grouping.width;
          }, $scope.grouping.calculateVolume);
          $scope.$watch(function() {
            return $scope.grouping.height;
          }, $scope.grouping.calculateVolume);
          $scope.$watch(function() {
            return $scope.grouping.length;
          }, $scope.grouping.calculateMaximum);
          $scope.$watch(function() {
            return $scope.grouping.width;
          }, $scope.grouping.calculateMaximum);
          $scope.$watch(function() {
            return $scope.grouping.height;
          }, $scope.grouping.calculateMaximum);
          $scope.$watch(function() {
            return $scope.grouping.capacity;
          }, $scope.grouping.calculateMaximum);
          $scope.$watch(function() {
            return $scope.grouping.items;
          }, $scope.grouping.calculateFilled);
          $scope.$watch(function() {
            return $scope.grouping.volume;
          }, $scope.grouping.calculateFilled);
          return $scope.$watch(function() {
            return $scope.grouping.maximum;
          }, $scope.grouping.calculateFilled);
        },
        selected: function() {
          $scope.grouping.calculateVolume();
          $scope.grouping.calculateMaximum();
          return $scope.grouping.calculateFilled();
        }
      };
      $scope.grouping.setup();
      return $scope.variations = {
        sku: '',
        description: '',
        variations: [],
        add: function() {
          $scope.variations.variations.push({
            sku: $scope.variations.sku,
            description: $scope.variations.description
          });
          $scope.variations.sku = '';
          return $scope.variations.description = '';
        }
      };
    }
  ]);

}).call(this);

(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'app/login/login.html'
      });
    }
  ]).controller('LoginCtrl', [
    '$scope', '$location', function($scope, $location) {
      $scope.username = '';
      $scope.password = '';
      return $scope.signIn = function() {
        if ($scope.username === 'Fabian' && $scope.password === 'password') {
          return $location.path('home');
        }
      };
    }
  ]);

}).call(this);

(function() {
  window.app.factory('showSelect', [
    '$mdDialog', '$timeout', function($mdDialog, $timeout) {
      return function(header, items, $event, selected, hideFilter, shown) {
        return $mdDialog.show({
          targetEvent: $event,
          locals: {
            options: {
              header: header,
              items: items,
              selected: selected,
              hideFilter: hideFilter
            }
          },
          controller: 'SelectCtrl',
          templateUrl: 'app/select-dialog/select-dialog.html'
        });
      };
    }
  ]).controller('SelectCtrl', [
    '$scope', '$mdDialog', 'options', function($scope, $mdDialog, options) {
      options = options || {};
      $scope.items = options.items;
      $scope.header = options.header;
      $scope.hideFilter = !!options.hideFilter;
      $scope.filter = {
        value: ''
      };
      $scope.okay = function() {
        return $mdDialog.hide($scope.selectedItem);
      };
      $scope.selectedItem = options.selected || $scope.items[0];
      return $scope.loadIndex = 0;
    }
  ]);

}).call(this);
