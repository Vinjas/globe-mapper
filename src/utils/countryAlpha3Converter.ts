import { COUNTRY_ISO_MAPPING } from '@/constants/countriesISO';

interface CountryIsoMapping {
  [key: string]: string;
}

/**
 * Get the ISO2 code for a given country ISO3 code
 *
 * @param countryCode - The ISO3 code of the country
 * @returns The ISO2 code of the country
 */
export function getCountryISO2(countryCode: string) {
  return (COUNTRY_ISO_MAPPING as CountryIsoMapping)[countryCode];
}
