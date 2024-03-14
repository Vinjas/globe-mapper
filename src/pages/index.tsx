import Head from 'next/head';
import { Layout, SidePanel } from '@/components';
import styled from 'styled-components';
import { WorldMap } from '@/components';
import MapContextProvider from '@/context/mapContext';
import { use, useEffect, useRef, useState } from 'react';
import { size } from '@/styles/breakpoints';

const StyledMapWrapper = styled.div`
  flex: 2;
  width: 100%;
`;

const StyledPanelWrapper = styled.div`
  flex: 1.1;
  width: 100%;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  justify="space-between";
  gap: 3rem;
  height: 80vh;
`;

export default function Main() {
  const mapRef = useRef(null);
  const [mapWidth, setMapWidth] = useState(300);

  useEffect(() => {
    if (window) {
      const width = window.innerWidth;

      if (width < parseInt(size.xxl)) {
        setMapWidth(500);
      }

      if (width < parseInt(size.lg)) {
        setMapWidth(600);
      }

      if (width < parseInt(size.md)) {
        setMapWidth(800);
      }

      if (width < parseInt(size.sm)) {
        setMapWidth(1200);
      }
    }
  }, []);

  return (
    <MapContextProvider>
      <Layout>
        <Head>
          <title>GlobeMapper</title>
          <meta name="description" content="Global Interactive Map" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <StyledBody>
          <StyledMapWrapper ref={mapRef}>
            <WorldMap height={1000} width={mapWidth} />
          </StyledMapWrapper>

          <StyledPanelWrapper>
            <SidePanel />
          </StyledPanelWrapper>
        </StyledBody>
      </Layout>
    </MapContextProvider>
  );
}
