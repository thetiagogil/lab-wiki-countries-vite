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
    <div>
      <div className="homePage">
        <h3>COUNTRIES LIST</h3>
        {countries.map((country) => {
          return (
            <div key={country._id}>
              <Link
                to={`/${country.alpha3Code}`}
                style={{ textDecoration: "none" }}
              >
                <div className="homePageCountryBox">
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                    className="smallImg"
                  />
                  <p>{country.name.official}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
