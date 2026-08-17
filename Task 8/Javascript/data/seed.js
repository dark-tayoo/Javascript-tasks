// js/data/seed.js
export const seedTasks = [
  {
    id: '1',
    title: 'Set up project structure',
    description: 'Create folders for utils, components, features, and storage.',
    status: 'completed',
    createdAt: Date.now() - 86400000
  },
  {
    id: '2',
    title: 'Implement ES6 Modules',
    description: 'Ensure app.js uses type="module".',
    status: 'pending',
    createdAt: Date.now()
  }
];