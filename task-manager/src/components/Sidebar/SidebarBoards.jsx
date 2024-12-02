import PropTypes from 'prop-types';

SidebarBoards.propTypes = {
  currentBoard: PropTypes.string,
  handleCurrentBoard: PropTypes.func,
  isOpen: PropTypes.bool
};

const boards = [
  { name: 'Simple Card Board', icon: '/artist.svg', id: 1 },
  { name: 'Frontend Board', icon: '/fix.svg', id: 2 }
];

export function SidebarBoards({ currentBoard, handleCurrentBoard, isOpen }) {
  return (
    <ul className="flex flex-col gap-3 w-ful">
      {boards.map((board) => (
        <li
          key={board.id}
          className={`sidebar-boards__item ${currentBoard === board.name ? 'border-blue' : ''} ${isOpen ? 'open' : ''}`}
          onClick={() => handleCurrentBoard(board.name)}
        >
          <img src={board.icon} alt="fix icon" className="max-w-8 max-h-8" />
          {isOpen && <span>{board.name}</span>}
        </li>
      ))}
    </ul>
  );
}
