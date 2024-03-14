import { useLazyQuery } from "@apollo/client";
import { GET_COUNTRIES } from "@/pages/api/country";

interface Country {
  code: string;
  name: string;
  capital: string;
}

export function Test() {
  const [
    getCountries, 
    { loading, error, data }
  ] = useLazyQuery<{ countries: Country[] }>(GET_COUNTRIES);

  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error.message}</p>;

  function handleOnClick() {
    getCountries();
  }

  return (
    <div>
      <button onClick={handleOnClick}>Test</button>
      {
        data &&
          data.countries &&
          data.countries.map((c, i: number) => 
            <div key={i}>{c.name}</div>)
      }
      {
        loading && <p>Loading...</p>
      }
      {
        error && <p>Error</p>
      }
      </div>
  );
}