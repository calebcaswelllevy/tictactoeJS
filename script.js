
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
    type="human"
    return {
        side:side,
        type:type,
    }
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
    let turnIndicator = document.getElementById('turn-indicator')

    //Check for winner
    function isWon() {
        //Check rows
        if (gameBoard.getSquare(0)===gameBoard.getSquare(1) === gameBoard.getSquare(2) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(3)===gameBoard.getSquare(4) === gameBoard.getSquare(5) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(6)===gameBoard.getSquare(7) === gameBoard.getSquare(8) !== " " ) {
            return true;
        }
        //Check Columns
        else if (gameBoard.getSquare(0)===gameBoard.getSquare(3) === gameBoard.getSquare(6) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(1)===gameBoard.getSquare(4) === gameBoard.getSquare(7) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(2)===gameBoard.getSquare(5) === gameBoard.getSquare(8) !== " " ) {
            return true;
        }

        // CHECK DIAGONALS
        else if (gameBoard.getSquare(0)===gameBoard.getSquare(4) === gameBoard.getSquare(8) !== " " ) {
            return true;
        } else if (gameBoard.getSquare(2)===gameBoard.getSquare(4) === gameBoard.getSquare(6) !== " " ) {
            return true;
        }
        
        //else not over yet
        return false;
    }

    function catsGame () {

        let board = [];
        for (let i=0; i<9; i++){
            board.push(gameBoard.getSquare[i])
        }
        // CHECK FOR FULL BOARD
        if (!(board.includes(" "))) {
            return true;
        }
        else {
            return false;
        }
    }

    // Recursion that runs until game is over:
    let player;
    let c = 0;
    function whosTurn() {
        let player;
        if (c % 2 === 0) { //even turn
            player = X;
        } else {// Odd turn
            player = O;
        }
        return player;
    }

    function humanPlay(player){

        //Add event listeners
        for (let i=0; i<9; i++) {
            let ref = document.getElementById(`S${i}`)
            ref.addEventListener('click', (e) => {
                console.log(`square ${i} clicked`)
                if (gameBoard.getSquare(i) === " ") {
                    choice = i;
                    gameBoard.setSquare(choice, player.side)
                }
                
            })
        }


    }

    function playTurn() {
        
        //Check is someone won last turn
        if (isWon()) {
            alert(`Congratulations ${player}`) 
    }
        //check if its a cat's game
      else if (catsGame()) {
          
      } 
      else 
      // the game is still going, play a turn
      { 
        player = whosTurn();
        turnIndicator.textContent = `${player}'s Turn`
        if (false) {
            //add in ai here
            //computerPlay(player)
        } else {
            humanPlay(player); 
        }
      }

    }


}

displayController.draw()
game()
