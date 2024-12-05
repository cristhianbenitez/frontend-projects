import { useState, useEffect } from 'react';
import { Sidebar } from '@components';
import { useTheme } from '@hooks/useTheme';
import { TaskBoard } from '@components';
import boardsData from '@data/boards.json';

function App() {
  const { theme, handleTheme } = useTheme();
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem('boards');
    return savedBoards ? JSON.parse(savedBoards) : boardsData;
  });

  const [currentBoard, setCurrentBoard] = useState(() => {
    const savedBoard = localStorage.getItem('currentBoard');
    return savedBoard || 'defaultBoard';
  });

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

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

  const handleUpdateTask = (updatedTaskOrBoard) => {
    setBoards((prevBoards) => {
      if (updatedTaskOrBoard.stage) {
        return {
          ...prevBoards,
          [currentBoard]: {
            ...prevBoards[currentBoard],
            tasks: prevBoards[currentBoard].tasks.map((task) =>
              task.id === updatedTaskOrBoard.id ? updatedTaskOrBoard : task
            )
          }
        };
      }
      return {
        ...prevBoards,
        [currentBoard]: updatedTaskOrBoard
      };
    });
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
      <TaskBoard board={boards[currentBoard]} onMoveTask={handleMoveTask} onUpdateTask={handleUpdateTask} />
    </>
  );
}

export default App;
