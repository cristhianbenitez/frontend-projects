import { useEffect, useState, useRef, useCallback } from 'react';

import { Header } from '@components/Header';
import { FiltersBar } from '@components/FiltersBar';
import { CountryTable } from '@components/CountryTable';
import { SearchBar } from '@components/SearchBar';

export const Home = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedRegion: [],
    sortBy: 'population',
    status: ''
  });
  const [countries, setCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const sortAndFilterCountries = useCallback(
    (data) => {
      let filtered = [...data];

      if (filters.selectedRegion.length > 0) {
        filtered = filtered.filter((country) =>
          filters.selectedRegion.map((region) => region.toLowerCase()).includes(country.region.toLowerCase())
        );
      }

      if (filters.status) {
        filtered = filtered.filter((country) => {
          if (filters.status === 'member') return country.unMember === true;
          if (filters.status === 'independent') return country.independent === true;
          return true;
        });
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (country) =>
            country.name.common.toLowerCase().includes(searchLower) ||
            country.region.toLowerCase().includes(searchLower)
        );
      }

      filtered.sort((a, b) => {
        if (filters.sortBy === 'name') {
          return a.name.common.localeCompare(b.name.common);
        }
        if (filters.sortBy === 'km2') {
          return b.area - a.area;
        }
        return b.population - a.population;
      });

      const totalFilteredResults = filtered.length;

      if (totalFilteredResults > page * 20) {
        setDisplayedCountries(filtered.slice(0, page * 20));
      } else {
        setDisplayedCountries(filtered);
      }
    },
    [filters, page]
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,independent,unMember'
        );
        if (!res.ok) throw new Error('Failed to fetch countries');
        const data = await res.json();
        setCountries(data);
        sortAndFilterCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    sortAndFilterCountries(countries);
  }, [countries, filters, page, sortAndFilterCountries]);

  const handleSearch = (e) => {
    setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
    setPage(1);
  };

  const handleRegionChange = (region) => {
    setFilters((prev) => ({
      ...prev,
      selectedRegion: prev.selectedRegion.includes(region)
        ? prev.selectedRegion.filter((r) => r !== region)
        : [...prev.selectedRegion, region]
    }));
    setPage(1);
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value }));
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setFilters((prev) => ({ ...prev, status: value }));
    setPage(1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      <Header />
      <main className="max-h-[868px] max-w-[1200px] overflow-hidden flex flex-col relative bg-primary-black md:mx-6 lg:mx-10 xl:mx-auto rounded-xl border border-secondary-black p-8 mb-11 shadow-lg">
        <SearchBar searchTerm={filters.searchTerm} onSearch={handleSearch} totalCountries={countries.length} />
        <section className="flex flex-col lg:flex-row gap-8 w-full">
          <FiltersBar
            sortBy={filters.sortBy}
            onSortChange={handleSortChange}
            selectedRegion={filters.selectedRegion}
            onRegionChange={handleRegionChange}
            status={filters.status}
            onStatusChange={handleStatusChange}
          />
          <CountryTable countries={displayedCountries} loaderRef={loaderRef} loading={loading} />
        </section>
      </main>
    </>
  );
};
