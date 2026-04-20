let expression = "";

function pressNumber(num) {
  expression += num;
  updateDisplay();
}

function pressOperator(op) {
  if (expression === "") return;

  let lastChar = expression.slice(-1);
  if ("+-*/".includes(lastChar)) {
    expression = expression.slice(0, -1);
  }

  expression += op;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").value = expression;
}

function clearDisplay() {
  expression = "";
  updateDisplay();
}

function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {

  try {
    let result = evaluateExpression(expression);

    addToHistory(expression + " = " + result);

    expression = result.toString();
    updateDisplay();

  } catch {
    document.getElementById("display").value = "Error";
    expression = "";
  }
}


// BODMAS Logic Implementation
function evaluateExpression(expr) {

  let tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

  // First handle * and /
  for (let i = 0; i < tokens.length; i++) {

    if (tokens[i] === "*" || tokens[i] === "/") {

      let left = Number(tokens[i - 1]);
      let right = Number(tokens[i + 1]);
      let result;

      if (tokens[i] === "*") result = left * right;
      if (tokens[i] === "/") result = left / right;

      tokens.splice(i - 1, 3, result.toString());
      i--;
    }
  }

  // Then handle + and -
  let result = Number(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {

    let operator = tokens[i];
    let next = Number(tokens[i + 1]);

    if (operator === "+") result += next;
    if (operator === "-") result -= next;
  }

  return result;
}

function addToHistory(text) {
  let li = document.createElement("li");
  li.textContent = text;
  document.getElementById("historyList").appendChild(li);
}