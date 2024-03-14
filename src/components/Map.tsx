import { LatLngTuple } from 'leaflet';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false
});

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

interface MapProps {
  width: number;
  height: number;
  children: any;
  center: LatLngTuple;
  zoom: number;
}

export function Map(props: MapProps): JSX.Element {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap {...props} />
    </div>
  );
}
