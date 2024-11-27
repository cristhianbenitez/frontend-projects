import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

export const CountryTable = ({ countries, loaderRef, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[844px] overflow-hidden">
      <div className="overflow-x-auto">
        <div className="overflow-y-auto max-h-[400px] lg:max-h-[600px] xl:max-h-[740px] scrollbar-thin scrollbar-thumb-secondary-black overscroll-contain">
          <table className="min-w-[600px] lg:w-full relative">
            <thead className="text-primary-gray sticky top-0 bg-primary-black z-10" role="table-header">
              <tr className="flex w-full text-xs mb-4">
                <th className="w-[58px] font-normal text-left">Flag</th>
                <th className="w-[108px] font-normal text-left ml-[48px]">Name</th>
                <th className="w-[108px] font-normal text-left ml-[42px] md:ml-[88px]">Population</th>
                <th className="w-[108px] font-normal text-left ml-[42px] md:ml-[88px]">Area (km²)</th>
                <th className="w-[108px] font-normal text-left ml-[42px] md:ml-[88px]">Region</th>
              </tr>
              <tr role="separator">
                <td colSpan="5">
                  <div className="w-full border-secondary-black mb-4 border-t-2" />
                </td>
              </tr>
            </thead>
            <tbody>
              {countries.map((country, index) => (
                <tr
                  key={`${country.name.common}-${country.area}-${index}`}
                  className="flex w-full text-primary-white items-center mb-6 hover:bg-secondary-black/20 transition-colors cursor-pointer"
                  onClick={() => navigate(`/country/${country.name.common.toLowerCase()}`)}
                >
                  <td className="w-[58px]">
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      className="w-[50px] h-[38px] rounded-md overflow-hidden object-cover"
                    />
                  </td>
                  <td className="w-[108px] ml-[48px]">{country.name.common}</td>
                  <td className="w-[108px] ml-[42px] md:ml-[88px]">{country.population.toLocaleString()}</td>
                  <td className="w-[108px] ml-[42px] md:ml-[88px]">{country.area.toLocaleString()}</td>
                  <td className="w-[108px] ml-[42px] md:ml-[88px]">{country.region}</td>
                </tr>
              ))}
              <tr ref={loaderRef} className="h-10">
                {loading && <td className="text-center w-full text-primary-gray">Loading more countries...</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

CountryTable.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired
      }),
      flags: PropTypes.shape({
        png: PropTypes.string.isRequired
      }),
      population: PropTypes.number.isRequired,
      area: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired
    })
  ).isRequired,
  loaderRef: PropTypes.object,
  loading: PropTypes.bool.isRequired
};
