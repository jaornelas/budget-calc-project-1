//Data Storage
let income = 0;
let expenses = [];
let totalExpenses = 0;
const form = document.querySelector('form');

window.onload = function() {
    localStorage.clear();
}

function submitName() {
    const userName = document.getElementById('userName').value;

    if (userName.trim() === "") {
        alert("Please enter a valid name.");
        return;
    }

    // Hide the modal and show the main content
    document.getElementById('userModal').style.display = 'none';
    document.getElementById('content').style.display = 'block';

    // Optionally, display a welcome message using the entered name
    alert("Welcome, " + userName + "!");
}

// Add Expense
function addExpense(category, amount) {
    expenses.push({ category, amount: parseFloat(amount) });
    totalExpenses += parseFloat(amount);
    updateSummary();
    updatePieChart();
};

// Update Summary
function updateSummary() {
    const balance = income - totalExpenses;
    document.getElementById("totalIncome").innerText = `$${income.toFixed(2)}`;
    document.getElementById("totalExpenses").innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
};

// Update Expense Chart
// Retrieve data from local storage
document.addEventListener('DOMContentLoaded', () => {
    const budgetForm = document.getElementById('budget-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const updateChartButton = document.querySelector('button[onclick="updateChart()"]');
    const ctx = document.getElementById('myChart').getContext('2d');
  
    let expenseData = JSON.parse(localStorage.getItem('expenses')) || {
      Housing: 0,
      Transportation: 0,
      Utilities: 0,
      Entertainment: 0,
      Grocery: 0,
      Other: 0,
    };
  
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(expenseData),
        datasets: [
          {
            label: 'Expenses',
            data: Object.values(expenseData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  
    // Initialize list and chart
    renderExpenseList();
    updateChart();
    updateTotal();
  
    // Handle form submission
    budgetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const expenseName = document.getElementById('expense-name').value;
      const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
  
      if (expenseAmount > 0) {
        // Update expense data
        expenseData[expenseName] += expenseAmount;
        saveToLocalStorage();
        updateTotal();
        updateChart();
        renderExpenseList();
      } else {
        alert('Please enter a valid expense amount.');
      }
      budgetForm.reset();
    });
  
    // Add event listener for Update Chart button
    updateChartButton.addEventListener('click', () => {
      const category = document.getElementById('category').value;
      const amount = parseFloat(document.getElementById('amount').value);
  
      if (!isNaN(amount) && amount >= 0) {
        expenseData[category] = amount; // Update data for the selected category
        saveToLocalStorage();
        updateChart(); // Refresh the chart
        updateTotal(); // Update total
        renderExpenseList(); // Refresh the list
        alert('Chart updated successfully!');
      } else {
        alert('Please enter a valid amount.');
      }
    });
  
    // Render expense list
    function renderExpenseList() {
      expenseList.innerHTML = '';
      Object.keys(expenseData).forEach((category) => {
        if (expenseData[category] > 0) {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            ${category}: $${expenseData[category].toFixed(2)} 
          `;
          expenseList.appendChild(listItem);
        }
      });
    }
  
    // Update the chart
    function updateChart() {
      myChart.data.datasets[0].data = Object.values(expenseData);
      myChart.update();
    }
  
    // Update the total amount
    function updateTotal() {
      const total = Object.values(expenseData).reduce((sum, value) => sum + value, 0);
      totalAmount.textContent = `$${total.toFixed(2)}`;
    }
  
    // Save data to localStorage
    function saveToLocalStorage() {
      localStorage.setItem('expenses', JSON.stringify(expenseData));
    }
  });

//store local values when submit button is clicked
const handleAddExpense = function(event) {
    event.preventDefault();
    
    const expenseName = document.querySelector('#expense-name').value;
    const amount = document.querySelector('#expense-amount').value;

    // if (!expenseName || !amount) {    
    //     alert("Please complete the form."); //display error
    //     return;
    // }

    let expense = {
        expenseName: expenseName, 
        amount: parseFloat(amount)
    };

    localStorage.setItem('expense', JSON.stringify(expense));
    displayExpense(expense);
}

//append the locally stored values to the page
const displayExpense = function(expense) {
    const li = document.createElement("li");
    const expenseDisplay = document.createElement("h3");
    expenseDisplay.innerText = `${expense.expenseName}: $${expense.amount.toFixed(2)}`;

    li.appendChild(expenseDisplay);
    document.getElementById("expense-list").appendChild(expenseDisplay);
}

    document.addEventListener('DOMContentLoaded', function() {
    const storedExpense = localStorage.getItem('expense');

    if (storedExpense) {
        const expense = JSON.parse(storedExpense);
        displayExpense(expense);
    } else {
        console.log("no data found in local storage");
    }
});
//displayExpense(expense);

let currentInput = '';

// Function to append character to the current input
function appendToDisplay(value) {
    currentInput += value;
    updateDisplay();
};

// Function to update the display
function updateDisplay() {
    document.getElementById('display').value = currentInput;
};

// Function to clear the display
function clearDisplay() {
    currentInput = '';
    updateDisplay();
};

// Function to calculate the result
function calculateResult() {
    try {
        currentInput = eval(currentInput).toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
    }
};


form.addEventListener('submit', handleAddExpense);
