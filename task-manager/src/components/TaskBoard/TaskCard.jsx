import PropTypes from 'prop-types';

TaskCard.propTypes = {
  task: PropTypes.object
};

export function TaskCard({ task }) {
  const tagColor = (tag) => {
    switch (tag) {
      case 'Concept':
        return 'bg-lightRed text-red';
      case 'Technical':
        return 'bg-lightYellow text-gold';
      case 'Design':
        return 'bg-lightBlue text-blue';
    }
  };
  return (
    <li className="flex flex-col items-start p-3 rounded-lg bg-whiteCream dark:bg-dark cursor-pointer">
      {task.image && <img src={task.image} alt="task-image" className="w-full h-full rounded-lg object-cover mb-3" />}
      <p className="text-body-l font-medium tracking-[-0.035em] mb-3">{task.description}</p>
      <div className="flex gap-2">
        {task.tag.map((tag) => (
          <span key={tag} className={`text-body-m  px-1 py-0.5 rounded-md ${tagColor(tag)}`}>
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}
