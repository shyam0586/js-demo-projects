//function which checks success condition(4 connections in all directions)
function checkIfFour(depth, input, activePlayerVal) {
    //do diagonal and horizontal checking only when
    if (depth <= input.length - gameSettings.connect) {
        //Vertical Checker 
        for (var i = input.length - 1; i >= depth; i--) {
            for (var j = 0; j < input[i].length; j++) {
                if (i - 3 < 0) {
                    break;
                }
                if (activePlayerVal === input[i][j] &&
                    input[i][j] === input[i - 1][j] &&
                    input[i - 1][j] === input[i - 2][j] &&
                    input[i - 2][j] === input[i - 3][j] &&
                    input[i - 3] !== undefined) {
                    return {
                        status: true,
                        winningSlot: [parseInt(i) + "-" + parseInt(j), parseInt(i - 1) + "-" + parseInt(j), parseInt(i - 2) + "-" + parseInt(j), parseInt(i - 3) + "-" + parseInt(j)]
                    };
                }
            }
        }

        //diagonally towards left
        for (var i = input.length - 1; i >= 3; i--) {
            for (var j = input[i].length - 1; j >= 0; j--) {
                if (input[i - 3] !== undefined &&
                    activePlayerVal === input[i][j] &&
                    input[i][j] === input[i - 1][j - 1] &&
                    input[i - 1][j - 1] === input[i - 2][j - 2] &&
                    input[i - 2][j - 2] === input[i - 3][j - 3]) {
                    return {
                        status: true,
                        winningSlot: [parseInt(i) + "-" + parseInt(j), parseInt(i - 1) + "-" + parseInt(j - 1), parseInt(i - 2) + "-" + parseInt(j - 2), parseInt(i - 3) + "-" + parseInt(j - 3)]
                    };
                }
            }
        }

        //diagonally towards right
        for (var i = input.length - 1; i >= 3; i--) {
            for (var j = 0; j < input[i].length; j++) {
                if (input[i - 3] !== undefined &&
                    activePlayerVal === input[i][j] &&
                    input[i][j] === input[i - 1][j + 1] &&
                    input[i - 1][j + 1] === input[i - 2][j + 2] &&
                    input[i - 2][j + 2] === input[i - 3][j + 3]) {
                    return {
                        status: true,
                        winningSlot: [parseInt(i) + "-" + parseInt(j), parseInt(i - 1) + "-" + parseInt(j + 1), parseInt(i - 2) + "-" + parseInt(j + 2), parseInt(i - 3) + "-" + parseInt(j + 3)]
                    };
                }
            }
        }
    }

    //Horizontal checker
    for (var i = input.length - 1; i >= depth; i--) {
        for (var j = 0; j < input[i].length; j++) {
            //check if the middle col has opposite players number
            var midCol = board[0].length - gameSettings.connect;
            var middleElement = input[i][midCol];
            if (middleElement !== activePlayerVal || middleElement === 0) {
                //No chance of horizontal match with this condition
                break;
            }
            //Horizontal Checker
            if (activePlayerVal === input[i][j] &&
                input[i][j] === input[i][j + 1] &&
                input[i][j] === input[i][j + 2] &&
                input[i][j] === input[i][j + 3] &&
                input[i][j + 3] !== undefined) {
                return {
                    status: true,
                    winningSlot: [parseInt(i) + "-" + parseInt(j), parseInt(i) + "-" + parseInt(j + 1), parseInt(i) + "-" + parseInt(j + 2), parseInt(i) + "-" + parseInt(j + 3)]
                };
            }
        }
    }
    return {
        status: false,
        winningSlot: []
    };
}