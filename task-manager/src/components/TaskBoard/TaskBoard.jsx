import { useState } from 'react';
import PropTypes from 'prop-types';

import { TaskDetailsPopup } from './TaskDetailPopup';
import { TaskColumn } from './TaskColumn';

const STAGES = ['Backlog', 'In Progress', 'In Review', 'Completed'];

export function TaskBoard({ board, onMoveTask, onUpdateTask }) {
  const [selectedTask, setSelectedTask] = useState(null);

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

  const handleUpdateTask = (updatedTask) => {
    onUpdateTask(updatedTask);
    setSelectedTask(updatedTask);
  };

  const handleAddTask = (newTask) => {
    onUpdateTask({
      ...board,
      tasks: [...board.tasks, newTask]
    });
  };

  return (
    <main className="my-3 mr-3 px-3 py-4 w-full dark:bg-darkLight overflow-y-auto bg-lightBlue rounded-xl">
      <div className="flex gap-3 min-w-[1000px] h-full">
        {STAGES.map((stage) => (
          <TaskColumn
            key={stage}
            stage={stage}
            tasks={getTasksByStage(board.tasks, stage)}
            onTaskClick={setSelectedTask}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onAddTask={handleAddTask}
          />
        ))}

        {selectedTask && (
          <TaskDetailsPopup task={selectedTask} onClose={() => setSelectedTask(null)} onUpdateTask={handleUpdateTask} />
        )}
      </div>
    </main>
  );
}

TaskBoard.propTypes = {
  board: PropTypes.object.isRequired,
  onMoveTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired
};
