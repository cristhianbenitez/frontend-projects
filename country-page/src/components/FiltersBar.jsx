import { useState } from 'react';
import PropTypes from 'prop-types';

export const FiltersBar = ({ sortBy, onSortChange, selectedRegion, onRegionChange, status, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full  lg:max-w-[200px] xl:max-w-[260px] text-sm font-medium text-primary-white">
      <form className="flex flex-col gap-8">
        {/* Sort By Filter */}
        <div className="relative">
          <label className="text-primary-gray text-xs flex flex-col gap-2">
            Sort by
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-between items-center bg-transparent px-4 py-2 rounded-lg outline-none border-2 border-secondary-black text-primary-white hover:border-primary-blue focus:border-primary-blue transition-colors"
            >
              {sortBy === 'population' ? 'Population' : sortBy === 'name' ? 'Name' : 'Km²'}
              <svg
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </label>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-primary-black border-2 border-secondary-black rounded-lg">
              <div className="py-1">
                {[
                  { value: 'population', label: 'Population' },
                  { value: 'name', label: 'Name' },
                  { value: 'km2', label: 'Km²' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onSortChange({ target: { value: option.value } });
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-secondary-black/20 transition-colors ${
                      sortBy === option.value ? 'text-primary-blue' : 'text-primary-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Region Filter */}
        <div className="flex flex-col gap-2 xl:max-w-[220px]">
          <label className="text-primary-gray text-xs">Region</label>
          <div className="flex flex-wrap gap-2">
            {['Americas', 'Antarctic', 'Africa', 'Asia', 'Europe', 'Oceania'].map((region) => (
              <label
                key={region}
                className={`custom-checkbox font-medium
                ${selectedRegion.includes(region) ? 'bg-primary-black text-primary-gray' : ''}`}
              >
                <input
                  type="checkbox"
                  name="region"
                  value={region}
                  checked={selectedRegion.includes(region)}
                  onChange={() => onRegionChange(region)}
                  className="accent-primary-blue appearance-none"
                />
                {region}
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-primary-gray text-xs">Status</label>
          <div className="flex flex-col gap-2">
            {[
              { value: 'member', label: 'Member of the United Nations' },
              { value: 'independent', label: 'Independent' }
            ].map((statusOption) => (
              <label key={statusOption.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  value={statusOption.value}
                  checked={status === statusOption.value}
                  onChange={() => onStatusChange(status === statusOption.value ? '' : statusOption.value)}
                  className="status-checkbox"
                />
                {statusOption.label}
              </label>
            ))}
          </div>
        </div>
      </form>
    </aside>
  );
};

FiltersBar.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  selectedRegion: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRegionChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired
};
