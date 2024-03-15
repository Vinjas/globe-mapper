import { MapContext } from '@/context/mapContext';
import { Button } from 'antd';
import { useContext } from 'react';

interface Country {
  name: string;
  native: string;
  capital: string;
  currency: string;
  languages: {
    code: string;
    name: string;
  }[];
}

export function CountryDataPanel({
  country
}: {
  country: Country;
}): JSX.Element {
  const { mapInstance, currentCoordinates } = useContext<any>(MapContext);

  function handleOnClick() {
    mapInstance.flyTo(currentCoordinates, 7, { duration: 2 });
  }

  return (
    <div>
      <h1>{country.name}</h1>

      <div>{country.native}</div>
      <div>{country.capital}</div>
      <div>{country.currency}</div>
      <div>
        {country.languages.map((l: any, i: number) => (
          <div key={i}>{l.name}</div>
        ))}
      </div>

      <Button type="primary" onClick={handleOnClick}>
        Zoom to Selected Country
      </Button>
    </div>
  );
}
