import { useState } from 'react';
import PropTypes from 'prop-types';

import MenuIcon from '@assets/icons/menu.svg';
import CloseIcon from '@assets/icons/close.svg';

import { SidebarBoards } from './SidebarBoards';
import { SidebarThemeControl } from './SidebarThemeControl';

Sidebar.propTypes = {
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  currentBoard: PropTypes.string,
  onBoardChange: PropTypes.func,
  boards: PropTypes.object,
  onAddBoard: PropTypes.func
};

export function Sidebar({ theme, handleTheme, currentBoard, onBoardChange, boards, onAddBoard }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="flex flex-col w-full">
        <button
          className="p-3 ml-1 dark:bg-darkLight bg-lightBlue rounded-full mb-9 max-w-10 max-h-10 flex items-center justify-center"
          onClick={handleToggle}
        >
          {isOpen ? (
            <div className="w-6 h-6 object-cover">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div className="w-6 h-6 object-cover">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 12H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 17H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </button>

        <SidebarBoards
          isOpen={isOpen}
          currentBoard={currentBoard}
          handleCurrentBoard={onBoardChange}
          boards={boards}
          onAddBoard={onAddBoard}
        />
      </div>
      <SidebarThemeControl theme={theme} handleTheme={handleTheme} isOpen={isOpen} />
    </aside>
  );
}
