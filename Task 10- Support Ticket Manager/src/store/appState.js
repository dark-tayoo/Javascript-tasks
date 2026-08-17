export const state = {
  tickets: [], // This will eventually be loaded from storage
  
  // UI Controls
  searchQuery: "",
  filters: {
    status: null,
    category: null
  },
  sortBy: "createdAt",
  sortOrder: "desc",
  
  // Which ticket is currently open in the "Details" modal/view?
  selectedTicketId: null 
};