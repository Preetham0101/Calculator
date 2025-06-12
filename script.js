const display = document.getElementById('display');
const historyList = document.getElementById('history');
let history = [];

function appendToDisplay(value) {
  if (display.innerText === '0' || display.innerText === 'Error') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = '0';
}

function deleteLast() {
  if (display.innerText === 'Error') {
    display.innerText = '0'; // Clear full "Error" at once
  } else if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1);
  } else {
    display.innerText = '0';
  }
}

function calculate() {
  const input = display.innerText.trim();

  if (input === '' || input === '0') return;

  try {
    const expression = input.replace('%', '/100');
    const result = eval(expression);

    // Only store expressions with real operators beyond the first char
    if (containsOperator(input)) {
      updateHistory(input, result);
    }

    display.innerText = result;
  } catch {
    display.innerText = 'Error';
  }
}

function containsOperator(expression) {
  return /[+\-*/%]/.test(expression.slice(1)); // Ignore leading sign
}

function updateHistory(expression, result) {
  const entry = `${expression} = ${result}`;
  history.unshift(entry);
  if (history.length > 10) history.pop(); // limit history
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Clear History Button
document.getElementById('clear-history').addEventListener('click', function () {
  history = [];
  renderHistory();
});

// Keyboard input support
document.addEventListener('keydown', function (e) {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    e.preventDefault();
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
