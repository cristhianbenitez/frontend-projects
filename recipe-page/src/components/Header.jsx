import Logo from '../assets/logo-dark.svg';

export const Header = () => {
  return (
    <header className="max-sm:bg-right bg-headerImage md:bg-headerImageLG xl:bg-headerImageXL bg-no-repeat bg-cover h-[420px] font-playfair relative mb-8 m-3 rounded-xl ">
      <div className="absolute top-14 right-3 lg:right-[108px] 2xl:right-1/4 xl:right-56 text-grayBlue">
        <img src={Logo} alt="logo" className="mb-4" />
        <div className="max-w-96 w-96 relative h-64 ">
          <h1 className="text-[4rem] font-semibold flex flex-col leading-[1.325]">
            <span>Chefs </span>
            <span className="ml-auto">Academy</span>
            <span>Secrets</span>
          </h1>
          <p className="text-xs font-medium absolute top-5 -right-3 max-w-36">
            🥘 New recipe for you to try out, let’s cook!
          </p>
        </div>
      </div>
    </header>
  );
};
