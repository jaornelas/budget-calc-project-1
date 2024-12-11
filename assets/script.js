//Data Storage
let income = 0;
let expenses = [];
let totalExpenses = 0;

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

<<<<<<< HEAD
const { AgCharts } = agCharts;

const data = getData();
const numFormatter = new Intl.NumberFormat("en-US");
const total = data.reduce((sum, d) => sum + d["count"], 0);

const options = {
  container: document.getElementById("myChart"),
  data,
  title: {
    text: "Dwelling Fires (UK)",
  },
  footnote: {
    text: "Source: Home Office",
  },
  series: [
    {
      type: "donut",
      calloutLabelKey: "type",
      angleKey: "count",
      sectorLabelKey: "count",
      calloutLabel: {
        enabled: false,
      },
      sectorLabel: {
        formatter: ({ datum, sectorLabelKey }) => {
          const value = datum[sectorLabelKey];
          return numFormatter.format(value);
        },
      },
      title: {
        text: "Annual Count",
      },
      innerRadiusRatio: 0.7,
      innerLabels: [
        {
          text: numFormatter.format(total),
          fontSize: 24,
        },
        {
          text: "Total",
          fontSize: 16,
          spacing: 10,
        },
      ],
      tooltip: {
        renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }) => {
          return {
            title,
            content: `${datum[calloutLabelKey]}: ${numFormatter.format(datum[sectorLabelKey])}`,
          };
        },
      },
      sectorSpacing: 3,
    },
  ],
=======
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
>>>>>>> c8e7517f10eb7556d4c363199ce7a24c3484fc1d
};

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