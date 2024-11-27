import Logo from '@assets/logo.svg';
import HeroImage from '@assets/hero-image-wr.jpg';
import { Link } from 'react-router';

export const Header = () => (
  <header className="flex w-full justify-center bg-primary-black relative">
    <img
      src={HeroImage}
      alt="World Ranks hero image"
      className="absolute top-0 left-0 w-full h-[300px] object-cover opacity-50"
    />
    <h1 className="text-2xl font-bold z-10 mt-[7.5rem] mb-24">
      <Link to="/">
        <img src={Logo} alt="World Ranks logo" className="hover:opacity-90 transition-opacity" />
      </Link>
    </h1>
  </header>
);
