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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z"
              fill="currentColor"
            />
          </svg>

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
