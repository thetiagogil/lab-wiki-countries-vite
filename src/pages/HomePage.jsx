import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllCountries = async () => {
    const response = await fetch(
      "https://ih-countries-api.herokuapp.com/countries"
    );

    if (response) {
      const countriesData = await response.json();
      console.log(countriesData);
      setCountries(countriesData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h1>All of the countries</h1>
      {countries.map((country) => {
        return (
          <div key={country._id}>
            <Link to={`/${country.alpha3Code}`}>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                style={{ height: 30 }}
              />
              <p>{country.name.official}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default HomePage;
