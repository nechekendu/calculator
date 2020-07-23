const display = document.querySelector(".calculator-display");
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");

const calculate = (...args) => {
  const [firstValue, operator, secondValue] = args,
    // convert all number-string to number
    firstNum = Number(firstValue),
    secondNum = Number(secondValue);

  switch (operator) {
    case "add":
      return firstNum + secondNum;
      break;
    case "subtract":
      return firstNum - secondNum;
      break;
    case "multiply":
      return firstNum * secondNum;
      break;
    case "divide":
      return firstNum / secondNum;
      break;
    default:
      break;
  }
};

const runCalc = (e) => {
  if (e.target.matches("button")) {
    const key = e.target,
      action = key.dataset.action,
      keyContent = key.textContent,
      displayedNum = display.textContent,
      previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      if (displayedNum === "0" || previousKeyType === "operator") {
        display.textContent = keyContent;
      } else {
        display.textContent = `${displayedNum}${keyContent}`;
      }

      calculator.dataset.previousKeyType = "number";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue,
        operator = calculator.dataset.operator,
        secondValue = displayedNum;

      if (firstValue && operator)
        display.textContent = calculate(firstValue, operator, secondValue);

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
    }

    if (action === "decimal") {
      //adds '.' after any number once you click this

      if (!displayedNum.includes(".")) display.textContent = `${displayedNum}.`;
      else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      )
        display.textContent = "0";

      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
      location.reload();
    }

    if (action !== "clear") {
      const clearBtn = calculator.querySelector("[data-action=clear]");
      clearBtn.textContent = "CE";
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue,
        operator = calculator.dataset.operator,
        secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }

        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";

      calculator.dataset.previousKeyType = "calculate";
    }

    const allKeys = key.parentNode.children,
      allKeysArr = Array.from(allKeys);
    allKeysArr.forEach((element) => element.classList.remove("is-depressed"));
  }
};

keys.addEventListener("click", runCalc);
