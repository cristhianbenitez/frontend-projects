import SearchIcon from '@assets/search.svg';
import PropTypes from 'prop-types';

export const SearchBar = ({ searchTerm, onSearch, totalCountries }) => (
  <section className="flex justify-between items-center w-full mb-9">
    <h3 className="text-primary-gray">Found {totalCountries} countries</h3>
    <div className="flex items-center w-full max-w-[360px] bg-secondary-black rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-primary-blue transition-all">
      <img src={SearchIcon} alt="Search icon" className="pr-3" />
      <input
        type="search"
        value={searchTerm}
        onChange={onSearch}
        placeholder="Search by Name, Region, or Subregion"
        className="bg-transparent outline-none text-white w-full text-sm placeholder:text-primary-gray"
      />
    </div>
  </section>
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  totalCountries: PropTypes.number.isRequired
};
