import PropTypes from 'prop-types';

import { TaskCard } from './TaskCard';

TaskBoard.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object)
};

export function TaskBoard({ boards }) {
  const displayColorByBoard = (boardName) => {
    switch (boardName) {
      case 'Backlog':
        return 'bg-[#70A3F3]';
      case 'In Progress':
        return 'bg-[#F3CE49]';
      case 'In Review':
        return 'bg-[#B787F5]';
      case 'Completed':
        return 'bg-[#77DB89]';
    }
  };

  return (
    <main className="my-3 mr-3 px-3 py-4 w-full flex items-start gap-3 dark:bg-darkLight bg-lightBlue rounded-xl">
      {boards.map((board) => (
        <div key={board.id} className="flex flex-col w-full">
          <div className="flex gap-2 items-center mb-5">
            <span className={`w-2 h-2 rounded-full ${displayColorByBoard(board.name)}`}></span>
            <h3 className="text-body-l font-medium">{board.name}</h3>
          </div>
          <ul className="flex flex-col gap-5">
            {board.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {/* Create Task Button on Backlog Board */}
            {board.name === 'Backlog' && (
              <button className="w-full px-3 py-2 flex items-center justify-between rounded-lg bg-lightBlue text-blue hover:bg-blue hover:text-lightBlue">
                <span>Add new task card</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </ul>
        </div>
      ))}
    </main>
  );
}
