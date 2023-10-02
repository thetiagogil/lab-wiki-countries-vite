import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetails() {
  const { countryId } = useParams();

  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountry = async () => {
    const response = await fetch(
      `https://ih-countries-api.herokuapp.com/countries/${countryId}`
    );

    if (response) {
      const countryData = await response.json();
      console.log(countryData);
      setCountry(countryData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [countryId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h1>Country Details</h1>
      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
        style={{ height: 30 }}
      />
      <h3>{country.name.official}</h3>
      <section>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <div>
          {country.borders.map((border) => {
            return (
              <div key={border}>
                <Link to={`/${border}`}>
                  <p>{border}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default CountryDetails;
