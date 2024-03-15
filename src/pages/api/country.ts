import { gql } from '@apollo/client';

export const GET_ALL_COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
    }
  }
`;

export const FILTER_COUNTRIES_BY_NAME = gql`
  query filterCountriesByName($name: String!) {
    countries(filter: { name: { eq: $name } }) {
      code
    }
  }
`;

export const GET_COUNTRY = gql`
  query getCountry($code: ID!) {
    country(code: $code) {
      code
      name
      native
      capital
      currencies
      languages {
        name
        native
      }
      phones
      states {
        name
      }
    }
  }
`;
