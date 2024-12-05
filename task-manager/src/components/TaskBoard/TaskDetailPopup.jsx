import PropTypes from 'prop-types';
import { useState } from 'react';

const TAG_COLORS = {
  Concept: 'bg-lightRed text-[#AA2E26]',
  Technical: 'bg-lightBlue text-blue',
  Design: 'bg-lightYellow text-gold',
  'Front-end': 'bg-lightGreen text-green'
};

export function TaskDetailsPopup({ task, onClose, onUpdateTask }) {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const handleClose = () => {
    onUpdateTask(editedTask);
    onClose();
  };

  const handleTaskChange = (changes) => {
    const updatedTask = { ...editedTask, ...changes };
    setEditedTask(updatedTask);
    onUpdateTask(updatedTask);
  };

  const handleImageActions = {
    add: async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=minimal&orientation=landscape`, {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
          }
        });
        const data = await response.json();
        handleTaskChange({ image: data.urls.regular });
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    },
    remove: () => handleTaskChange({ image: null })
  };

  const renderImageSection = () => (
    <div className="w-full mb-6 relative group rounded-xl overflow-hidden">
      {editedTask.image ? (
        <img src={editedTask.image} alt="task" className="w-full h-32 object-cover" />
      ) : (
        <div className="w-full h-32 bg-lightBlue dark:bg-darkLight flex items-center justify-center text-gray">
          No cover photo
        </div>
      )}
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
        <button onClick={handleImageActions.add} className="bg-blue p-3 rounded-full hover:bg-opacity-80">
          Random Cover
        </button>
        {editedTask.image && (
          <button onClick={handleImageActions.remove} className="bg-red p-3 rounded-full hover:bg-opacity-80">
            Remove
          </button>
        )}
      </div>
    </div>
  );

  const renderStatusDropdown = () => (
    <div className="absolute text-body-l top-full left-0 right-0 mt-2 p-2 rounded-xl bg-white dark:bg-black border border-lightBlue dark:border-darkLight flex flex-col gap-2 z-20">
      {['Backlog', 'In Progress', 'In Review', 'Completed'].map((status) => (
        <button
          key={status}
          onClick={() => {
            handleTaskChange({ stage: status });
            setIsStatusOpen(false);
          }}
          className={`w-full px-3 py-2 rounded text-left flex items-center gap-2 hover:bg-lightBlue hover:dark:bg-blue/20 ${
            editedTask.stage === status ? 'bg-blue/20 dark:bg-blue/50' : ''
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full ${
              status === 'Backlog'
                ? 'bg-blue'
                : status === 'In Progress'
                ? 'bg-yellow'
                : status === 'In Review'
                ? 'bg-violet'
                : 'bg-green'
            }`}
          ></span>
          {status}
        </button>
      ))}
    </div>
  );

  const renderTagsDropdown = () => (
    <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-white dark:bg-darkLight flex flex-col gap-2 z-20 shadow-lg">
      {Object.keys(TAG_COLORS).map((tag) => (
        <button
          key={tag}
          onClick={() => {
            const newTags = editedTask.tag.includes(tag)
              ? editedTask.tag.filter((t) => t !== tag)
              : [...editedTask.tag, tag];
            handleTaskChange({ tag: newTags });
          }}
          className={`w-full px-3 py-2 rounded-lg text-left ${TAG_COLORS[tag]}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/80 flex items-center justify-center backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-dark p-8 rounded-xl max-w-[520px] w-full shadow-lg dark:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-heading-l font-bold text-black dark:text-white">Task details</h3>
          <button onClick={handleClose} className="text-gray hover:text-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {renderImageSection()}

        <div className="flex flex-col gap-6">
          <div>
            <label className="text-gray mb-2 block">Task name</label>
            <input
              type="text"
              value={editedTask.description}
              onChange={(e) => handleTaskChange({ description: e.target.value })}
              className="w-full p-3 rounded-xl border-2 border-lightBlue dark:border-darkLight bg-transparent
                focus:border-blue dark:focus:border-blue text-black dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-gray mb-2 block">Status</label>
            <div className="relative">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className={`w-full p-3 rounded-xl border-2 ${
                  isStatusOpen ? 'border-blue' : 'border-lightBlue dark:border-darkLight'
                } flex items-center gap-2 text-black dark:text-white`}
              >
                <span className="w-4 h-4 rounded-full bg-blue"></span>
                {editedTask.stage}
              </button>
              {isStatusOpen && renderStatusDropdown()}
            </div>
          </div>

          <div>
            <label className="text-gray mb-2 block">Tags</label>
            <div className="relative">
              <button
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                className={`w-full p-3 rounded-xl border-2 ${
                  isTagsOpen ? 'border-blue' : 'border-lightBlue dark:border-darkLight'
                } flex gap-2 flex-wrap text-black dark:text-white`}
              >
                {editedTask.tag.length > 0 ? (
                  editedTask.tag.map((tag) => (
                    <span key={tag} className={`px-3 py-1 rounded ${TAG_COLORS[tag]}`}>
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray">Select tags...</span>
                )}
              </button>
              {isTagsOpen && renderTagsDropdown()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TaskDetailsPopup.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string,
    stage: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired
};
