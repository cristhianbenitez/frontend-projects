import FixIcon from '@assets/icons/fix.svg';
import PropTypes from 'prop-types';

SidebarBoards.propTypes = {
  currentBoard: PropTypes.string,
  handleCurrentBoard: PropTypes.func,
  isOpen: PropTypes.bool
};

export function SidebarBoards({ currentBoard, handleCurrentBoard, isOpen }) {
  return (
    <ul className="flex flex-col gap-3 w-full text-white">
      <li
        className={`sidebar-boards__item ${currentBoard === 'Simple Card Board' ? 'border-blue' : ''} ${
          isOpen ? 'open' : ''
        }`}
        onClick={() => handleCurrentBoard('Simple Card Board')}
      >
        <img src={FixIcon} alt="fix icon" className="max-w-8 max-h-8" />
        {isOpen && <span>Simple Card Board</span>}
      </li>
      <li
        className={`sidebar-boards__item ${currentBoard === 'Frontend Board' ? 'border-blue' : ''} ${
          isOpen ? 'open' : ''
        }`}
        onClick={() => handleCurrentBoard('Frontend Board')}
      >
        <img src={FixIcon} alt="fix icon" className="max-w-8 max-h-8" />
        {isOpen && <span>Frontend Board</span>}
      </li>
    </ul>
  );
}
