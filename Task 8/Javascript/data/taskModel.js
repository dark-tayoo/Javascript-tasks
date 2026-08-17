export const createTask = (title, description) => {
  return {
    id: Date.now().toString(),
    title: title.trim(),
    description: description.trim(),
    status: 'pending',
    createdAt: Date.now()
  };
};