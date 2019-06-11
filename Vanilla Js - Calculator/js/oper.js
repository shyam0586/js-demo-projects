var inputArray = [];
var temp = [];
$(document).on("click", ".keys", function() {
  selectKeyOperation($(this).text());
});

function selectKeyOperation(keyPressed) {
  var tempVar = '';
  if (keyPressed === "C") {
    resetValue();
  } else if (keyPressed === "=") {
    createDigit(temp);
    calculateResult();
    temp = [];
  } else {
    if (!isNaN(Number(keyPressed))) {
      temp.push(keyPressed);
    } else if (keyPressed === ".") {
      temp.push(keyPressed);
    } else {
      if (temp.length !== 0) {
        createDigit(temp);
      }
      inputArray.push(keyPressed);
      temp = [];
    }
    $(".result").append(keyPressed);
  }
}

function createDigit(temp) {
  var t = '';
  for (var i = 0; i < temp.length; i++) {
    t += temp[i];
  }
  if (t.indexOf('.') === 1) {
    t = parseFloat(t);
  } else {
    t = parseInt(t);
  }
  inputArray.push(t);
}

function calculateResult() {
  if (inputArray.length > 1) {
    doOperation(inputArray[0], inputArray[1], inputArray[2]);
    calculateResult();
  } else {
    //temp.push(inputArray[0]);
    $(".result").html(inputArray[0]);
  }

}

function doOperation(a, b, c) {
  var total = 0;
  if (b === '+') {
    total = a + c;
  } else if (b === '-') {
    total = a - c;
  } else if (b === '*') {
    total = a * c;
  } else if (b === '/') {
    total = a / c;
  }
  inputArray.splice(0, 3);
  inputArray.unshift(total);
}

function resetValue() {
  inputArray = [];
  temp = [];
  $(".result").html('');
}