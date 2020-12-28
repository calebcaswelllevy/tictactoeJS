


let gameBoard = (function(){
    // initialize squares
    let squares = [];
    let choice = '';

    
    // change square value
    function setSquare(square, player) {
        squares[square] = player;
    }

    // retrieve square value
    function getSquare(square) {
        return squares[square]
    }

    function reset() {
        squares = [];
        for (let i=0; i<9; i++){
            squares.push(" ");
        }
        displayController.draw();
        return;
    }
   

    return {
        setSquare,
        getSquare,
        reset,
    }
})();



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


// The functions to control game flow
// are encapsulated in game()

function game() {
    //to hold player info
    function playerObject(side) {
        type="human"
        return {
            side:side,
            type:type,
        }
    }

    //create player objects
    let X = playerObject('X');
    let O = playerObject('O');
    let choice = ""
    let turnIndicator = document.getElementById('turn-indicator')

    //Check for winner
    function isWon() {
        let board = [];
        for (let i = 0; i<9; i++){
            board.push(gameBoard.getSquare(i))
        }
        //Check rows
        if ((board[0]===board[1]) && (board[1] === board[2]) && (board[2] !== " " )) {
            return true;
        } else if ((board[3]===board[4]) && (board[4] === board[5]) && (board[5] !== " " )) {

            return true;
        } else if ((board[6]===board[7]) && (board[7] === board[8]) && (board[8] !== " " )) {
            return true;
        }
        //Check Columns
        else if ((board[0]===board[3]) && (board[3] === board[6]) && (board[6] !== " " )) {
            return true;
        } else if ((board[1]===board[4]) && (board[4] === board[7]) && (board[7] !== " " )) {
            return true;
        } else if ((board[2]===board[5]) && (board[5] === board[8]) && (board[8] !== " " )) {
            return true;
        }

        // CHECK DIAGONALS
        else if ((board[0]===board[4]) && (board[4] === board[8]) && (board[8] !== " " )) {
            return true;
        } else if ((board[2]===board[4]) && (board[4] === board[6]) && (board[6] !== " " )) {
            return true;
        }
        
        //else not over yet
        return false;
    }

    function catsGame () {

        let board = [];
        for (let i=0; i<9; i++){
            board.push(gameBoard.getSquare(i));
        }
        // CHECK FOR FULL BOARD
        if (!(board.includes(" "))) {
            console.log(board);
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
        c++;
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
                    displayController.draw()
                    playTurn()
                }
                
            })
        }


    }

    function playTurn() {
        
        //Check is someone won last turn
        if (isWon()) {
            alert(`Congratulations ${player}`) 
            return;
    }
        //check if its a cat's game
      else if (catsGame()) {
          alert('Cats Game')
          return;
      } 
      else 
      // the game is still going, play a turn
      { 
        player = whosTurn();
        turnIndicator.textContent = `${player.side}'s Turn`
        if (false) {
            //add in ai here
            //computerPlay(player)
        } else {
            humanPlay(player); 
               
        }
        //Draw result of last move
        
         
        
        return;
        

      }

    }
//game() starts turns:
playTurn()
return;
}

function setUp() {
gameBoard.reset()
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', gameBoard.reset);
let playButton = document.getElementById('play');
playButton.addEventListener('click', game)
}
setUp();
