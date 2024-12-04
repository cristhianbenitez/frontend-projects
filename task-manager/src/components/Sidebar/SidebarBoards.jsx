import AddIcon from '@assets/icons/add-white.svg';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NewBoardPopup } from './NewBoardPopup';

SidebarBoards.propTypes = {
  currentBoard: PropTypes.string,
  handleCurrentBoard: PropTypes.func,
  isOpen: PropTypes.bool
};

export function SidebarBoards({ currentBoard, handleCurrentBoard, isOpen, boards }) {
  const [showNewBoardPopup, setShowNewBoardPopup] = useState(false);
  const [availableIcons, setAvailableIcons] = useState([]);

  useEffect(() => {
    // Keep this to load available icons for the popup
    const icons = Object.keys(import.meta.glob('/public/board-icons/*.svg', { eager: true })).map((path) =>
      path.replace('/public/', '')
    );
    setAvailableIcons(icons);
  }, []);

  const handleAddNewBoard = ({ name, icon }) => {
    const newBoardId = `board-${Date.now()}`;
    const newBoard = {
      id: Object.keys(boards).length + 1,
      name,
      icon,
      tasks: [
        {
          id: 1,
          tag: ['Concept'],
          description: 'Default Task',
          stage: 'Backlog'
        }
      ]
    };

    // Add the new board to the boards object
    boards[newBoardId] = newBoard;
    setShowNewBoardPopup(false);
  };

  return (
    <>
      <ul className="flex flex-col gap-3 w-ful">
        {Object.entries(boards).map(([boardId, board]) => (
          <li
            key={board.id}
            className={`sidebar-boards__item ${currentBoard === boardId ? 'border-blue' : ''} ${isOpen ? 'open' : ''}`}
            onClick={() => handleCurrentBoard(boardId)}
          >
            <img src={board.icon} alt={`${board.name} icon`} className="max-w-8 max-h-8" />
            {isOpen && <span>{board.name}</span>}
          </li>
        ))}
        <li className={`sidebar-boards__item ${isOpen ? 'open' : ''}`} onClick={() => setShowNewBoardPopup(true)}>
          <img src={AddIcon} alt="fix icon" className="max-w-8 max-h-8" />
          {isOpen && <span>Add new board</span>}
        </li>
      </ul>

      {showNewBoardPopup && (
        <NewBoardPopup
          onClose={() => setShowNewBoardPopup(false)}
          handleAddNewBoard={handleAddNewBoard}
          availableIcons={availableIcons}
        />
      )}
    </>
  );
}
