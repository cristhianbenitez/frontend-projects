import React from 'react';
import { Link, useParams } from 'react-router';
import { Header } from '@components/Header';

export const Country = () => {
  const { countryName } = useParams();

  const [country, setCountry] = React.useState(null);
  const [neighbors, setNeighbors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchNeighbors = async (borderCodes) => {
    if (!borderCodes?.length) return [];

    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(',')}`);
      if (!response.ok) throw new Error('Failed to fetch neighbors');

      const data = await response.json();
      return data.map((neighbor) => ({
        name: neighbor.name.common,
        flag: neighbor.flags.png,
        code: neighbor.cca3
      }));
    } catch (err) {
      console.error('Error fetching neighbors:', err);
      return [];
    }
  };

  React.useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);

        if (!response.ok) {
          throw new Error('Country not found');
        }

        const [countryData] = await response.json();
        setCountry(countryData);

        // Fetch neighbors using the separated function
        const neighborData = await fetchNeighbors(countryData.borders);
        setNeighbors(neighborData);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [countryName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <main className="max-w-[720px] flex flex-col relative bg-primary-black mx-auto rounded-xl border border-secondary-black pt-0 pb-5 shadow-lg">
        <section className="mx-auto -mt-12 z-10">
          <img
            className="w-[260px] h-[196px] rounded-md overflow-hidden object-cover mb-8"
            src={country.flags.png}
            alt={country.name.common}
          />
          <h1 className="text-primary-white text-[2rem] font-bold text-center mb-2">{country.name.common}</h1>
          <p className="text-primary-white font-medium text-center mb-10">{country.name.official}</p>
        </section>

        <section className="flex mb-10 mx-auto gap-10 ">
          {[
            { label: 'Population', value: country.population.toLocaleString() },
            { label: 'Area (km²)', value: country.area.toLocaleString() }
          ].map((item) => (
            <div className="flex px-5 py-[0.875rem] bg-secondary-black rounded-md" key={item.label}>
              <p className="text-primary-gray">{item.label}</p>
              <div role="separator" className="w-px h-full bg-primary-black mx-5"></div>
              <p className="text-primary-white">{item.value}</p>
            </div>
          ))}
        </section>

        <ul className="flex flex-col w-full ">
          {[
            { label: 'Capital', value: country.capital },
            { label: 'Subregion', value: country.subregion },
            { label: 'Language', value: Object.values(country.languages).join(', ') },
            {
              label: 'Currency',
              value: Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(', ')
            },
            { label: 'Continents', value: country.continents.join(', ') }
          ].map((item) => (
            <li
              className="flex px-5 py-5 border-b first:border-t border-secondary-black justify-between"
              key={item.label}
            >
              <p className="text-primary-gray text-sm">{item.label}</p>
              <p className="text-primary-white text-sm">{item.value}</p>
            </li>
          ))}
          <li className="flex flex-col px-5 py-5 justify-between gap-4 ">
            <p className="text-primary-gray text-sm">Neighboring Countries</p>
            <div className="flex flex-wrap gap-4">
              {neighbors.length > 0 ? (
                neighbors.map((neighbor) => (
                  <Link to={`/country/${neighbor.name}`} key={neighbor.code}>
                    <img
                      key={neighbor.code}
                      src={neighbor.flag}
                      alt={`Flag of ${neighbor.name}`}
                      className="w-16 h-12 object-cover rounded-md mb-2"
                      title={neighbor.name}
                    />
                    <p className="text-primary-white text-sm">{neighbor.name}</p>
                  </Link>
                ))
              ) : (
                <p className="text-primary-white text-sm">No neighboring countries</p>
              )}
            </div>
          </li>
        </ul>
      </main>
    </>
  );
};
