// initialize result display elements
const pryDisplay = document.querySelector(".pry-display");
const secDisplay = document.querySelector(".sec-display");

// pryDisplay.innerText = "";

// initialize number buttons, dot button and equal button elements
const numBtns = document.querySelectorAll(".num-btn");
opBtns = document.querySelectorAll(".op-btn");
const dotBtn = document.querySelector(".dot-btn");
const eqlBtn = document.querySelector(".eql-btn");

// initialize variable to hold current expression and result
let currentExpression = "";
let result;
let lastEntryIsSign = false;
let lastEntryIsDot = false;
let screenIsFull = false;

// initialize clear buttons elements
const clrAllBtn = document.querySelector(".clr-all");
const clrBtn = document.querySelector(".clr");

// function to add numbers to display section on number select
numBtns.forEach((numBtn) => {
  numBtn.onclick = () => {
    // Check if screen is not full
    if (Array.from(currentExpression).length < 13) {
      // sets selected number based on selected button
      let selectedNum = numBtn.innerText;
      currentExpression += selectedNum;
      pryDisplay.innerText = currentExpression;

      return currentExpression;
    } else {
      alert("Maximum input has been reached");
    }
  };
});

// function to add mathematical operation sign to display
opBtns.forEach((opBtn) => {
  opBtn.onclick = () => {
    // Check if screen is not full
    if (Array.from(currentExpression).length < 13) {
      // create an array to store entries
      let lastEntry = Array.from(
        currentExpression[Array.from(currentExpression).length - 1]
      ).join("");

      // initialize a variable to check if last entry is a sign
      if (
        lastEntry == "+" ||
        lastEntry == "-" ||
        lastEntry == "*" ||
        lastEntry == "/"
      ) {
        lastEntryIsSign = true;
      } else {
        lastEntryIsSign = false;
      }
      // add sign to expressions if last entry is not a sign
      if (!lastEntryIsSign) {
        let selectedOp = opBtn.getAttribute("data-sign");
        currentExpression += selectedOp;
        pryDisplay.innerText = currentExpression;
      } else {
        // pop out the last sign and replace it with current expression
        let newCurrentExpression = Array.from(currentExpression);
        newCurrentExpression.pop();

        let selectedOp = opBtn.getAttribute("data-sign");
        currentExpression = newCurrentExpression.join("") + selectedOp;
        pryDisplay.innerText = currentExpression;
      }

      return currentExpression;
    } else {
      alert("Maximum input has been reached");
    }
  };
});

// function to clear all entries in display section
clrAllBtn.onclick = () => {
  // fills display element with a non-breaking space
  pryDisplay.innerText = "\u00A0";
  secDisplay.innerText = "\u00A0";
  currentExpression = "";
  return currentExpression;
};

// function to clear last entry in display section
clrBtn.onclick = () => {
  // convert current input in primary display to array and trims out whitespaces
  let entries = Array.from(currentExpression.trim());
  // remove last element from the array
  entries.pop();
  // turns the array back into string and outputs it
  currentExpression = entries.join("");
  pryDisplay.innerText = currentExpression;
  return currentExpression;
};

// function to carry out mathematical operation when equal button is pressed
eqlBtn.onclick = () => {
  // return if no expression is available
  if (currentExpression.trim().length == 0) {
    return;
  } else {
    secDisplay.innerText = currentExpression;
    result = eval(currentExpression);

    // convert result to string and limit its content to 12 digits if more than
    pryDisplay.innerText = result.toString().substring(0, 12);
  }
};

// functionality for dot

dotBtn.onclick = () => {
  // check if dot was the last entry

  // create an array to store entries
  let lastEntry = Array.from(
    currentExpression[Array.from(currentExpression).length - 1]
  ).join("");

  // initialize a variable to check if last entry is a sign
  if (lastEntry == ".") {
    lastEntryIsDot = true;
  } else {
    lastEntryIsDot = false;
  }

  if (lastEntryIsDot) {
    return;
  } else {
    currentExpression += ".";
    pryDisplay.innerText = currentExpression;
  }
};

// How to check if dot is already present in number
// Split current expression to the left until sign in reached and check if the splited expression contains dot
