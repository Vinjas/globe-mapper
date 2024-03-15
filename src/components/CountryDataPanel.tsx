import { MapContext } from '@/context/mapContext';
import { ZoomInOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { isEmpty } from 'lodash-es';
import { useContext } from 'react';
import { COLORS } from '@/styles/colors';
import styled from 'styled-components';
import { CURRENCY_SYMBOL_MAPPING } from '@/constants/currencySymbol';

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

const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledNameTag = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledFlag = styled.span`
  font-size: 2rem;
`;

const StyledZoomButton = styled(Button)`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  background-color: ${COLORS.bluePrimary};
  &:hover {
    background-color: ${COLORS.blueSecondary};
  }
`;

export function CountryDataPanel({
  country
}: {
  country: Country;
}): JSX.Element {
  const { mapInstance, currentCoordinates } = useContext<any>(MapContext);

  const { code, name, native, capital, currencies, languages, phones, states } =
    country;

  function handleOnClick() {
    mapInstance.flyTo(currentCoordinates, 6, { duration: 2 });
  }

  return (
    <div>
      <StyledNameWrapper>
        <StyledNameTag>
          <StyledFlag className={`fi fi-${code.toLowerCase()}`} />
          <h1>{name}</h1>
          <div>{native}</div>
        </StyledNameTag>

        <StyledZoomButton
          icon={<ZoomInOutlined />}
          type="primary"
          onClick={handleOnClick}
        >
          <span>{`Fly to ${name}`}</span>
        </StyledZoomButton>
      </StyledNameWrapper>

      <div>
        <h3>Capital</h3>
        <div>{capital}</div>
      </div>
      <div>
        <h3>Currency</h3>
        {currencies.map((currency: string, i: number) => {
          const currencySymbol =
            CURRENCY_SYMBOL_MAPPING[
              currency as keyof typeof CURRENCY_SYMBOL_MAPPING
            ];

          return (
            <div key={i}>
              <span>{currency}</span>
              {currencySymbol && <span>{` - ${currencySymbol}`}</span>}
              <span></span>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Languages</h3>
        {languages.map((l: any, i: number) => (
          <div key={i}>
            <span>{l.name}</span>
          </div>
        ))}
      </div>
      <div>
        <h3>Phone Prefix</h3>
        {phones.map((phone: string, i: number) => (
          <div key={i}>{`+${phone}`}</div>
        ))}
      </div>
      {!isEmpty(states) && (
        <>
          <h2>States</h2>
          <div>
            {states.map((state: any, i: number) => (
              <div key={i}>{state.name}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
