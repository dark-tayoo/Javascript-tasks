console.log("Task 7: Expense Tracker App Initialized");
// --- 1. STATE ---
const appState = {
  transactions: [
   { id: "test-123",
      type: "income",
      description: "Test Salary",
      amount: 1000,
      category: "Salary",
      date: new Date().toISOString()
    }
  ],
  filters: {
    category: "all"
  }
};

// --- 2. DOM ELEMENTS ---
const form = document.getElementById('transaction-form');
const listContainer = document.getElementById('transaction-list');
const filterSelect = document.getElementById('category-filter');

// --- 3. INITIALIZATION & STORAGE ---
function loadState() {
  const savedData = localStorage.getItem('expenseTrackerData');
  
  if (!savedData) {
    appState.transactions = [];
    return;
  }

  try {
    const parsedData = JSON.parse(savedData);
    if (!Array.isArray(parsedData)) throw new Error("Storage is not an array");
    appState.transactions = parsedData;
  } catch (error) {
    console.error("Corrupt data found. Resetting state.", error);
    appState.transactions = [];
    localStorage.removeItem('expenseTrackerData');
  }
}

function saveState() {
  localStorage.setItem('expenseTrackerData', JSON.stringify(appState.transactions));
}

function initApp() {
  loadState();
  applyFilterAndRender();
  updateDashboard();
}

document.addEventListener('DOMContentLoaded', initApp);

// --- 4. CORE LOGIC (ADD & DELETE) ---
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const description = formData.get('description').trim();
  const amount = parseFloat(formData.get('amount'));
  
  // Validation
  if (description.length < 2 || isNaN(amount) || amount <= 0) {
    alert("Please provide a valid description and amount.");
    return;
  }

  // Fallback ID generator just in case crypto.randomUUID fails in local testing
  const generateId = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString();

  const newTransaction = {
    id: generateId(),
    type: formData.get('type'),
    description: description,
    amount: amount,
    category: formData.get('category'),
    date: new Date(formData.get('date')).toISOString()
  };

  // Update State
  appState.transactions.unshift(newTransaction);
  
  saveState();
  applyFilterAndRender();
  updateDashboard();
  
  form.reset();
});

// Must be a global function so the HTML string can call it via onclick
window.deleteItem = function(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    appState.transactions = appState.transactions.filter(t => t.id !== id);
    
    saveState();
    applyFilterAndRender();
    updateDashboard();
  }
};

// --- 5. FILTERING & RENDERING ---
filterSelect.addEventListener('change', function(event) {
  appState.filters.category = event.target.value;
  applyFilterAndRender();
});

function applyFilterAndRender() {
  let filteredList = appState.transactions;

  if (appState.filters.category !== 'all') {
    filteredList = appState.transactions.filter(
      t => t.category === appState.filters.category
    );
  }

  renderTransactions(filteredList);
}

function renderTransactions(transactionsArray) {
  listContainer.innerHTML = '';

  transactionsArray.forEach(transaction => {
    const isIncome = transaction.type === 'income';
    const sign = isIncome ? '+' : '-';
    const cssClass = isIncome ? 'income-item' : 'expense-item';
    const amountClass = isIncome ? 'income-amount' : 'expense-amount';
    const formattedDate = new Date(transaction.date).toLocaleDateString();

    const li = document.createElement('li');
    li.className = cssClass;
    li.dataset.id = transaction.id;

    li.innerHTML = `
      <div>
        <strong>${transaction.description}</strong>
        <span class="category-badge">${transaction.category}</span>
        <div style="font-size: 0.85rem; color: #666; margin-top: 4px;">${formattedDate}</div>
      </div>
      <div>
        <span class="${amountClass}">${sign}$${transaction.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="deleteItem('${transaction.id}')">Delete</button>
      </div>
    `;

    listContainer.appendChild(li);
  });
}

// --- 6. DASHBOARD MATH ---
function updateDashboard() {
  const transactions = appState.transactions;

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  document.getElementById('income-display').innerText = `$${totalIncome.toFixed(2)}`;
  document.getElementById('expense-display').innerText = `$${totalExpense.toFixed(2)}`;
  
  const sign = balance < 0 ? '-' : '';
  document.getElementById('balance-display').innerText = `${sign}$${Math.abs(balance).toFixed(2)}`;
}
