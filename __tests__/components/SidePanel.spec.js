import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MapContext } from '@/context/mapContext';
import { GET_COUNTRY } from '@/graphql/country';
import { SidePanel } from '@/components/SidePanel';

const mocks = [
  {
    request: {
      query: GET_COUNTRY,
      variables: {
        code: 'US'
      }
    },
    result: {
      data: {
        country: {
          code: 'US',
          name: 'United States',
          currencies: ['USD'],
          languages: [
            {
              name: 'English'
            }
          ],
          phones: ['+1'],
          states: [
            {
              name: 'Alabama'
            }
          ],
          capital: 'Washington D.C.'
        }
      }
    }
  }
];

describe('SidePanel', () => {
  it('renders without error', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MapContext.Provider value={{ selectedCountry: 'US' }}>
          <SidePanel />
        </MapContext.Provider>
      </MockedProvider>
    );
  });

  it('should display loader when data is being fetched', () => {
    render(
      <MockedProvider mocks={[]}>
        <MapContext.Provider value={{ selectedCountry: 'US' }}>
          <SidePanel />
        </MapContext.Provider>
      </MockedProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should display country data when data is fetched', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MapContext.Provider value={{ selectedCountry: 'US' }}>
          <SidePanel />
        </MapContext.Provider>
      </MockedProvider>
    );

    await screen.findByText('United States');
    await screen.findByText('English');
    await screen.findByText('USD');
    await screen.findByText('Washington D.C.');
    await screen.findByText('States');
  });

  it('should display error message when there is an error', async () => {
    const errorMock = [
      {
        request: {
          query: GET_COUNTRY,
          variables: {
            code: 'US'
          }
        },
        error: new Error('An error occurred')
      }
    ];

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <MapContext.Provider value={{ selectedCountry: 'US' }}>
          <SidePanel />
        </MapContext.Provider>
      </MockedProvider>
    );

    await screen.findByText('No Data');
  });
});
