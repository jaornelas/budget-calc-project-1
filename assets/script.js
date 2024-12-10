//Data Storage
let income = 0;
let expenses = [];
let totalExpenses = 0;

// Add Income
function addIncome(amount) {
    income += parseFloat(amount);
    updateSummary();
}

// Add Expense
function addExpense(category, amount) {
    expenses.push({ category, amount: parseFloat(amount) });
    totalExpenses += parseFloat(amount);
    updateSummary();
    updatePieChart();
}

// Update Summary
function updateSummary() {
    const balance = income - totalExpenses;
    document.getElementById("totalIncome").innerText = `$${income.toFixed(2)}`;
    document.getElementById("totalExpenses").innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;
}

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
}

// Calculator Logic
let calculatorDisplay = "";
function addCalculatorInput(input) {
    calculatorDisplay += input;
    document.getElementById("calculatorDisplay").innerText = calculatorDisplay;
}

function calculateResult() {
    try {
        calculatorDisplay = eval(calculatorDisplay).toFixed(2);
        document.getElementById("calculatorDisplay").innerText = calculatorDisplay;
    } catch (e) {
        document.getElementById("calculatorDisplay").innerText = "Error";
    }
}
function addCustomBudget() {
    const budgetInput = document.getElementById("customBudget").value;

    // Validate input
    if (!budgetInput || isNaN(budgetInput) || parseFloat(budgetInput) <= 0) {
        alert("Please enter a valid budget amount!");
        return;
    }

    customBudget = parseFloat(budgetInput);

    // Update the custom budget display
    document.getElementById("customBudgetDisplay").innerText = `$${customBudget.toFixed(2)}`;

    // Update balance
    const balance = customBudget - totalExpenses;
    document.getElementById("balance").innerText = `$${balance.toFixed(2)}`;

    // Clear input field
    document.getElementById("customBudget").value = "";
}