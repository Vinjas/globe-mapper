import { Map } from '@/components';
import { LatLngTuple } from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import * as geoJsonData from '@/data/countries.geo.json';

export function WorldMap({ height, width }): JSX.Element {
  const DEFAULT_CENTER: LatLngTuple = [47.380075, 8.543363];

  return (
    <Map width={height} height={width} center={DEFAULT_CENTER} zoom={4}>
      {({
        TileLayer,
        Marker,
        Popup
      }: {
        TileLayer: any;
        Marker: any;
        Popup: any;
      }): JSX.Element => (
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </>
      )}
    </Map>
  );
}
