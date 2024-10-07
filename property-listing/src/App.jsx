import { useState, useEffect, useCallback, useMemo } from 'react';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import StayCard from './components/StayCard';

const API =
  'https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/property-listing-data.json';

function App() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState({
    location: 'All Stays',
    superhost: false
  });

  const fetchProperties = useCallback(async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleFilterChange = useCallback((key, value) => {
    setFilter((prevFilter) => ({ ...prevFilter, [key]: value }));
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(
      (property) =>
        (filter.superhost ? property.superhost : true) &&
        (filter.location === 'All Stays' || property.location === filter.location)
    );
  }, [properties, filter]);

  // Loading state
  if (properties.length === 0) {
    return <div>Loading...</div>;
  }

  // Render
  return (
    <>
      <Header />
      <main className=" max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-[72px] 2xl:px-0 relative z-10 pb-28 ">
        <FilterBar properties={properties} filter={filter} onFilterChange={handleFilterChange} />

        <section aria-label="properties-list" className="max-w-7xl">
          <h2 className="text-2xl font-bold mb-8">Over 200 stays</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
            {filteredProperties.map((property) => (
              <StayCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
