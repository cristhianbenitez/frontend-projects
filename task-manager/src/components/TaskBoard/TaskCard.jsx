import PropTypes from 'prop-types';

const TAG_COLORS = {
  Concept: 'bg-lightRed text-red',
  Technical: 'bg-lightBlue text-blue',
  Design: 'bg-lightYellow text-gold',
  'Front-end': 'bg-lightGreen text-green'
};

export function TaskCard({ task }) {
  return (
    <li
      draggable="true"
      onDragStart={(e) => e.dataTransfer.setData('taskId', task.id.toString())}
      className="flex flex-col items-start p-3 rounded-lg bg-whiteCream dark:bg-dark cursor-pointer"
    >
      {task.image && <img src={task.image} alt="task-image" className="w-full h-full rounded-lg object-cover mb-3" />}

      <p className="text-body-l font-medium tracking-[-0.035em] mb-3">{task.description}</p>

      <div className="flex gap-2">
        {task.tag.map((tag) => (
          <span key={tag} className={`text-caption font-medium px-1 py-0.5 rounded ${TAG_COLORS[tag]}`}>
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string
  }).isRequired
};
