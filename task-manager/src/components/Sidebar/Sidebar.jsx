import { useState } from 'react';
import PropTypes from 'prop-types';

import MenuIcon from '@assets/icons/menu.svg';
import CloseIcon from '@assets/icons/close.svg';

import { SidebarBoards } from './SidebarBoards';
import { SidebarThemeControl } from './SidebarThemeControl';

Sidebar.propTypes = {
  theme: PropTypes.string,
  handleTheme: PropTypes.func
};

export function Sidebar({ theme, handleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBoard, setCurrentBoard] = useState('Frontend Board');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCurrentBoard = (board) => {
    setCurrentBoard(board);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="flex flex-col w-full">
        <button
          className="p-3 ml-1 dark:bg-darkLight bg-lightBlue rounded-full mb-9 max-w-10 max-h-10 flex items-center justify-center"
          onClick={handleToggle}
        >
          {isOpen ? (
            <img src={CloseIcon} alt="close" className="w-6 h-6 object-cover" />
          ) : (
            <img src={MenuIcon} alt="menu" className="w-6 h-6 object-cover" />
          )}
        </button>

        <SidebarBoards isOpen={isOpen} currentBoard={currentBoard} handleCurrentBoard={handleCurrentBoard} />
      </div>
      <SidebarThemeControl theme={theme} handleTheme={handleTheme} isOpen={isOpen} />
    </aside>
  );
}
