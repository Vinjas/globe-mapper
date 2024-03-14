import { useContext, useEffect, useState } from 'react';
import Leaflet, { LatLngTuple } from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { MapContext } from '@/context/mapContext';
import { GeoJSON } from 'react-leaflet';
import { Layer, LeafletMouseEvent, Geometry } from 'leaflet';
import * as geoJsonData from '@/data/countries.geo.json';

const { MapContainer } = ReactLeaflet;

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
`;

interface MapProps {
  children: any;
  width: number;
  height: number;
  center: LatLngTuple;
  zoom: number;
}

interface GeoJSONData {
  type: string;
  features: Feature[];
}

interface Feature {
  type: string;
  properties: {
    name: string;
    // Otras propiedades según tu GeoJSON
  };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
    // Otros campos según tu GeoJSON
  };
}

function Map({ children, width, height, ...rest }: MapProps): JSX.Element {
  const { setMapInstance } = useContext<any>(MapContext);

  const [map, setMap] = useState<any>(null);
  const [highlightedFeature, setHighlightedFeature] = useState(null);

  const geojsonFeatureStyle = {
    color: '#3388ff',
    weight: 2,
    opacity: 0.7,
    fillColor: '#3388ff',
    fillOpacity: 0.2
  };

  const highlightedFeatureStyle = {
    color: '#ff0000',
    weight: 3,
    opacity: 0.7,
    fillColor: '#ff0000',
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
    layer.bindPopup(getPopupContent(feature.properties), {
      className: 'custom-popup-container'
    });
    layer.on({
      click: handleOnClick,
      mouseover: onFeatureMouseOver,
      mouseout: onFeatureMouseOut
    });
  }

  function handleOnClick(event: LeafletMouseEvent) {
    console.log('Clicked on ' + event.target.feature.properties.name);
  }

  const onFeatureMouseOver = (event) => {
    const layer = event.target;
    layer.setStyle(highlightedFeatureStyle);
    setHighlightedFeature(layer.feature);
  };

  const onFeatureMouseOut = (event) => {
    const layer = event.target;
    layer.setStyle(geojsonFeatureStyle);
    setHighlightedFeature(null);
  };

  function getPopupContent(properties) {
    return `
      <div>
        <h2>${properties.name}</h2>
      </div>
    `;
  }

  return (
    <StyledMapContainer ref={(map) => setMap(map)} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <GeoJSON
        data={geoJsonData as any}
        style={(feature) =>
          feature === highlightedFeature
            ? highlightedFeatureStyle
            : geojsonFeatureStyle
        }
        onEachFeature={handleOnEachFeature as any}
      />
    </StyledMapContainer>
  );
}

export default Map;
