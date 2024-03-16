import styled from 'styled-components';
import { useContext } from 'react';
import { MapContext } from '@/context/mapContext';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '@/graphql/country';
import { CountryDataPanel } from '@/components';
import { Spin } from 'antd';
import { isEmpty } from '@/utils/isEmpty';

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
        <StyledLoader data-testid="loader">
          <Spin size="large" />
        </StyledLoader>
      )}
      {!isLoading && isError && <h1>No Data</h1>}
      {!isLoading &&
        dataCountryInfo &&
        !isEmpty(dataCountryInfo) &&
        !isLoading &&
        !isError && <CountryDataPanel country={dataCountryInfo.country} />}
    </StyledSidePanel>
  );
}
