import { useState, useEffect } from 'react';
import { Sidebar } from '@components';
import { useTheme } from '@hooks/useTheme';
import { TaskBoard } from '@components';
import boardsData from '@data/boards.json';

function App() {
  const { theme, handleTheme } = useTheme();
  const [boards, setBoards] = useState(() => {
    // Load boards from localStorage or use default boardsData
    const savedBoards = localStorage.getItem('boards');
    return savedBoards ? JSON.parse(savedBoards) : boardsData;
  });

  const [currentBoard, setCurrentBoard] = useState(() => {
    // Load currentBoard from localStorage or use default
    const savedCurrentBoard = localStorage.getItem('currentBoard');
    return savedCurrentBoard || 'frontend';
  });

  // Save boards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  // Save currentBoard to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentBoard', currentBoard);
  }, [currentBoard]);

  const handleMoveTask = (taskId, newStage) => {
    setBoards((prevBoards) => ({
      ...prevBoards,
      [currentBoard]: {
        ...prevBoards[currentBoard],
        tasks: prevBoards[currentBoard].tasks.map((task) =>
          task.id.toString() === taskId.toString() ? { ...task, stage: newStage } : task
        )
      }
    }));
  };

  const handleAddNewBoard = ({ name, icon }) => {
    const boardId = name.toLowerCase().replace(/ /g, '');
    const uniqueId = `board_${Date.now()}`;
    setBoards((prevBoards) => ({
      ...prevBoards,
      [boardId]: {
        id: uniqueId,
        name: name,
        icon: icon,
        tasks: []
      }
    }));
    setCurrentBoard(boardId);
  };

  return (
    <>
      <Sidebar
        theme={theme}
        handleTheme={handleTheme}
        currentBoard={currentBoard}
        onBoardChange={setCurrentBoard}
        onAddBoard={handleAddNewBoard}
        boards={boards}
      />
      <TaskBoard board={boards[currentBoard]} onMoveTask={handleMoveTask} />
    </>
  );
}

export default App;
