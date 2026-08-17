// src/models/ticketModel.js

import { TICKET_STATUS, TICKET_PRIORITY, TICKET_CATEGORY } from './constants.js';

/**
 * The shape of a Support Ticket object
 * 
 * @typedef {Object} Ticket
 * @property {string} id - A unique identifier (e.g., a UUID).
 * @property {string} title - A short, descriptive summary of the issue.
 * @property {string} description - The full details of the ticket.
 * @property {string} status - Must be a value from TICKET_STATUS.
 * @property {string} priority - Must be a value from TICKET_PRIORITY.
 * @property {string} category - Must be a value from TICKET_CATEGORY.
 * @property {string} createdAt - ISO 8601 Date string.
 * @property {string} updatedAt - ISO 8601 Date string.
 * @property {string|null} assignee - (Optional) Name or ID of the staff member.
 */

// This is just a reference object to show what a perfect ticket looks like during development
export const exampleTicket = {
  id: "tkt-9f8a7b6c",
  title: "Cannot access the billing dashboard",
  description: "When I click on the billing tab, I get a 404 error page.",
  status: TICKET_STATUS.OPEN,
  priority: TICKET_PRIORITY.HIGH,
  category: TICKET_CATEGORY.BILLING,
  createdAt: "2026-08-12T10:00:00Z",
  updatedAt: "2026-08-12T10:00:00Z",
  assignee: null
};