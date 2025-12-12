function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

function calculate() {
  const a = Number(document.getElementById("num1").value);
  const b = Number(document.getElementById("num2").value);
  const op = document.getElementById("operator").value;

  let result;

  if (isNaN(a) || isNaN(b)) {
    result = "Please enter valid numbers!";
  } else {
    switch (op) {
      case "+": result = add(a, b); break;
      case "-": result = subtract(a, b); break;
      case "*": result = multiply(a, b); break;
      case "/": result = divide(a, b); break;
    }

    if (typeof result === "number") {
      result = result.toFixed(2); // ⭐ 四捨五入到小數點後 2 位
    }
  }

  document.getElementById("result").textContent = "Result: " + result;
}
