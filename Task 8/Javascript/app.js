
import { initForm } from './features/taskForm.js';
import { renderTaskList } from './features/taskList.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the form listener
  initForm('add-task-form');
  
  // Render the initial task list
  renderTaskList('task-list');

  // Initialize Search & Filter inputs
  const searchInput = document.getElementById('search-input');
  const filterSelect = document.getElementById('status-filter');

  const handleFilterChange = () => {
    renderTaskList('task-list', filterSelect.value, searchInput.value);
  };

  searchInput.addEventListener('input', handleFilterChange);
  filterSelect.addEventListener('change', handleFilterChange);
});