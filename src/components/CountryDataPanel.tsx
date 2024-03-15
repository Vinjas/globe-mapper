import { MapContext } from '@/context/mapContext';
import {
  CommentOutlined,
  DollarOutlined,
  HomeOutlined,
  PhoneOutlined,
  RightOutlined,
  ZoomInOutlined
} from '@ant-design/icons';
import { Button, StatesModal } from '@/components';
import { Divider, Collapse } from 'antd';
import { isEmpty } from 'lodash-es';
import { useContext, useState } from 'react';
import { COLORS } from '@/styles/colors';
import styled from 'styled-components';
import { CURRENCY_SYMBOL_MAPPING } from '@/constants/currencySymbol';

const { Panel } = Collapse;

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

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const StyledColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid ${COLORS.lightGray};
  padding: 1.5rem 2rem;
  margin-top: 2rem;
  border-radius: 10px;
  background-color: ${COLORS.pureWhite};
`;

const StyledTag = styled.div`
  display: flex;
  color: ${COLORS.bluePrimary};
  border: 1px solid ${COLORS.bluePrimary};
  align-items: center;
  border-radius: 10px;
  padding: 0 0.5rem;
  gap: 1rem;
`;

const StyledTagList = styled.div`
  display: flex;
  flex-direction: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  overflow: auto;
`;

export function CountryDataPanel({
  country
}: {
  country: Country;
}): JSX.Element {
  const { mapInstance, currentCoordinates } = useContext<any>(MapContext);

  const { code, name, native, capital, currencies, languages, phones, states } =
    country;

  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleOnClick() {
    mapInstance.flyTo(currentCoordinates, 6, { duration: 2 });
  }

  function handleOpenStatesModal() {
    setIsModalVisible(true);
  }

  function handleModalClose() {
    setIsModalVisible(false);
  }

  return (
    <div>
      <StyledNameWrapper>
        <StyledNameTag>
          <StyledFlag className={`fi fi-${code.toLowerCase()}`} />
          <h1>{name}</h1>
          <div>{native}</div>

          {!isEmpty(states) && (
            <Button type="secondary" onClick={handleOpenStatesModal}>
              <RightOutlined />
              <span>View States</span>
            </Button>
          )}
        </StyledNameTag>

        <Button onClick={handleOnClick}>
          <ZoomInOutlined />
          <span>{`Fly to ${name}`}</span>
        </Button>
      </StyledNameWrapper>

      <StyledContent>
        <StyledColumn>
          <StyledTagList>
            <StyledNameWrapper>
              <HomeOutlined />
              <h2>Capital:</h2>
            </StyledNameWrapper>

            <StyledTag>{capital}</StyledTag>
          </StyledTagList>

          <StyledTagList>
            <StyledNameWrapper>
              <CommentOutlined />
              <h2>Languages:</h2>
            </StyledNameWrapper>

            <StyledNameWrapper>
              {languages.map((l: any, i: number) => (
                <StyledTag key={i}>
                  <span>{l.name}</span>
                </StyledTag>
              ))}
            </StyledNameWrapper>
          </StyledTagList>
        </StyledColumn>

        <StyledColumn>
          <StyledTagList>
            <StyledNameWrapper>
              <PhoneOutlined />
              <h2>Phone Prefix:</h2>
            </StyledNameWrapper>
            {phones.map((phone: string, i: number) => (
              <StyledTag key={i}>{`+${phone}`}</StyledTag>
            ))}
          </StyledTagList>

          <StyledTagList>
            <StyledNameWrapper>
              <DollarOutlined />
              <h2>Currency:</h2>
            </StyledNameWrapper>

            <StyledNameWrapper>
              {currencies.map((currency: string, i: number) => {
                const currencySymbol =
                  CURRENCY_SYMBOL_MAPPING[
                    currency as keyof typeof CURRENCY_SYMBOL_MAPPING
                  ];

                return (
                  <StyledTag key={i}>
                    <span>{currency}</span>
                    {currencySymbol && <span>{` - ${currencySymbol}`}</span>}
                  </StyledTag>
                );
              })}
            </StyledNameWrapper>
          </StyledTagList>
        </StyledColumn>
      </StyledContent>

      <StatesModal
        countryName={name}
        states={states}
        isOpen={isModalVisible}
        onCancel={handleModalClose}
      />
    </div>
  );
}
