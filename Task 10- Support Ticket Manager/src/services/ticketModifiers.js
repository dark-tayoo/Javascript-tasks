// src/services/ticketModifiers.js

/**
 * Filters and searches the ticket array.
 * @param {Array} tickets - The raw array of tickets.
 * @param {Object} filters - e.g., { status: 'open', category: null }
 * @param {string} searchQuery - Text typed into a search bar.
 */
export function filterAndSearchTickets(tickets, filters, searchQuery = "") {
  return tickets.filter(ticket => {
    // 1. Check Status Filter
    if (filters.status && ticket.status !== filters.status) return false;
    
    // 2. Check Category Filter
    if (filters.category && ticket.category !== filters.category) return false;
    
    // 3. Check Search Query (checks title and description)
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const matchesTitle = ticket.title.toLowerCase().includes(lowerQuery);
      const matchesDesc = ticket.description.toLowerCase().includes(lowerQuery);
      if (!matchesTitle && !matchesDesc) return false;
    }
    
    return true; // Keep the ticket if it passes all checks
  });
}

/**
 * Sorts the ticket array.
 * @param {Array} tickets - The array of tickets (usually already filtered).
 * @param {string} sortBy - 'createdAt' or 'priority'
 * @param {string} sortOrder - 'asc' or 'desc'
 */
export function sortTickets(tickets, sortBy, sortOrder) {
  // Use .toSorted() or copy the array with [...tickets] to avoid mutating the original
  return [...tickets].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    // Handle priority sorting explicitly since it's categorical, not alphabetical
    if (sortBy === 'priority') {
      const priorityWeight = { low: 1, medium: 2, high: 3, urgent: 4 };
      valueA = priorityWeight[a.priority];
      valueB = priorityWeight[b.priority];
    }

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
}