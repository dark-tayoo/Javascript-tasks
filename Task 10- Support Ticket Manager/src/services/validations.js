// src/services/validation.js

import { ValidationError } from './errors.js';
import { TICKET_PRIORITY, TICKET_CATEGORY } from '../models/constants.js';
import { TICKET_STATUS } from '../models/constants.js';

/**
 * Validates the raw input from the UI before creating a ticket.
 * @param {Object} data - The raw form data.
 */
export function validateTicketInput(data) {
  if (!data.title || data.title.trim().length < 5) {
    throw new ValidationError("Title must be at least 5 characters long.");
  }
  
  if (!data.description || data.description.trim().length < 10) {
    throw new ValidationError("Description must be at least 10 characters long.");
  }
  
  // Ensure the priority and category match our strictly defined constants
  if (!Object.values(TICKET_PRIORITY).includes(data.priority)) {
    throw new ValidationError("Invalid priority level selected.");
  }
  
  if (!Object.values(TICKET_CATEGORY).includes(data.category)) {
    throw new ValidationError("Invalid category selected.");
  }

  return true;
}

;


export function validateTicketUpdate(updates) {
  if (updates.status && !Object.values(TICKET_STATUS).includes(updates.status)) {
    throw new ValidationError("Invalid status provided.");
  }

  if (updates.priority && !Object.values(TICKET_PRIORITY).includes(updates.priority)) {
    throw new ValidationError("Invalid priority provided.");
  }
  
  // You could add rules here, e.g., preventing a CLOSED ticket from being reopened
}