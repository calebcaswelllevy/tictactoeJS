//To do:
//implement minimax functinos
//implement play type choice


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

                gameControl.playTurn(c, gameControl.getMode())
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
let ai = (function(){
    
    //go through each move and evaluate it using miniMax
    function findBestMove(gameBoard, side){
        let bestMove = null;
        let bestMoveVal = -1000
        let moves = [];
        let board = [];

        //find empty squares and make board array
        for (let i = 0; i<9; i++) {
            board.push(gameBoard.getSquare(i));
            if (gameBoard.getSquare(i) === " ") {
                moves.push(i)
            }
        }
        
        //find best of possible  moves
        for (let i = 0; i<moves.length; i++) {
            let possibleBoard = board;
            possibleBoard[moves[i]] = side;
            let currentMoveVal = miniMax(possibleBoard, side);
            if (currentMoveVal > bestMoveVal) {
                bestMove = moves[i];
            }
        return bestMove;
        }
    }
    function miniMax(board, side) {
        //to Do
        return gameValue(board, side);
    }

    function gameValue (board, side){
        //To Do:
        return 0;
    }

    function makeMove(move, side) {
        gameBoard.setSquare(move, side)
    }

    function play(player, c) {
        let move = findBestMove(gameBoard, player.side);
        makeMove(move, player.side);
        displayController.draw();
        gameControl.playTurn(c, gameControl.getMode());
        
    }

    return {//module functions
        findBestMove,
        miniMax,
        gameValue,
        makeMove,
        play,
    }
})();

let gameControl = (function() {
    //to hold player info
    function playerObject(side) {
        let type;
        if (side === "X") {
         type =  gameControl.getMode();
        } else {
         type = "human";
        }
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
    function getMode(){
        let mode;
        let miniMaxbutton = document.getElementById("minimax")
        if (miniMaxbutton.checked) {
            mode = 'minimax'
        }
        let humanButton = document.getElementById("human")
        if (humanButton.checked) {
            mode = 'human'
        }
        return mode;
    }
    function playTurn(c, mode) {
       console.log(mode);
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
        
        let indicator = document.getElementById('turn-indicator');
        indicator.textContent = "Cat's Game!"
        return;
      } 
      else 
      // the game is still going, play a turn
      { 
       
        player = whosTurn(c).player;
       
        c = whosTurn(c).c;
      
        
        turnIndicator.textContent = `${player.side}'s Turn`
        if ((mode === "minimax") && (player.type !== "human")) {
            ai.play(player, c)
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
        getMode,
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
    let turnIndicator = document.getElementById('turn-indicator');

    //play a human or ai:
    let mode = gameControl.getMode();   

    //play the game
    gameControl.playTurn(c, mode);
}

function setUp() {
gameBoard.reset()
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', gameBoard.reset);
let playButton = document.getElementById('play');
playButton.addEventListener('click', game)
}

setUp();
