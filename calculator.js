const buttonValues = [
  "AC",
  "DEL",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "+/-",
  "=",
];
const rightSymbols = ["÷", "×", "-", "+", "="];
const topSymbols = ["AC", "DEL", "+/-", "%"];
const display = document.getElementById("display");
const expressionDisplay = document.getElementById("expressionDisplay");
let expression = "";
let shouldResetDisplay = false;
let A = 0;
let B = null;
let operator = null;

function clearAll() {
  A = 0;
  B = null;
  operator = null;
}

for (i = 0; i < buttonValues.length; i++) {
  //<button><button>
  let value = buttonValues[i];
  let button = document.createElement("button");
  button.innerText = value;

  //Styling button color
  /* if (value == "=") {
    button.style.width = "180px";
    button.style.gridColumn = "span 2";
  } */
  if (rightSymbols.includes(value)) {
    button.style.backgroundColor = "#FF9500";
  } else if (topSymbols.includes(value)) {
    button.style.backgroundColor = "#D4D4D2";
    button.style.color = "#1C1C1C";
  }
  //process button clicks
  button.addEventListener("click", function () {
    if (rightSymbols.includes(value)) {
      if (value === "=") {
        if (A != null && operator != null) {
          B = display.value;
          let numA = Number(A);
          let numB = Number(B);
          let result;

          switch (operator) {
            case "÷":
              result = numB === 0 ? "Error" : numA / numB;
              break;
            case "×":
              result = numA * numB;
              break;
            case "-":
              result = numA - numB;
              break;
            case "+":
              result = numA + numB;
              break;
          }
          display.value = result;
          expressionDisplay.innerText = `${A} ${operator} ${B} =`;
          clearAll();
          shouldResetDisplay = true;
        }
      } else {
        operator = value;
        A = display.value;
        display.innerText = `${A} ${operator}`;
        expressionDisplay.innerText = `${A} ${operator}`;
        display.value = "";
      }
    } else if (topSymbols.includes(value)) {
      if (value == "AC") {
        clearAll();
        display.value = "";
        expressionDisplay.innerText = "";
      } else if (value == "+/-") {
        if (display.value != "" && display.value != "0") {
          if (display.value[0] == "-") {
            display.value = display.value.slice(1);
          } else {
            display.value = "-" + display.value;
          }
        }
      } else if (value == "%") {
        display.value = Number(display.value) / 100;
      } else if (value == "DEL") {
        display.value = display.value.slice(0, -1);
      }
    } else {
      //digits or .
      if (value == ".") {
        x;
        if (shouldResetDisplay) {
          display.value = ".0";
          shouldResetDisplay = false;
        }
        //don't add multiple decimal places
        if (!display.value.includes(".")) {
          display.value += value === "." && display.value === "" ? "0." : value;
        }
      } else {
        if (shouldResetDisplay) {
          display.value = value;
          shouldResetDisplay = false;
        } else if (display.value == "0") {
          display.value = value;
        } else {
          display.value += value;
        }
      }
    }
  });

  //add buttons to the calculator
  document.getElementById("buttons").appendChild(button);
}

//Keyboard
document.addEventListener("keydown", (e) => {
  const key = e.key;
  const keyMap = {
    "/": "÷",
    "*": "×",
    "-": "-",
    "+": "+",
    Enter: "=",
    "=": "=",
    Escape: "AC",
    Backspace: "DEL",
  };

  const mappedKey = keyMap[key] || key;

  if (buttonValues.includes(mappedKey)) {
    const button = Array.from(document.querySelectorAll("button")).find(
      (b) => b.innerText === mappedKey
    );
    button?.click();
  }
});
