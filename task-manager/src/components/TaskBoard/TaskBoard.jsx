import PropTypes from 'prop-types';

import { TaskCard } from './TaskCard';

TaskBoard.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.object),
  onMoveTask: PropTypes.func
};

export function TaskBoard({ boards, onMoveTask }) {
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

  const handleDragOver = (e) => {
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.add('dragging-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.remove('dragging-over');
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    onMoveTask(taskId, targetStage);
  };

  return (
    <main
      id="task-board"
      className="my-3 mr-3 px-3 py-4 w-full flex items-start gap-3 dark:bg-darkLight bg-lightBlue rounded-xl"
    >
      {boards.map((board) => (
        <div key={board.id} className="flex flex-col w-full gap-5 h-full">
          <div className="flex gap-2 items-center">
            <span className={`w-2 h-2 rounded-full ${displayColorByBoard(board.stage)}`}></span>
            <h3 className="text-body-l font-medium">{board.stage}</h3>
          </div>
          <ul
            className="flex flex-col gap-5 h-full"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              handleDrop(e, board.stage);
              e.currentTarget.classList.remove('dragging-over');
            }}
          >
            {board.tasks.length ? (
              board.tasks.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <span
                className={`text-body-l font-medium text-gray pt-2 pl-2 ${boards.length === 1 ? 'min-h-[100px]' : ''}`}
              >
                No Task
              </span>
            )}
            {board.stage === 'Backlog' && (
              <button className="w-full px-3 py-2 flex items-center justify-between rounded-lg bg-lightBlue text-blue hover:bg-blue hover:text-lightBlue text-body-l font-medium">
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
