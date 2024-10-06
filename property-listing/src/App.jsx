import React from 'react';
import HeroImage from './assets/hero-image.jpg';
function App() {
  const [properties, setProperties] = React.useState([]);
  const [isSuperHost, setIsSuperHost] = React.useState(true);

  const API =
    'https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/property-listing-data.json';

  const fetchProperties = async () => {
    const response = await fetch(API);
    const data = await response.json();
    setProperties(data);
  };
  console.log(properties);

  React.useEffect(() => {
    fetchProperties();
  }, []);

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#121826] h-full text-[#F2F9FE]">
      <img aria-label="background hero image" src={HeroImage} alt="hero image" className="w-full h-auto" />

      <header
        aria-label="header"
        className="text-[#121826] absolute top-[180px] left-16 sm:left-28˜ md:left-[140px] container "
      >
        <h1 className="text-[4rem] font-semibold max-w-lg">Peace, nature, dream</h1>
        <p className="text-2xl mb-2">Find and book a great experience.</p>
      </header>

      <main className="container px-6 sm:px-8 md:px-[72px] ">
        <section aria-label="filters-bar" className="bg-[#20293A] bg-opacity-95 flex items-center justify-between">
          <ul className="flex gap-3">
            <li className="text-sm font-bold px-3 pb-2 bg-[#4A5567] rounded-lg">All Stays</li>
            {properties.map((p) => (
              <li key={p.id} className="text-sm font-bold px-3 pb-2 bg-[#4A5567] rounded-lg">
                {p.location}
              </li>
            ))}
          </ul>

          <div>
            <div
              className="h-6 justify-start items-center gap-2 inline-flex "
              onClick={() => setIsSuperHost(!isSuperHost)}
            >
              <div
                className={`w-12 h-6 relative  rounded-[20px] border-2 cursor-pointer ${
                  isSuperHost ? 'bg-[#4e80ee] border-[#4e80ee]' : 'bg-gray-400 border-gray-400'
                }`}
              >
                <div className={`w-5 h-5  absolute bg-[#f2f9fe] rounded-2xl right-0 ${isSuperHost ? 'left-0' : ''}`} />
              </div>
              <div className="text-xs font-medium">Superhost</div>
            </div>

            <div></div>
          </div>
        </section>

        <section>aaa</section>
      </main>
    </div>
  );
}

export default App;
