
// To Do:
    //Figure out how player moves are going to work
let gameBoard = (function(){
    // initialize squares
    let squares = [];
    let choice = '';

    for (let i=0; i<9; i++){
        squares.push(" ");
    }

    // change square value
    function setSquare(square, player) {
        squares[square] = player;
    }

    // retrieve square value
    function getSquare(square) {
        return squares[square]
    }
   

    return {
        setSquare,
        getSquare,
    }
})();

let player = function(side) {
    function move(choice) {
        // is the square unoccupied?
        if (gameBoard.getSquare(choice) === " " ){
            gameBoard.setSquare(choice, side)
        } else {
            console.log("invalid move")
        }
    }
    return {move}
}

let displayController = (() => {
    //To Do: work out the HTML
    let draw = function () {
        for (let i = 0; i < 9; i++) {
            let s = document.getElementById(`S${i}`);
            s.innerHTML = gameBoard.getSquare(i);
        }
    };
    return {
        draw,
    };
})()

//implement game loop here, and 
// set up to run when play button is
// pressed.

const game = () => {
    //create player objects
    let X = player('X');
    let O = player('O');
    let choice = ""
    //Check for winner
    function isWon() {
        let won = false
        let board = [];
        for (let i=0; i<9; i++){
            board.push(gameBoard.getSquare[i])
        }
        //Check rows
        if (gameBoard.getSquare(0)===gameBoard.getSquare(1) === gameBoard.getSquare(2) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(3)===gameBoard.getSquare(4) === gameBoard.getSquare(5) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(6)===gameBoard.getSquare(7) === gameBoard.getSquare(8) !== " " ) {
            return true;
        }
        //Check Columns
        if (gameBoard.getSquare(0)===gameBoard.getSquare(3) === gameBoard.getSquare(6) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(1)===gameBoard.getSquare(4) === gameBoard.getSquare(7) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(2)===gameBoard.getSquare(5) === gameBoard.getSquare(8) !== " " ) {
            return true;
        }

        // CHECK DIAGONALS
        if (gameBoard.getSquare(0)===gameBoard.getSquare(4) === gameBoard.getSquare(8) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(2)===gameBoard.getSquare(4) === gameBoard.getSquare(6) !== " " ) {
            return true;
        }
        // CHECK FOR FULL BOARD
        else if (!(board.includes(" "))) {
            return true;
        }
        //else not over yet
        return false;
    }

     // add event listeners to squares
     for (let i=0; i<9; i++) {
        let ref = document.getElementById(`S${i}`)
        ref.addEventListener('click', () => {
            console.log(`square ${i} clicked`)
            if (gameBoard.getSquare(i) != " ") {
                return;
            }
            choice = i;
        })
    }

    // While loop that runs while 
    // won is false:
    let won = false;
    //while (won === false) {
      //  displayController.draw()
        //O.move(choice) 
        //}

}

displayController.draw()
game()
