import { validateTicketInput, validateTicketUpdate } from './validations.js';
import { TICKET_STATUS } from '../models/constants.js';
import { loadTickets, saveTickets } from '../storage/localAdapter.js';
import { delay } from '../utils/delay.js';

export function createTicket(rawData) {
  validateTicketInput(rawData);

  return {
    id: `tkt-${Math.random().toString(36).substring(2, 9)}`, 
    title: rawData.title.trim(),
    description: rawData.description.trim(),
    status: TICKET_STATUS.OPEN, 
    priority: rawData.priority,
    category: rawData.category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assignee: null
  };
}

/**
 * Updates an existing ticket with new values.
 */
export function updateTicket(existingTicket, updates) {
  validateTicketUpdate(updates);

  return {
    ...existingTicket,
    ...updates,
    updatedAt: new Date().toISOString()
  };
}

/**
 * Simulates fetching tickets from a remote server.
 */
export async function fetchAllTickets() {
  await delay(800); 
  
  if (Math.random() < 0.2) { // 20% chance to fail to show the error UI
    throw new Error("Network timeout: Could not reach the server.");
  }
  
  return loadTickets(); 
}

/**
 * Simulates saving the entire ticket array to a remote server.
 */
export async function persistTickets(tickets) {
  await delay(500); 
  saveTickets(tickets);
}