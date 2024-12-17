// Dynamically Update Username
document.getElementById('username').textContent = 'John Doe';

// Search Feature Interaction
const searchInput = document.querySelector('.feature input[type="text"]');
searchInput.addEventListener('input', () => {
  console.log(`Searching for: ${searchInput.value}`);
});

// Button Interaction
const exploreButton = document.querySelector('.feature button');
exploreButton.addEventListener('click', () => {
  alert('Explore More Coming Soon!');
});

// Expense Tracker Logic (Example)
let totalExpenses = 1230;
const expenseDisplay = document.querySelector('.expenses-section p');
function addExpense(amount) {
  totalExpenses += amount;
  expenseDisplay.textContent = `Total Spent: $${totalExpenses}`;
}
// Example: Add an expense of $100 after 2 seconds
setTimeout(() => addExpense(100), 2000);
