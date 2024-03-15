import { useContext, useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { MapContext } from '@/context/mapContext';
import { GeoJSON } from 'react-leaflet';
import { Layer, LeafletMouseEvent } from 'leaflet';
import * as geoJsonData from '@/data/countries.geo.json';

interface MapProps {
  children: any;
  width: number;
  height: number;
}

interface Feature {
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
}

const { MapContainer } = ReactLeaflet;

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
`;

function Map({ children, width, height, ...rest }: MapProps): JSX.Element {
  const { setMapInstance, setCurrentCoordinates, setSelectedCountry } =
    useContext<any>(MapContext);

  const [map, setMap] = useState<any>(null);
  const [highlightedFeature, setHighlightedFeature] = useState(null);
  const [overFeature, setOverFeature] = useState(null);

  const geojsonFeatureStyle = {
    color: '#384782',
    weight: 2,
    opacity: 0.7,
    fillColor: '#384782',
    fillOpacity: 0.3
  };

  const overFeatureStyle = {
    color: '#172152',
    weight: 3,
    opacity: 0.7,
    fillColor: '#172152',
    fillOpacity: 0.4
  };

  const highlightedFeatureStyle = {
    color: '#090a29',
    weight: 4,
    opacity: 0.7,
    fillColor: '#090a29',
    fillOpacity: 0.4
  };

  useEffect(() => {
    (async function init() {
      delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png'
      });
    })();
  }, []);

  useEffect(() => {
    if (map) {
      setMapInstance(map);
    }
  }, [map, setMapInstance]);

  function handleOnEachFeature(feature: Feature, layer: Layer) {
    layer.on({
      click: handleOnClick,
      mouseover: onFeatureMouseOver,
      mouseout: onFeatureMouseOut
    });
  }

  function handleOnClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setCurrentCoordinates([lat, lng]);
    setSelectedCountry(event.target.feature.properties.name);

    const layer = event.target;
    layer.setStyle(highlightedFeatureStyle);
    setHighlightedFeature(layer.feature);
  }

  const onFeatureMouseOver = (event: LeafletMouseEvent) => {
    const layer = event.target;
    layer.setStyle(overFeatureStyle);
    setOverFeature(layer.feature);
  };

  const onFeatureMouseOut = (event: LeafletMouseEvent) => {
    const layer = event.target;

    layer.setStyle(geojsonFeatureStyle);
    setOverFeature(null);
  };

  return (
    <StyledMapContainer ref={(map) => setMap(map)} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <GeoJSON
        data={geoJsonData as any}
        style={(feature) => {
          if (feature === highlightedFeature) {
            return highlightedFeatureStyle;
          }

          if (feature === overFeature) {
            return overFeatureStyle;
          }

          return geojsonFeatureStyle;
        }}
        onEachFeature={handleOnEachFeature as any}
      />
    </StyledMapContainer>
  );
}

export default Map;
