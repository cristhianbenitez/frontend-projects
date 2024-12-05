import PropTypes from 'prop-types';
import { useState } from 'react';
import { TaskCard } from './TaskCard';

const STAGE_COLORS = {
  Backlog: 'bg-blue2',
  'In Progress': 'bg-yellow',
  'In Review': 'bg-violet',
  Completed: 'bg-green'
};

export function TaskColumn({ stage, tasks, onTaskClick, onDragOver, onDragLeave, onDrop, onAddTask }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const taskCount = tasks.length;

  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        description: newTaskText.trim(),
        tag: ['Concept'],
        stage: stage
      };
      onAddTask(newTask);
      setNewTaskText('');
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 h-full">
      <div className="flex items-center text-body-l font-medium">
        <span className={`w-2 h-2 rounded-full ${STAGE_COLORS[stage]} mr-2`}></span>
        <h3>
          {stage}&nbsp;({taskCount})
        </h3>
      </div>

      <ul
        className="flex flex-col gap-5 h-full"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, stage)}
      >
        {taskCount > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />)
        ) : (
          <span className="text-body-l font-medium text-gray pt-2 pl-2">No Task</span>
        )}

        {stage === 'Backlog' && (
          <>
            {isAdding ? (
              <form onSubmit={handleAddTask} className="flex flex-col gap-2">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Enter task description..."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-darkLight border-2 border-lightBlue dark:border-darkLight focus:border-blue outline-none"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button type="submit" className="px-3 py-1 rounded-lg bg-blue text-white hover:bg-opacity-80">
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setNewTaskText('');
                    }}
                    className="px-3 py-1 rounded-lg bg-gray text-white hover:bg-opacity-80"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full px-3 py-2 flex items-center justify-between rounded-lg bg-lightBlue text-blue hover:bg-blue hover:text-lightBlue text-body-l font-medium"
              >
                <span>Add new task card</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </>
        )}
      </ul>
    </div>
  );
}

TaskColumn.propTypes = {
  stage: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired
};
