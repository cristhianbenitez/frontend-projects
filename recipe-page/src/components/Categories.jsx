import PropTypes from 'prop-types';

export const Categories = ({ categories, currentCategory, handleCategoryChange }) => {
  return (
    <aside className="md:w-3/12">
      <h2 className="text-2xl font-semibold font-playfair mb-8">Categories</h2>
      <ul className=" grid grid-cols-2 md:grid-cols-1 gap-3">
        {categories.map((category) => (
          <li
            key={category.idCategory}
            className={`relative flex rounded-xl border border-gray px-4 text-xs h-14 overflow-hidden pl-14 w-full items-center cursor-pointer transition-all duration-300 ${
              currentCategory === category.strCategory ? 'bg-[#FEBD2E] text-black' : ''
            }`}
            onClick={() => handleCategoryChange(category.strCategory)}
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="h-14 absolute -left-12 object-cover"
            />
            {category.strCategory}
          </li>
        ))}
      </ul>
    </aside>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired
};
