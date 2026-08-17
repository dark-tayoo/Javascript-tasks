// src/storage/localAdapter.js

// We use a unique key so we don't accidentally overwrite data from other websites
const STORAGE_KEY = 'support_ticket_data_v1';

/**
 * Saves the full array of tickets to the browser's local storage.
 * @param {Array} tickets - The array of ticket objects to save.
 */
export function saveTickets(tickets) {
  try {
    // Convert the JavaScript array into a JSON string
    const serializedData = JSON.stringify(tickets);
    
    // Save the string to the browser
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (error) {
    // If the browser storage is full, this prevents the app from crashing
    console.error("Failed to save data to localStorage:", error);
  }
}

/**
 * Loads the tickets from the browser's local storage.
 * @returns {Array} The parsed array of tickets, or an empty array if none exist.
 */
export function loadTickets() {
  try {
    // Retrieve the string from the browser
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    // If it's the user's first time here, there is no data. Return an empty array.
    if (serializedData === null) {
      return [];
    }

    // Convert the JSON string back into a JavaScript array
    return JSON.parse(serializedData);
  } catch (error) {
    // If the data was corrupted, return an empty array safely
    console.error("Failed to parse data from localStorage:", error);
    return [];
  }
}