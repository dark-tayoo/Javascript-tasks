
import { seedTasks } from '../data/seed.js';

const STORAGE_KEY = 'task_manager_data';

export const getTasks = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    saveTasks(seedTasks);
    return seedTasks;
  }
  return JSON.parse(data);
};

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};