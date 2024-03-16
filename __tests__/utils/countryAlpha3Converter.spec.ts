import { getCountryISO2 } from '@/utils/countryAlpha3Converter';

describe('getCountryISO2', () => {
  it('should return the correct ISO2 code for a valid country code', () => {
    const countryCode = 'USA'; // replace with a valid country code
    const expectedISO2 = 'US'; // replace with the expected ISO2 code

    const result = getCountryISO2(countryCode);

    expect(result).toEqual(expectedISO2);
  });

  it('should return undefined for an invalid country code', () => {
    const countryCode = 'INVALID';

    const result = getCountryISO2(countryCode);

    expect(result).toBeUndefined();
  });
});
