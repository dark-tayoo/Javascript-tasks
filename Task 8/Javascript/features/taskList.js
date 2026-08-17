// js/features/taskList.js
import { getTasks, saveTasks } from '../storage/store.js';
import { filterTasks } from '../utils.js/filters.js';
import { createTaskElement } from '../component/taskItem.js';

let currentTasks = getTasks();

export const renderTaskList = (containerId, status = 'all', search = '') => {
  const container = document.getElementById(containerId);
  const filtered = filterTasks(currentTasks, status, search);
  
  container.innerHTML = filtered.map(createTaskElement).join('');
  attachListListeners(container);
};

const attachListListeners = (container) => {
  container.addEventListener('click', (e) => {
    const taskEl = e.target.closest('.task-item');
    if (!taskEl) return;
    
    const taskId = taskEl.dataset.id;

    if (e.target.classList.contains('toggle-btn')) {
      toggleTaskStatus(taskId);
    } else if (e.target.classList.contains('delete-btn')) {
      deleteTask(taskId);
    }
  });
};

const toggleTaskStatus = (id) => {
  currentTasks = currentTasks.map(task => 
    task.id === id ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : task
  );
  saveTasks(currentTasks);
  renderTaskList('task-list'); // Re-render
};

const deleteTask = (id) => {
  currentTasks = currentTasks.filter(task => task.id !== id);
  saveTasks(currentTasks);
  renderTaskList('task-list');
};

export const addTask = (newTask) => {
  currentTasks.push(newTask);
  saveTasks(currentTasks);
  renderTaskList('task-list');
};