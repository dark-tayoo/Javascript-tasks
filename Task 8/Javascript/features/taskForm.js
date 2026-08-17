// js/features/taskForm.js
import { isValidTask } from '../utils.js/validators.js';
import { addTask } from './taskList.js';

export const initForm = (formId) => {
  const form = document.getElementById(formId);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = form.querySelector('#task-title').value;
    const description = form.querySelector('#task-desc').value;
    
    if (!isValidTask(title)) {
      alert('Task title is required.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: 'pending',
      createdAt: Date.now()
    };

    addTask(newTask);
    form.reset();
  });
};