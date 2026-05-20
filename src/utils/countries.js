/**
 * ISO-3166 country list with ITU-T E.164 dialing codes.
 *
 * Sourced from the public domain ITU-T E.164 numbering plan summary.
 * Keep alphabetical by name for predictable UX.
 *
 * For each country we record:
 *   - code: ISO-3166 alpha-2 (used for the flag emoji)
 *   - name: English country name
 *   - dialCode: E.164 prefix (digits only, NO leading "+")
 *   - flag: emoji flag (computed from the alpha-2 code)
 */

function flagOf(iso) {
  // Convert ISO alpha-2 (e.g. "BR") to regional indicator symbols (🇧🇷)
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65));
}

const RAW = [
  ["BR", "Brazil", "55"],
  ["US", "United States", "1"],
  ["AR", "Argentina", "54"],
  ["AU", "Australia", "61"],
  ["AT", "Austria", "43"],
  ["BE", "Belgium", "32"],
  ["BO", "Bolivia", "591"],
  ["CA", "Canada", "1"],
  ["CL", "Chile", "56"],
  ["CN", "China", "86"],
  ["CO", "Colombia", "57"],
  ["CR", "Costa Rica", "506"],
  ["CU", "Cuba", "53"],
  ["CZ", "Czech Republic", "420"],
  ["DK", "Denmark", "45"],
  ["DO", "Dominican Republic", "1"],
  ["EC", "Ecuador", "593"],
  ["EG", "Egypt", "20"],
  ["SV", "El Salvador", "503"],
  ["FI", "Finland", "358"],
  ["FR", "France", "33"],
  ["DE", "Germany", "49"],
  ["GR", "Greece", "30"],
  ["GT", "Guatemala", "502"],
  ["HN", "Honduras", "504"],
  ["HK", "Hong Kong", "852"],
  ["IS", "Iceland", "354"],
  ["IN", "India", "91"],
  ["ID", "Indonesia", "62"],
  ["IE", "Ireland", "353"],
  ["IL", "Israel", "972"],
  ["IT", "Italy", "39"],
  ["JP", "Japan", "81"],
  ["LU", "Luxembourg", "352"],
  ["MO", "Macau", "853"],
  ["MY", "Malaysia", "60"],
  ["MX", "Mexico", "52"],
  ["MA", "Morocco", "212"],
  ["NL", "Netherlands", "31"],
  ["NZ", "New Zealand", "64"],
  ["NI", "Nicaragua", "505"],
  ["NG", "Nigeria", "234"],
  ["NO", "Norway", "47"],
  ["PK", "Pakistan", "92"],
  ["PA", "Panama", "507"],
  ["PY", "Paraguay", "595"],
  ["PE", "Peru", "51"],
  ["PH", "Philippines", "63"],
  ["PL", "Poland", "48"],
  ["PT", "Portugal", "351"],
  ["PR", "Puerto Rico", "1"],
  ["RO", "Romania", "40"],
  ["RU", "Russia", "7"],
  ["SA", "Saudi Arabia", "966"],
  ["SG", "Singapore", "65"],
  ["ZA", "South Africa", "27"],
  ["KR", "South Korea", "82"],
  ["ES", "Spain", "34"],
  ["SE", "Sweden", "46"],
  ["CH", "Switzerland", "41"],
  ["TW", "Taiwan", "886"],
  ["TH", "Thailand", "66"],
  ["TR", "Turkey", "90"],
  ["UA", "Ukraine", "380"],
  ["AE", "United Arab Emirates", "971"],
  ["GB", "United Kingdom", "44"],
  ["UY", "Uruguay", "598"],
  ["VE", "Venezuela", "58"],
  ["VN", "Vietnam", "84"],
];

export const COUNTRIES = RAW.map(([code, name, dialCode]) => ({
  code,
  name,
  dialCode,
  flag: flagOf(code),
})).sort((a, b) => a.name.localeCompare(b.name));

export const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === "BR");

export function findByDialCode(dialCode) {
  if (!dialCode) return null;
  return COUNTRIES.find((c) => c.dialCode === String(dialCode)) || null;
}
