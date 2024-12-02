import { useState } from 'react';

import { Sidebar } from '@components';
import { useTheme } from '@hooks/useTheme';

const initialBoards = [
  { id: 1, name: 'Backlog', tasks: [] },
  { id: 2, name: 'In Progress', tasks: [] },
  { id: 3, name: 'In Review', tasks: [] },
  { id: 4, name: 'Completed', tasks: [] }
];
function App() {
  const { theme, handleTheme } = useTheme();
  const [boards, setBoards] = useState(initialBoards);

  const displayColorByBoard = (boardName) => {
    switch (boardName) {
      case 'Backlog':
        return 'bg-[#70A3F3]';
      case 'In Progress':
        return 'bg-[#FF9F43]';
      case 'In Review':
        return 'bg-[#3662E3]';
      case 'Completed':
        return 'bg-[#B787F5]';
    }
  };

  return (
    <>
      <Sidebar theme={theme} handleTheme={handleTheme} />
      <main className="my-3 mr-3 px-3 py-4 w-full flex items-start justify-between dark:bg-darkLight bg-lightBlue rounded-xl">
        {boards.map((board) => (
          <div key={board.id} className="flex w-full">
            <div className="flex gap-2 items-center">
              <span className={`w-2 h-2 rounded-full ${displayColorByBoard(board.name)}`}></span>
              <h3>{board.name}</h3>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default App;
