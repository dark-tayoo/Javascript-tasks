export const createTaskElement = (task) => {
  const isCompleted = task.status === 'completed';
  
  return `
    <li class="task-item ${isCompleted ? 'completed' : ''}" data-id="${task.id}">
      <div class="task-content">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
      </div>
      <div class="task-actions">
        <button class="toggle-btn">${isCompleted ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    </li>
  `;
};


