import { useState, createContext, useMemo } from 'react';

interface MapContextProps {
  mapInstance: any;
  setMapInstance: (map: any) => void;
}

export const MapContext = createContext<MapContextProps | null>(null);

const MapContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mapInstance, setMapInstance] = useState(null);

  const value = useMemo(() => {
    return {
      mapInstance,
      setMapInstance,
    };
  }, [mapInstance]);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export default MapContextProvider;
