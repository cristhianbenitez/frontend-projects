/* eslint-disable react/prop-types */
import BedroomIcon from '../assets/bedroom.svg';
import PeopleIcon from '../assets/people.svg';
import StarIcon from '../assets/star.svg';

const StayCard = ({ property }) => {
  return (
    <article key={property.id} className="bg-[#20293A] rounded-lg overflow-hidden relative ">
      {property.superhost && (
        <span className="flex items-center absolute top-4 left-4 bg-[#20293A] font-bold text-[0.625rem] px-3 py-1 rounded-full z-10">
          Superhost&nbsp; <img src={StarIcon} alt="star" className="w-4 h-4" />
        </span>
      )}
      <img src={property.image} alt={property.name} className="w-full h-auto" />
      <div className="p-5">
        <h3 className="font-bold mb-2">{property.title}</h3>
        <p className="text-sm text-[#97A3B6] max-w-72">{property.description}</p>
        <div className="flex items-center gap-4 text-[#97A3B6] text-xs mt-4">
          <span className="flex items-center">
            <img src={BedroomIcon} alt="bedroom" className="mr-1" />
            {property.capacity.bedroom} Bedroom
          </span>
          <span className="flex items-center">
            <img src={PeopleIcon} alt="people" className="mr-1" />
            {property.capacity.people} Guests
          </span>
        </div>
        <hr className="border-t border-[#2C3A4B] my-4 mb-5" />
        <div className="flex items-center justify-between font-bold">
          <span className="text-xl">
            ${property.price} <small className="text-[#97A3B6] font-normal text-sm"> /night</small>
          </span>
          <span className="flex items-center text-sm ">
            <img src={StarIcon} alt="rating" className="mr-1" />
            {property.rating}
          </span>
        </div>
      </div>
    </article>
  );
};

export default StayCard;
