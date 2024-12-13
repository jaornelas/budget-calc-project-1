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
    income += parseFloat(amount);
    updateSummary();
};

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

// Update Pie Chart
function updatePieChart() {
    const ctx = document.getElementById("expenseChart").getContext("2d");
    const data = expenses.map(exp => exp.amount);
    const labels = expenses.map(exp => exp.category);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            }]
        }
    });
};

function updateChartData(newData) {
    myChart.data.datasets[0].data = newData.values;
    myChart.update();
  }

const newExpensesData = {
    labels: ['Housing', 'Transportation', 'Utilities', 'Entertainment', 'Grocery', 'Other'],
    values: [40.00, 50.00, 30.00, 20.00, 45.00, 25.00]
  };
  updateChartData(newExpensesData);


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