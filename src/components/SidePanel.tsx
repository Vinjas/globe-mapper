import styled from 'styled-components';
import { useContext } from 'react';
import { MapContext } from '@/context/mapContext';
import { useQuery } from '@apollo/client';
import { FILTER_COUNTRIES_BY_NAME, GET_COUNTRY } from '@/pages/api/country';
import { CountryDataPanel } from '@/components';
import { isEmpty } from 'lodash-es';

interface CountryList {
  code: string;
  name: string;
}

interface Country {
  name: string;
  native: string;
  capital: string;
  currency: string;
  languages: {
    code: string;
    name: string;
  }[];
}

const StyledSidePanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

export function SidePanel(): JSX.Element {
  const { selectedCountry } = useContext<any>(MapContext);

  const {
    loading: loadingCountryFilter,
    error: errorCountryFilter,
    data: dataFilteredCountry
  } = useQuery<{
    countries: CountryList[];
  }>(FILTER_COUNTRIES_BY_NAME, {
    variables: { name: selectedCountry }
  });

  const {
    loading: loadingCountryData,
    error: errorContryData,
    data: dataCountryInfo
  } = useQuery<{ country: Country }>(GET_COUNTRY, {
    variables: {
      code: dataFilteredCountry?.countries[0]?.code
    },
    skip: !dataFilteredCountry || !dataFilteredCountry.countries[0]?.code
  });

  const isLoading = loadingCountryFilter || loadingCountryData;
  const isError = errorCountryFilter || errorContryData;

  return (
    <StyledSidePanel>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {!isLoading && isEmpty(dataCountryInfo) && <p>No Data</p>}
      {!isLoading && !isEmpty(dataCountryInfo) && !isLoading && !isError && (
        <CountryDataPanel country={dataCountryInfo.country} />
      )}
    </StyledSidePanel>
  );
}
