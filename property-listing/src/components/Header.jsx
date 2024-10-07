import HeroImageDesktop from '../assets/hero-image@desktop.jpg';

const Header = () => {
  return (
    <header className="relative" aria-label="header">
      <img
        src={HeroImageDesktop}
        alt="hero image"
        className="w-full object-cover h-[640px]  "
        aria-label="background hero image"
      />
      <div className="text-[#121826] absolute top-[180px] left-16 sm:left-28 md:left-[140px] 2xl:left-56 container mx-auto font-[Outfit]">
        <h1 className="text-[4rem] font-semibold max-w-lg leading-snug">Peace, nature, dream</h1>
        <p className="text-2xl mb-2 ">Find and book a great experience.</p>
      </div>
    </header>
  );
};

export default Header;
