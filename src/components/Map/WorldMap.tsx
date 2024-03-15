import { Map } from '@/components';
import { LatLngTuple } from 'leaflet';

export function WorldMap({
  height,
  width
}: {
  height: number;
  width: number;
}): JSX.Element {
  const DEFAULT_CENTER: LatLngTuple = [47.380075, 8.543363];

  return (
    <Map width={height} height={width} center={DEFAULT_CENTER} zoom={4}>
      {({ TileLayer }: { TileLayer: any }): JSX.Element => (
        <>
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </>
      )}
    </Map>
  );
}
