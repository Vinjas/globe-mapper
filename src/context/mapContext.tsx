import {
  DEFAULT_COORDINATES,
  DEFAULT_SELECTED_COUNTRY
} from '@/constants/constants';
import { LatLngTuple } from 'leaflet';
import { useState, createContext, useMemo } from 'react';

interface MapContextProps {
  mapInstance: any;
  setMapInstance: (map: any) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  currentCoordinates: LatLngTuple;
  setCurrentCoordinates: (coordinates: LatLngTuple) => void;
}

export const MapContext = createContext<MapContextProps | null>(null);

const MapContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(
    DEFAULT_SELECTED_COUNTRY
  );
  const [currentCoordinates, setCurrentCoordinates] = useState(
    DEFAULT_COORDINATES as LatLngTuple
  );

  const value = useMemo(() => {
    return {
      mapInstance,
      setMapInstance,
      selectedCountry,
      setSelectedCountry,
      currentCoordinates,
      setCurrentCoordinates
    };
  }, [mapInstance, selectedCountry, currentCoordinates]);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export default MapContextProvider;
