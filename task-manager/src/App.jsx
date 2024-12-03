import { useState } from 'react';
import { Sidebar } from '@components';
import { useTheme } from '@hooks/useTheme';
import { TaskBoard } from '@components';

const initialBoards = [
  {
    id: 1,
    stage: 'Backlog',
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
  { id: 2, stage: 'In Progress', tasks: [] },
  { id: 3, stage: 'In Review', tasks: [] },
  { id: 4, stage: 'Completed', tasks: [] }
];

function App() {
  const { theme, handleTheme } = useTheme();
  const [boards, setBoards] = useState(initialBoards);

  const handleMoveTask = (taskId, targetStage) => {
    setBoards(prevBoards => {
      // Find the task and its source board
      let task;
      const newBoards = prevBoards.map(board => {
        const taskIndex = board.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          task = board.tasks[taskIndex];
          return {
            ...board,
            tasks: board.tasks.filter(t => t.id !== taskId)
          };
        }
        return board;
      });

      // Add the task to the target board
      const targetBoard = newBoards.find(board => board.stage === targetStage);
      if (targetBoard && task) {
        targetBoard.tasks.push(task);
      }

      return newBoards;
    });
  };

  return (
    <>
      <Sidebar theme={theme} handleTheme={handleTheme} />
      <TaskBoard boards={boards} onMoveTask={handleMoveTask} />
    </>
  );
}

export default App;
