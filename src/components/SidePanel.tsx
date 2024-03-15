import styled from 'styled-components';
import { useContext } from 'react';
import { MapContext } from '@/context/mapContext';
import { useQuery } from '@apollo/client';
import { FILTER_COUNTRIES_BY_NAME, GET_COUNTRY } from '@/pages/api/country';
import { CountryDataPanel } from '@/components';
import { isEmpty } from 'lodash-es';
import { LoadingOutlined } from '@ant-design/icons';
import { COLORS } from '@/styles/colors';

interface CountryList {
  code: string;
  name: string;
}

interface Country {
  code: string;
  name: string;
  native: string;
  capital: string;
  currencies: string[];
  languages: {
    name: string;
    native: string;
  }[];
  phones: string[];
  states: {
    name: string;
  }[];
}

const StyledSidePanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export function SidePanel(): JSX.Element {
  const { selectedCountry } = useContext<any>(MapContext);

  /*  const {
    loading: loadingCountryFilter,
    error: errorCountryFilter,
    data: dataFilteredCountry
  } = useQuery<{
    countries: CountryList[];
  }>(FILTER_COUNTRIES_BY_NAME, {
    variables: { name: selectedCountry }
  }); */

  const {
    loading: loadingCountryData,
    error: errorContryData,
    data: dataCountryInfo
  } = useQuery<{ country: Country }>(GET_COUNTRY, {
    variables: {
      code: selectedCountry
    }
  });

  const isLoading = loadingCountryData;
  const isError = errorContryData;

  return (
    <StyledSidePanel>
      {isLoading && (
        <StyledLoader>
          <LoadingOutlined
            style={{ fontSize: '4rem', color: COLORS.blueDark }}
          />
        </StyledLoader>
      )}
      {!isLoading && isError && <p>No Data</p>}
      {!isLoading && !isEmpty(dataCountryInfo) && !isLoading && !isError && (
        <CountryDataPanel country={dataCountryInfo.country} />
      )}
    </StyledSidePanel>
  );
}
