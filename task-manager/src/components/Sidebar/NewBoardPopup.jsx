import { useState } from 'react';
import PropTypes from 'prop-types';

export function NewBoardPopup({ onClose, handleAddNewBoard, availableIcons }) {
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardIcon, setNewBoardIcon] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddNewBoard({ name: newBoardName, icon: newBoardIcon });
  };

  const isIconSelected = (icon) => {
    return newBoardIcon === icon ? 'border-blue' : 'border-transparent';
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 dark:bg-black/90 flex items-center justify-center backdrop-blur-sm" onClick={handleClickOutside}>
      <div className="bg-white dark:bg-dark p-8 pt-6 rounded-lg max-w-[520px] w-full shadow-lg dark:shadow-none">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-heading-l font-bold text-black dark:text-white">New Board</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray hover:text-blue"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="boardName" className="text-body-m font-medium text-gray">
              Board Name
            </label>
            <input
              type="text"
              name="boardName"
              placeholder="e.g: Default Board"
              className="block w-full mb-3 p-2 rounded text-black dark:text-white bg-transparent border-2 border-lightBlue dark:border-darkLight focus:border-blue outline-none"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="boardIcon" className="text-body-m font-medium text-gray">
              Board Icon
            </label>
            <div className="flex flex-wrap gap-4">
              {availableIcons.map((icon) => (
                <div
                  key={icon}
                  className={`w-10 h-10 rounded-full border-2 hover:border-blue cursor-pointer flex items-center justify-center bg-white dark:bg-darkLight ${isIconSelected(
                    icon
                  )}`}
                  onClick={() => setNewBoardIcon(icon)}
                >
                  <img src={`/${icon}`} alt="icon" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 flex items-center gap-4 text-white rounded-full border border-blue bg-blue text-body-l hover:border-white hover:bg-white hover:text-black dark:hover:bg-dark dark:hover:text-white"
            >
              Create Board
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray rounded-full text-body-l text-gray hover:border-blue hover:text-blue"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NewBoardPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleAddNewBoard: PropTypes.func.isRequired,
  availableIcons: PropTypes.arrayOf(PropTypes.string).isRequired
};
