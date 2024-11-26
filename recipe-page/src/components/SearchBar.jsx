import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const SearchBar = ({ sortBy, handleSorting, search, handleSearch, setSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('#dropdown-container')) {
        setIsOpen(false);
        console.log('clicked outside');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="max-sm:flex-col max-sm:gap-4 max-sm:items-center flex justify-between w-full mb-10">
      <form
        className="rounded-full border border-current h-12 overflow-hidden flex items-center w-full max-w-[332px] lg:max-w-[432px] text-grayBlue focus-within:border-white focus-within:text-white "
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(e.target.search.value);
          setSearch('');
        }}
      >
        <button type="submit">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 ml-6"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <input
          id="search"
          type="search"
          placeholder="Search recipes and more"
          aria-label="Search recipes and more"
          className="w-full h-full px-4 bg-transparent outline-none"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>

      <div className="relative" id="dropdown-container">
        <button
          className="flex text-darkBlue items-center gap-2 px-6 py-3 border font-medium border-gray rounded-full bg-white h-12 w-full justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            Sort by:&nbsp;<span className="font-bold">{sortBy || 'Name'}</span>
          </span>
          <svg
            className={`w-5 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 9l6 6 6-6" strokeWidth="2" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 bg-darkBlue border border-gray rounded-xl shadow-lg border-grayBlue overflow-hidden w-full ">
            <div>
              {['Name', 'ID'].map((option) => (
                <button
                  key={option}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray/10 hover:bg-grayBlue"
                  onClick={() => {
                    handleSorting(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  sortBy: PropTypes.string,
  handleSorting: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired
};
