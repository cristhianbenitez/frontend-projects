import { useState } from 'react';

import { Sidebar } from '@components';

function App() {
  const [theme, setTheme] = useState('dark');

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex h-full">
      <Sidebar theme={theme} handleTheme={handleTheme} />
      <main className="my-3 mr-3 px-3 py-4 w-full bg-darkLight rounded-lg">
        <h1>Hello</h1>
      </main>
    </div>
  );
}

export default App;
