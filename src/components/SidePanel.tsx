import styled from 'styled-components';
import { Button } from 'antd';
import { useContext, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { MapContext } from '@/context/mapContext';

const StyledSidePanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  padding: 1.5rem;
`;

const StyledSidePanelContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
`;

export function SidePanel(): JSX.Element {
  const [position, setPosition] = useState(null);

  const { mapInstance } = useContext<any>(MapContext);

  const testCoordinates: LatLngTuple = [40.41358972870147, -3.702227989122383];

  function handleOnClick() {
    mapInstance.flyTo(testCoordinates, 10, { duration: 2 });
  }

  return (
    <StyledSidePanel>
      <h1>SidePanel</h1>
      <StyledSidePanelContent>
        <Button type="primary" onClick={handleOnClick}>
          Fly to Spain
        </Button>
      </StyledSidePanelContent>
    </StyledSidePanel>
  );
}
