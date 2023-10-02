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
    <div>
      <div className="countryDetailsPage">
        <h3>COUNTRY DETAILS</h3>

        <div className="countryDetailsBox">
          <h1>{country.name.official}</h1>

          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
            className="bigImg"
          />

          <section>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km²</p>
            <ul>
              <p>Borders</p>
              {country.borders.map((border) => {
                return (
                  <div key={border}>
                    <Link to={`/${border}`}>
                      <li>{border}</li>
                    </Link>
                  </div>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
