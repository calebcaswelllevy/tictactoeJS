


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

    function listen(player, c) {
    
        return (e) => {
            let i = e.target.id[1]
            if (gameBoard.getSquare(i) === " ") {
                choice = i;
                gameBoard.setSquare(choice, player.side)
                displayController.draw()

                gameControl.playTurn(c)
            }
            
        }
    }

    
    

    function reset() {
        //clear squares
        squares = [];
        for (let i=0; i<9; i++){
            squares.push(" ");
        }
        //Clear turn indicator
        turnIndicator = document.getElementById('turn-indicator');
        turnIndicator.textContent = ""

        //Draw the board again
        displayController.draw();

        //clone nodes to remove event listeners to prevent further play
        for (let i = 0; i<9; i++) {
            let ref = document.getElementById(`S${i}`)
            let newRef = ref.cloneNode(true);
            ref.parentNode.replaceChild(newRef, ref);
        }
        return;
    }
   

    return {
        setSquare,
        getSquare,
        reset,
        listen,
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

let gameControl = (function() {
    //to hold player info
    function playerObject(side) {
        type="human"
        return {
            side:side,
            type:type,
        }
    }

    

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
    
    function whosTurn(c) {
        let player;
        if (c) { //X's turn
            player = playerObject('X');
        } else {// Odd turn
            player = playerObject('O');
        }
        c = !c
        return {player, c};
    }

    function humanPlay(player, c){
        console.log('humanPlay')
        
        //Add event listeners
        for (let i=0; i<9; i++) {
            //clone nodes to replace event listeners
            let ref = document.getElementById(`S${i}`)
            let newRef = ref.cloneNode(true);
            ref.parentNode.replaceChild(newRef, ref);

            //add new event listeners to new nodes
            newRef.addEventListener('click', gameBoard.listen(player, c));
        }

    }

    function playTurn(c) {
        console.log(`c inside playTurn is ${c}`)
        //Check if someone won last turn
        if (isWon()) {
            
            let indicator = document.getElementById('turn-indicator');
            indicator.textContent = ` ${player.side} Wins!`

            //clone nodes to replace event listeners to prevent further play
            for (let i = 0; i<9; i++) {
                let ref = document.getElementById(`S${i}`)
                let newRef = ref.cloneNode(true);
                ref.parentNode.replaceChild(newRef, ref);
            }
            
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
        console.log(`c before whoseturn is called is ${c}`)
        player = whosTurn(c).player;
       
        c = whosTurn(c).c;
        console.log(`c after change is ${c}`)
        
        turnIndicator.textContent = `${player.side}'s Turn`
        if (false) {
            //add in ai here
            //computerPlay(player)
        } else {
            humanPlay(player, c); 
               
        }
        //Draw result of last move
        
         
        
        return;
        

      }

    }

    return {
        playerObject,
        isWon,
        whosTurn,
        catsGame,
        playTurn,
        humanPlay,
        
    }
})()
//game() starts turns:


function game(){
    //Initialize counter to tell who's turn it is
    let c = false;
  
    //create player objects
    let X = gameControl.playerObject('X');
    let O = gameControl.playerObject('O');
    let choice = ""

    //Show who's up
    let turnIndicator = document.getElementById('turn-indicator')

    gameControl.playTurn(c);
}

function setUp() {
gameBoard.reset()
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', gameBoard.reset);
let playButton = document.getElementById('play');
playButton.addEventListener('click', game)
}

setUp();
