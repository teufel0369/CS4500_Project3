/*global $, jQuery*/
/*global alert, jQuery*/
/*global console, jQuery*/

//this function uses two loops to grab the element by ID in jQuery and then append numbered grid cells to the container
function drawGrid() {
    "use strict";
    var row, col, k = 0;

    //grab the div container by ID and append a 10X10 grid to it with corresponding point elements
    for (row = 0; row < 10; row += 1) {
        for (col = 0; col < 10; col += 1) {
            $("#container").append('<div class="grid grid' + row + col + '"></div>');
        }
    }

    //size of the "grid" elements 620 / 10 because there is a 10x10 grid and this makes it proportionate
    $(".grid").width(520 / 10);
    $(".grid").height(520 / 10);
}

//random number of steps
function randomNumSteps() {
    "use strict";
    return Math.floor(Math.random() * 3);
}

//random number generator for direction
function randomDirection() {
    "use strict";
    return Math.floor(Math.random() * 4);
}

//sets the css element of the grid to red fill
function colorRedPoint(row, col) {
    "use strict";
    return $('.grid' + row + col).css('background-color', 'red');
}

//sets the css element of the grid to blue fill
function colorBluePoint(row, col) {
    "use strict";
    return $('.grid' + row + col).css('background-color', 'blue');
}

//sets the element of the grid to white fill
function clearPoint(row, col) {
    "use strict";
    return $('.grid' + row + col).css('background-color', 'white');
}

//checks to see if the cell exists
function doesCellExist(row, col) {
    "use strict";

    if (row > 9 || col > 9 || row < 0 || col < 0) {
        return false;
    } else {
        return true;
    }
}

//detects the winning cell
function isRedWinningCell(row, col) {
    "use strict";

    if ((row === 0 && col === 9)) {
        return true;
    } else {
        return false;
    }
}

//detects the winning cell
function isBlueWinningCell(row, col) {
    "use strict";

    if ((row === 0 && col === 0)) {
        return true;
    } else {
        return false;
    }
}

//detects if the cell is occupied
function isCellOccupied(redRow, redCol, blueRow, blueCol) {
    "use strict";
    if((redRow === blueRow && redCol === blueCol) ||
        (blueRow === redRow && blueCol === redCol)) {
        return true;
    } else {
        return false;
    }
}


//will control the overall function of the game
function gamePlay(row1, col1, row2, col2, counter1, counter2, countdown1) {
    "use strict";

    var redRandomDirection, blueRandomDirection, redNumSteps, blueNumSteps, fitty1, fitty2 = 0,
        redRow = row1, redCol = col1, flag, countdown = countdown1, redCounter = counter1,
        blueCounter = counter2, prevCol, prevRow, blueRow = row2, blueCol = col2, cellArray;

    redRandomDirection = randomDirection(); //pick the direction
    blueRandomDirection = randomDirection(); //pick the direction
    redNumSteps = randomNumSteps(); //pick the number of steps
    blueNumSteps = randomNumSteps();

    //using setTimeout to show the appearance of animation
    setTimeout(function () {

        //if the direction is 0, then left
        //if the direction is 1, then up
        //if the direction is 2, then right
        //if the direction is 3, then down

        /* I put the red stuff first so it executes first. Therefore, red should move first */
        if (redRandomDirection === 0) {
            clearPoint(redRow, redCol); //clear the current point
            prevCol = redCol; //assign this just in case the cell we're moving to doesn't exist
            redCol = redCol - redNumSteps; //make the direction adjustment and the number of steps we're moving

            //make a check to see if the cell exists and is not occupied before coloring.
            //if it does exist, then color it and mark the stats
            //otherwise, re-color the current point and mark the stats
            if (doesCellExist(redRow, redCol) === true && isCellOccupied(redRow, redCol, blueRow, blueCol) === false) {
                colorRedPoint(redRow, redCol);
                countdown -= 1;
                redCounter = redCounter + 1;

            } else {
                redCol = prevCol;
                colorRedPoint(redRow, redCol);
                countdown -= 1;
                redCounter = redCounter + 1;
            }

        } else if (redRandomDirection === 1) {
            clearPoint(redRow, redCol);
            prevRow = redRow;
            redRow = redRow + redNumSteps;

            if (doesCellExist(redRow, redCol) === true && isCellOccupied(redRow, redCol, blueRow, blueCol) === false) {
                colorRedPoint(redRow, redCol);
                countdown -= 1;
                redCounter = redCounter + 1;

            } else {
                redRow = prevRow;
                colorRedPoint(redRow, redCol);
                countdown -= 1;
                redCounter = redCounter + 1;
            }

        } else if (redRandomDirection === 2) {
            clearPoint(redRow, redCol);
            prevCol = redCol;
            redCol = redCol + redNumSteps;

            if (doesCellExist(redRow, redCol) === true && isCellOccupied(redRow, redCol, blueRow, blueCol) === false) {
                colorRedPoint(redRow, redCol);
                countdown -= 1;
                redCounter = redCounter + 1;

            } else {
                redCol = prevCol;
                colorRedPoint(redRow, redCol);
                countdown -= 1;
                redCounter = redCounter + 1;
            }

        } else {
            clearPoint(redRow, redCol);
            prevRow = redRow;
            redRow = redRow - redNumSteps;

            if (doesCellExist(redRow, redCol) === true && isCellOccupied(redRow, redCol, blueRow, blueCol) === false) {
                colorRedPoint(redRow, redCol);
                countdown -= 1;
                redCounter = redCounter + 1;

            } else {
                redRow = prevRow;
                colorRedPoint(redRow, redCol);
                countdown -= 1;
                redCounter = redCounter + 1;
            }
        }

        if (redRandomDirection === 0) {
            clearPoint(blueRow, blueCol); //clear the current point
            prevCol = blueCol; //assign this just in case the cell we're moving to doesn't exist
            blueCol = blueCol - blueNumSteps; //make the direction adjustment and the number of steps we're moving

            if (doesCellExist(blueRow, blueCol) === true && isCellOccupied(redRow, redCol, blueRow, blueCol) === false) {
                colorBluePoint(blueRow, blueCol);
                countdown -= 1;
                blueCounter = blueCounter + 1;

            } else {
                blueCol = prevCol;
                colorBluePoint(blueRow, blueCol);
                countdown -= 1;
                blueCounter = blueCounter + 1;
            }

        } else if (blueRandomDirection === 1) {
            clearPoint(blueRow, blueCol);
            prevRow = blueRow;
            blueRow = blueRow + blueNumSteps;

            if (doesCellExist(blueRow, blueCol) === true && isCellOccupied(redRow, redCol, blueRow, blueCol) === false) {
                colorBluePoint(blueRow, blueCol);
                countdown -= 1;
                blueCounter = blueCounter + 1;

            } else {
                blueRow = prevRow;
                colorBluePoint(blueRow, blueCol);
                countdown -= 1;
                blueCounter = blueCounter + 1;
            }

        } else if (blueRandomDirection === 2) {
            clearPoint(blueRow, blueCol);
            prevCol = blueCol;
            blueCol = blueCol + blueNumSteps;

            if (doesCellExist(blueRow, blueCol) === true && isCellOccupied(redRow, redCol, blueRow, blueCol) === false) {
                colorBluePoint(blueRow, blueCol);
                countdown -= 1;
                blueCounter = blueCounter + 1;

            } else {
                blueCol = prevCol;
                colorBluePoint(blueRow, blueCol);
                countdown -= 1;
                blueCounter = blueCounter + 1;
            }

        } else {
            clearPoint(blueRow, blueCol);
            prevRow = blueRow;
            blueRow = blueRow - blueNumSteps;

            if (doesCellExist(blueRow, blueCol) === true && isCellOccupied(redRow, redCol, blueRow, blueCol) === false) {
                colorBluePoint(blueRow, blueCol);
                countdown -= 1;
                blueCounter = blueCounter + 1;

            } else {
                blueRow = prevRow;
                colorBluePoint(blueRow, blueCol);
                countdown -= 1;
                blueCounter = blueCounter + 1;
            }
        }


        //if the countdown is zero, then notify the user we've exhausted all turns and output the counter
        //if the cell is the winning cell, then notify the user that he's awesome and output the counter
        //otherwise, make a recursive call to the function and output the counter
        if (countdown === 0) {
            alert('You have exhausted all turns! Thanks for playing Strange Game!');
            document.getElementById('redBoldStuff').innerHTML = redCounter;
            document.getElementById('blueBoldStuff').innerHTML = blueCounter;

        } else if (isRedWinningCell(redRow, redCol) === true || isBlueWinningCell(blueRow, blueCol) === true) {
            document.getElementById('redBoldStuff').innerHTML = redCounter;
            document.getElementById('blueBoldStuff').innerHTML = blueCounter;
            alert('You Win!!!! Thanks for playing Strange Game!');

        } else {
            document.getElementById('redBoldStuff').innerHTML = redCounter
            document.getElementById('blueBoldStuff').innerHTML = blueCounter;;
            gamePlay(redRow, redCol, blueRow, blueCol, redCounter, blueCounter, countdown); //update the game data and make recursive call

            /* Note: I typically don't use recursion, as it's bad for performance. However, this was really the only
            way to really get the setTimeout function to operate as intended. */
        }

    }, 200); //set the setTimeout timer to 500 milliseconds
}

//when the page loads do this
$(document).ready(function () {
    "use strict";

    drawGrid(); //draw the grid
    colorRedPoint(9, 0); //starting point for the game
    colorBluePoint(9, 9);
});

//when the start button is clicked
$('#largeButton').click(function () {
    "use strict";

    //starting the game;
    //row 9, column 0, initialize the counter to zero, and set the countdown to 1,000,000 possible turns
    gamePlay(9, 0, 9, 9, 0, 0, 1000000);
});
