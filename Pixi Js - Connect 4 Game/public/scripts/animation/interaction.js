//AI logic to check for next succesful move
var directionFunctions = [{
    visited: false,
    dirFn: horizontalCheck,
    player: "player2"
}, {
    visited: false,
    dirFn: verticalCheck,
    player: "player2"
}, {
    visited: false,
    dirFn: horizontalCheck,
    player: "player1"
}, {
    visited: false,
    dirFn: verticalCheck,
    player: "player1"
}];

var message;
setUserMoves();

//Turn based messages provided
function notifyTurn(msg) {
    message = new Text(
        msg, {
            font: "24px Tahoma",
            fill: "white"
        }
    );
    message.position.set(240, 10);
    stage.addChild(message);
}

//user selection update
function updateGameBoard(row, col) {
    updateLowestUnfilledRow(row); //lowest filled Row
    board[row][col] = gameSettings[gameSettings.active];
    var gameStatus = checkIfFour(gameSettings.lowestUnfilledRow, board, gameSettings[gameSettings.active]);
    if (gameStatus.status) {
        stage.removeChild(message);
        gameOver(gameStatus.winningSlot);
        //show winning blocks
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    if (gameSettings.active === "player1") {
        gameSettings.active = "player2";
        setComputerMoves();
    } else if (gameSettings.active === "player2") {
        gameSettings.active = "player1";
        setUserMoves();
    }
}
//gives the lowest row where element is inserted
function updateLowestUnfilledRow(input) {
    if (input < gameSettings.lowestUnfilledRow) {
        gameSettings.lowestUnfilledRow = input;
    }
}

//finds the empty row available on a coloumn click
function findEmptyRow(a, index) {
    if (index === -1) {
        return {
            available: false,
            slot: -1
        }; // No empty slot in the col
    }
    if (board[index][a] === 0) {
        return {
            available: true,
            slot: index
        };
    }
    return findEmptyRow(a, index - 1);
}

//User Actions (player 1)
function setUserMoves() {
    gameSettings.canPlay = true;
    notifyTurn("Your Turn!");
}
//Computer actions (player 2)
function setComputerMoves() {
    gameSettings.canPlay = false
    notifyTurn("Computer");
    var nextMove = findNextMove(gameSettings.active);
    for (var i = 0; i < stage.children.length; i++) {
        if (stage.children[i].val !== undefined && stage.children[i].val === nextMove.slot[0] + "-" + nextMove.slot[1]) {
            stage.children[i].tint = colorComb[gameSettings.active];
            stage.removeChild(message);
        }
    }
    updateGameBoard(nextMove.slot[0], nextMove.slot[1]);
}

//Click Event from user
function onRectClick() {
    //execute when user is active
    if (gameSettings.canPlay) {
        var clickedColoumn = Number(this.val.split("-")[1]);
        var i = board.length;
        var rowObj = findEmptyRow(clickedColoumn, i - 1);
        //execute if empty slot present in that coloumn
        if (rowObj.available) {
            var insertionSlot = rowObj.slot + "-" + clickedColoumn;
            for (var i = 0; i < stage.children.length; i++) {
                if (stage.children[i].val !== undefined && stage.children[i].val === insertionSlot) {
                    stage.children[i].tint = colorComb[gameSettings.active];
                    stage.removeChild(message);
                    updateGameBoard(rowObj.slot, clickedColoumn);
                }
            }
        }
        renderer.render(stage);
    }
}

//AI logic to find next possible move
function findNextMove(currentPlayer) {
    var col = 0;
    while (col < 7) {
        var row = findEmptyRow(col, board.length - 1);
        if (row.available) {
            board[row.slot][col] = gameSettings[currentPlayer];
            var gameStatus = checkIfFour(gameSettings.lowestUnfilledRow, board, gameSettings[currentPlayer]);

            if (gameStatus.status) {
                return {
                    status: false,
                    slot: [row.slot, col]
                }
            }
            board[row.slot][col] = 0; //reset back to original val
        }
        col++;
    }

    var availability = selectBestMove(3);
    if (availability !== undefined) {
        return availability;
    }
}
/*
	Check for our three consecutive occurrence/then opponents
	then Check for our two consecutive occurrence/then opponents
	then Check for our one consecutive occurrence/then opponents	
	
	Priority is for players winning move, or else block opponents winning move
*/
function selectBestMove(checkNum) {
    //exit condition for recursive function 
    if (directionFunctions.filter(dirIterationCheck).length === 0 && checkNum === 0) {
        return {
            status: false
        } //game Over
    } else if (directionFunctions.filter(dirIterationCheck).length === 0) {
        //reset direction object to start next iteration
        checkNum--;
        directionFunctions.map(function(a) {
            a.visited = false;
        });
    }
    //console.log(directionFunctions)
    //alert(checkNum);
    var dirObj = direction();
    var availability = dirObj.dirFn(checkNum, dirObj.player);
    if (availability === undefined) {
        return selectBestMove(checkNum);
    } else {
        directionFunctions.map(function(a) {
            a.visited = false;
        });
        return {
            status: true,
            slot: availability
        };
    }
}

//provides which direction to check next for a successful move
function direction() {
    var nextDir = directionFunctions.filter(getNextDirection);

    function getNextDirection(val) {
        return val.visited === false;
    }
    nextDir = nextDir.slice(0, 1);
    nextDir[0].visited = true;
    return nextDir[0];
}

//to check if any dirObj ele left unvisited 
function dirIterationCheck(a) {
    return a.visited === false;
}

//Check for horizontal success move
function horizontalCheck(checkNum, currentPlayer) {
    for (var i = board.length - 1; i >= gameSettings.lowestUnfilledRow; i--) {
        for (var j = 0; j < board[i].length; j++) {
            var loc = j + checkNum - 1;
            if (board[i][loc] !== undefined) {
                var slicedArray = board[i].slice(j, j + checkNum);
                //console.log("horiz");
                //console.log(currentPlayer);
                //console.log(slicedArray)
                //consecutive occurrence check
                var isConsecutive = checkConsecutive(slicedArray, checkNum, gameSettings[currentPlayer]);
                //console.log(isConsecutive)
                if (isConsecutive) {
                    //console.log(board[i][j-1])
                    //console.log(board[i][loc])
                    //console.log(board[i][loc+1]);
                    //check if slot next to it are available for insertion
                    if (board[i][j - 1] !== undefined && board[i][j - 1] === 0) {
                        if (findEmptyRow(parseInt(j - 1), board.length - 1).slot === parseInt(i)) {
                            return [parseInt(i), parseInt(j - 1)];
                        }

                    } else if (board[i][loc + 1] !== undefined && board[i][loc + 1] === 0) {
                        if (findEmptyRow(parseInt(loc + 1), board.length - 1).slot === parseInt(i)) {
                            return [parseInt(i), parseInt(loc + 1)];
                        }

                    } else {
                        break;
                    }

                }
            } else {
                break;
            }
        }
    }
    return undefined;
}

//Check for vertical success move
function verticalCheck(checkNum, currentPlayer) {
    for (var i = board.length - 1; i >= 0; i--) {
        var loc = i - checkNum;
        if (board[loc] != undefined) {
            for (var j = 0; j < board[i].length; j++) {
                var slicedArray = [];
                if (board[loc][j] !== undefined) { //array out of bound check
                    var count = 0;
                    while (count < checkNum) {
                        slicedArray.push(board[i - count][j]);
                        count++;
                    }
                    var isConsecutive = checkConsecutive(slicedArray, checkNum, gameSettings[currentPlayer]);
                    if (isConsecutive && board[loc][j] === 0) {
                        console.log("ver cond")
                        return [loc, j];
                    }
                } else {
                    break;
                }
            }
        } else {
            break;
        }
    }
    return undefined;
}

//gives the consecutive occurence of a color
function checkConsecutive(a, limit, val) {
    if (a.length < limit || a.indexOf(0) !== -1) {
        return false;
    } else {
        for (var i = 1; i < a.length; i++) {
            if (a[i - 1] !== a[i]) {
                return false;
            } else if (a[i] !== val) {
                return false;
            }
        }
    }
    return true;
}

//game over functions
function gameOver(winningSlots) {
    if (gameSettings.active === "player1") {
        notifyTurn("You won - Game Over");
    } else {
        notifyTurn("Computer won - Game Over");
    }

    stage.children.map(function(a, index) {
        a.interactive = false; //game won .. no more interatctions required.
        if (a.val != undefined) {
            if (winningSlots.indexOf(a.val) >= 0) {
                a.tint = colorComb.victory;
            }
        }
    });
}

//New Game Reset
function resetBoard() {
    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    gameSettings = {
        connect: 4,
        player1: 1,
        player2: 2,
        canPlay: true,
        active: "player1",
        gameStatus: "",
        playerWon: "",
        lowestUnfilledRow: 5
    };

    stage.children.map(function(a){
		a.interactive = true;
        a.tint = colorComb.boardColor;
    });
	stage.removeChild(message);
	renderer.render(stage);
    setUserMoves();
}