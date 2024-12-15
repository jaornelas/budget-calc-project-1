//Data Storage
let income = 0;
let expenses = [];
let totalExpenses = 0;
const form = document.querySelector('form');

window.onload = function() {
    localStorage.clear();
}

// Add Income
function addIncome(amount) {
    income.push({amount: parseFloat(amount) });
    updateSummary();
};

// Add Expense
function addExpense(category, amount) {
    expenses.push({ category, amount: parseFloat(amount) });
    totalExpenses += parseFloat(amount);
    updateSummary();
    updateExpenseChart();
};

// Update Summary
function updateSummary() {
    const balance = income - totalExpenses;
    document.getElementById("totalIncome").innerText = `$${income.toFixed(2)}`;
    document.getElementById("totalExpenses").innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
};

// Update Expense Chart
const ctx = document.getElementById('myChart').getContext('2d'); 
const myChart= new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Housing', 'Transportation', 'Utilities', 'Entertainment', 'Grocery', 'Other'],
    datasets: [{
      label: 'USD $',
      data: [1, 1, 1, 1, 1, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 253, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 253, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function addData(chart) {
    chart.data.labels.push(document.getElementById("category").value);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(document.getElementById("amount").value * 1);
    });
    chart.update();
}

 


  



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

// // Calculator Logic
// let calculatorDisplay = "";
// function addCalculatorInput(input) {
//     calculatorDisplay += input;
//     document.getElementById("calculatorDisplay").innerText = calculatorDisplay;
// }

// function calculateResult() {
//     try {
//         calculatorDisplay = eval(calculatorDisplay).toFixed(2);
//         document.getElementById("calculatorDisplay").innerText = calculatorDisplay;
//     } catch (e) {
//         document.getElementById("calculatorDisplay").innerText = "Error";
//     }
// }
// function addCustomBudget() {
//     const budgetInput = document.getElementById("customBudget").value;

//     // Validate input
//     if (!budgetInput || isNaN(budgetInput) || parseFloat(budgetInput) <= 0) {
//         alert("Please enter a valid budget amount!");
//         return;
//     }

//     customBudget = parseFloat(budgetInput);

//     // Update the custom budget display
//     document.getElementById("customBudgetDisplay").innerText = `$${customBudget.toFixed(2)}`;

//     // Update balance
//     const balance = customBudget - totalExpenses;
//     document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;

//     // Clear input field
//     document.getElementById("customBudget").value = "";
// }