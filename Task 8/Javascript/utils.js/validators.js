export const isValidTask = (title) => {
  return typeof title === 'string' && title.trim().length > 0};