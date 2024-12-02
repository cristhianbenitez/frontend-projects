import { useState } from 'react';
import { Sidebar } from '@components';
import { useTheme } from '@hooks/useTheme';
import { TaskBoard } from '@components';

const initialBoards = [
  {
    id: 1,
    name: 'Backlog',
    tasks: [
      { id: 1, tag: ['Concept'], description: 'Investigate Framer-Motion for animations.' },
      {
        id: 2,
        tag: ['Technical', 'Design'],
        description: 'Implement CRUD (Create, Read, Update, and Delete) operations',
        image: '/task-2.png'
      }
    ]
  },
  { id: 2, name: 'In Progress', tasks: [] },
  { id: 3, name: 'In Review', tasks: [] },
  { id: 4, name: 'Completed', tasks: [] }
];

function App() {
  const { theme, handleTheme } = useTheme();
  const [boards, setBoards] = useState(initialBoards);

  return (
    <>
      <Sidebar theme={theme} handleTheme={handleTheme} />
      <TaskBoard boards={boards} />
    </>
  );
}

export default App;
