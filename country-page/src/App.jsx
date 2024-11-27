import { Home } from './views/Home';
import { Routes, Route } from 'react-router';
import { Country } from './views/Country';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:countryName" element={<Country />} />
    </Routes>
  );
}

export default App;
