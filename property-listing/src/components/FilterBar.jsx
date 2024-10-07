/* eslint-disable react/prop-types */

const FilterBar = ({ properties, filter, onFilterChange }) => {
  const listOfLocations = ['All Stays', ...new Set(properties.map((p) => p.location))]; // remove duplicates

  return (
    <section
      aria-label="filters-bar"
      className="bg-[#20293A]/95 flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-0 px-10 py-8 rounded-lg border-[1px] border-[#4A5567] -mt-14 mb-12"
    >
      <ul className="flex flex-wrap gap-3">
        {listOfLocations.map((location, index) => (
          <li
            key={index}
            className={`text-sm font-bold px-3 py-2 rounded-lg cursor-pointer ${
              filter.location === location ? 'bg-[#4A5567]' : 'hover:bg-[#5A6577]'
            }`}
            onClick={() => onFilterChange('location', location)}
          >
            {location}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <button
            className={`w-12 h-6 relative rounded-full border-2 transition-colors ${
              filter.superhost ? 'bg-[#4e80ee] border-[#4e80ee]' : 'bg-[#4A5567] border-[#4A5567]'
            }`}
            onClick={() => onFilterChange('superhost', !filter.superhost)}
          >
            <span
              className={`w-5 h-5 bg-[#f2f9fe] rounded-full absolute top-0 transition-transform ${
                filter.superhost ? 'left-0' : 'right-0'
              }`}
            />
          </button>
          <span className="text-xs font-medium">Superhost</span>
        </div>

        <div className="h-12 px-6 py-3 rounded-xl border-2 border-[#4a5567] justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-[#2A3546]">
          <div className="justify-center items-center gap-2 flex">
            <div className="text-[#f2f9fe] text-sm font-bold font-['DM Sans']">Property type</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
