import PropTypes from 'prop-types';

import { TaskCard } from './TaskCard';

TaskBoard.propTypes = {
  board: PropTypes.object,
  onMoveTask: PropTypes.func
};

const STAGES = ['Backlog', 'In Progress', 'In Review', 'Completed'];

export function TaskBoard({ board, onMoveTask }) {
  const displayColorByBoard = (stageName) => {
    switch (stageName) {
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
    const taskId = e.dataTransfer.getData('taskId');
    onMoveTask(taskId, targetStage);
  };

  const amountOfTasks = (stage) => {
    return board.tasks.filter((task) => task.stage === stage).length;
  };

  return (
    <main className="my-3 mr-3 px-3 py-4 w-full flex items-start gap-3 dark:bg-darkLight bg-lightBlue rounded-xl">
      {STAGES.map((stage) => (
        <div key={stage} className="flex flex-col w-full gap-5 h-full">
          <div className="flex items-center text-body-l font-medium">
            <span className={`w-2 h-2 rounded-full ${displayColorByBoard(stage)} mr-2`}></span>
            <h3>
              {stage}&nbsp;({amountOfTasks(stage)})
            </h3>
          </div>
          <ul
            className="flex flex-col gap-5 h-full"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              handleDrop(e, stage);
              e.currentTarget.classList.remove('dragging-over');
            }}
          >
            {/* Seach for each task stage and filter to render them*/}
            {board.tasks.length ? (
              board.tasks.filter((task) => task.stage === stage).map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <span className="text-body-l font-medium text-gray pt-2 pl-2">No Task</span>
            )}
            {stage === 'Backlog' && (
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
