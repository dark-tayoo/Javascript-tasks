
// src/ui/app.js

import { state } from '/src/store/appState.js';
import { fetchAllTickets, persistTickets, createTicket, updateTicket } from '/src/services/ticketService.js';
import { filterAndSearchTickets, sortTickets } from '/src/services/ticketModifiers.js';

/**
 * 1. INITIALIZATION & DATA FETCHING
 */
export async function initApp() {
  // Enter Loading State
  state.isLoading = true;
  state.error = null;
  renderUI(); 

  try {
    const savedData = await fetchAllTickets();
    state.tickets = savedData;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.isLoading = false;
    renderUI();
  }
}

window.retryFetch = function() {
  initApp();
}

/**
 * 2. THE CORE RENDER LOOP
 */
export function renderUI() {
  const container = document.getElementById('ticket-list');
  
  // STATE 1: Loading
  if (state.isLoading) {
    container.innerHTML = `
      <div class="loading-state">
        <span class="spinner"></span> Loading tickets...
      </div>
    `;
    return; 
  }

  // STATE 2: Error
  if (state.error) {
    container.innerHTML = `
      <div class="error-state">
        <h3>Oops, something went wrong!</h3>
        <p>${state.error}</p>
        <button onclick="retryFetch()">Try Again</button>
      </div>
    `;
    return;
  }

  // Calculate Derived Data
  const filtered = filterAndSearchTickets(state.tickets, state.filters, state.searchQuery);
  const displayTickets = sortTickets(filtered, state.sortBy, state.sortOrder);

  // STATE 3: Empty
  if (displayTickets.length === 0) {
    const message = state.searchQuery 
      ? `No tickets match "${state.searchQuery}".` 
      : "No tickets found. You're all caught up!";
      
    container.innerHTML = `
      <div class="empty-state">
        <p>${message}</p>
      </div>
    `;
    return;
  }

  // STATE 4: Success
  container.innerHTML = ''; 
  displayTickets.forEach(ticket => {
    const card = document.createElement('div');
    card.className = 'ticket-card';
    card.innerHTML = `
      <h3>${ticket.title}</h3>
      <div class="badge-container">
        <span class="badge ${ticket.status}">${ticket.status}</span>
        <span class="badge ${ticket.priority}">${ticket.priority}</span>
      </div>
      <p style="color: #6b7280; font-size: 0.875rem; margin: 0.5rem 0;">${ticket.description}</p>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button class="btn-primary" onclick="openTicketDetails('${ticket.id}')">View Details</button>
        <button onclick="changeTicketStatus('${ticket.id}', 'resolved')">Mark Resolved</button>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * 3. UI ACTIONS & EVENT LISTENERS
 */
window.openTicketDetails = function(ticketId) {
  state.selectedTicketId = ticketId;
  const ticket = state.tickets.find(t => t.id === ticketId);
  if (ticket) {
    alert(`Title: ${ticket.title}\nDescription: ${ticket.description}`);
  }
}

window.changeTicketStatus = async function(ticketId, newStatus) {
  try {
    const ticketIndex = state.tickets.findIndex(t => t.id === ticketId);
    if (ticketIndex === -1) throw new Error("Ticket not found.");

    const targetTicket = state.tickets[ticketIndex];
    state.tickets[ticketIndex] = updateTicket(targetTicket, { status: newStatus });
    
    renderUI(); // Optimistic render

    await persistTickets(state.tickets); // Save to storage

  } catch (error) {
    alert(`Failed to update ticket: ${error.message}`);
  }
}

// Listen for form submissions to create new tickets
document.getElementById('create-ticket-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page refresh

  const rawData = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    priority: document.getElementById('priority').value,
    category: document.getElementById('category').value
  };

  try {
    const newTicket = createTicket(rawData);
    
    // Add to state and re-render
    state.tickets.push(newTicket);
    renderUI();

    // Clear the form
    e.target.reset();

    // Save to storage
    await persistTickets(state.tickets);
    
  } catch (error) {
    alert(`Failed to create ticket: ${error.message}`);
  }
});

// Listen for search input changes
document.getElementById('search').addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  renderUI();
});

// Listen for filter changes
document.getElementById('filter-status').addEventListener('change', (e) => {
  state.filters.status = e.target.value || null;
  renderUI();
});

// Start the app!
initApp();