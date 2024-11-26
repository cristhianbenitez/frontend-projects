import { Home } from './views/Home';
import { Recipe } from './views/Recipe';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<Recipe />} />
    </Routes>
  );
}

export default App;
