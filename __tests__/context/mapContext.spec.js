import { render } from '@testing-library/react';
import MapContextProvider from '@/context/mapContext.tsx';
import { MapContext } from '@/context/mapContext.tsx';
import {
  DEFAULT_COORDINATES,
  DEFAULT_SELECTED_COUNTRY
} from '@/constants/constants';

describe('MapContextProvider', () => {
  it('provides the map context', () => {
    let contextValues;
    render(
      <MapContextProvider>
        <MapContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </MapContext.Consumer>
      </MapContextProvider>
    );

    expect(contextValues).toHaveProperty('mapInstance');
    expect(contextValues).toHaveProperty('setMapInstance');
    expect(contextValues).toHaveProperty('selectedCountry');
    expect(contextValues).toHaveProperty('setSelectedCountry');
    expect(contextValues).toHaveProperty('currentCoordinates');
    expect(contextValues).toHaveProperty('setCurrentCoordinates');
  });

  it('initializes with default values', () => {
    let contextValues;
    render(
      <MapContextProvider>
        <MapContext.Consumer>
          {(value) => {
            contextValues = value;
            return null;
          }}
        </MapContext.Consumer>
      </MapContextProvider>
    );

    expect(contextValues.mapInstance).toBeNull();
    expect(contextValues.selectedCountry).toBe(DEFAULT_SELECTED_COUNTRY);
    expect(contextValues.currentCoordinates).toEqual(DEFAULT_COORDINATES);
  });
});
