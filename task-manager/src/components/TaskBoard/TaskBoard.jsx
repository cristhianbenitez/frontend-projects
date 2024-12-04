import PropTypes from 'prop-types';
import { TaskCard } from './TaskCard';

const STAGES = ['Backlog', 'In Progress', 'In Review', 'Completed'];

const STAGE_COLORS = {
  Backlog: 'bg-[#70A3F3]',
  'In Progress': 'bg-[#F3CE49]',
  'In Review': 'bg-[#B787F5]',
  Completed: 'bg-[#77DB89]'
};

export function TaskBoard({ board, onMoveTask }) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragging-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragging-over');
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    onMoveTask(taskId, targetStage);
    e.currentTarget.classList.remove('dragging-over');
  };

  const getTasksByStage = (tasks, stage) => tasks.filter((task) => task.stage === stage);

  return (
    <main className="my-3 mr-3 px-3 py-4 w-full flex items-start gap-3 dark:bg-darkLight bg-lightBlue rounded-xl">
      {STAGES.map((stage) => {
        const stageTasks = getTasksByStage(board.tasks, stage);
        const taskCount = stageTasks.length;

        return (
          <div key={stage} className="flex flex-col w-full gap-5 h-full">
            <div className="flex items-center text-body-l font-medium">
              <span className={`w-2 h-2 rounded-full ${STAGE_COLORS[stage]} mr-2`}></span>
              <h3>
                {stage}&nbsp;({taskCount})
              </h3>
            </div>

            <ul
              className="flex flex-col gap-5 h-full"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              {taskCount > 0 ? (
                stageTasks.map((task) => <TaskCard key={task.id} task={task} />)
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
        );
      })}
    </main>
  );
}

TaskBoard.propTypes = {
  board: PropTypes.object,
  onMoveTask: PropTypes.func
};
