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
        let bestMove = '';
        let bestMoveVal = -1000;
        let moves = [];
        let board = [];
        let moveVals = [];

        //find empty squares and make board array
        for (let i = 0; i<9; i++) {
            board.push(gameBoard.getSquare(i));
            if (gameBoard.getSquare(i) === " ") {
                moves.push(i)
            }
        }
        //find best of possible  moves
        for (let i = 0; i<moves.length; i++) {
            let possibleBoard = board.slice();
            possibleBoard[moves[i]] = side;
        
            let currentMoveVal = miniMax(possibleBoard, "O", 0);
            moveVals.push(currentMoveVal)
            if (currentMoveVal > bestMoveVal) {
                bestMove = moves[i];
                bestMoveVal = currentMoveVal;
                console.log(`the best move is ${bestMove}\nIts value is ${currentMoveVal}`)
            }
        
        }
        console.log(`the value of possible moves: `, moveVals)
        return bestMove;
    }
    function findWin(board, moves) {
        for (let i = 0; i<moves.length; i++) {
            let newBoard = board.slice()
            newBoard[moves[i]] = "X"
            if (gameValue(newBoard, "X") == 1) {
                return 1;
            } 
        }
        return -1;
    }
    
    //run the minimax algorithm
    function miniMax(board, side, depth) {
        //base case
        if (catsGame(board) || (gameValue(board, "X") !== 0)) {
            
                return gameValue(board, "X");
        }

        // if it's the ai's turn
        
        if (side === "X") {
            return maximize(board, depth);
        }

        //else it's the humans turn
        else {
          //return minmize(board, depth);
          return minimize(board, depth);
        }

        function maximize(board, depth) {
            let bestVal = -1000;
            for (let i = 0; i<9; i++) {
                if (board[i] === " ") {
                    let testboard = board.slice()
                    testboard[i] = "X"
                    let value = miniMax(testboard, "O", depth+1)
                    if (value > bestVal){
                        bestVal = value;
                    }
                 }
            }
            return bestVal;
        }
        function minimize(board, depth) {
            let bestVal = 1000;
            
            for (let i = 0; i<9; i++) {
                if (board[i] === " ") {
                    let testboard = board.slice()
                    testboard[i] = "O"
                    let value = miniMax(testboard, "X", depth+1)
                    if ( bestVal > value ) {
                        bestVal = value;
                    }
                }
            }
            return bestVal;
        }
    
    }
    
    
    // get value of gamestate
    function gameValue(board, side) {
       
        //check rows:
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== " ")  {
            if (board[2] === side) {
                return 1;
            } else {
                return -1;
            }

        } else if (board[3] === board[4] && board[4] === board[5] && board[3] !== " ") {
            if (board[3] === side) {
                return 1;
            } else {
                return -1;
            }

        } else if (board[6] === board[7] && board[7] === board[8] && board[6] !== " ") {
            if (board[2] === side) {
                return 1;
            } else {
                return -1;
            }
        }
        
        // check columns:

        else if (board[0] === board[3] && board[3] === board[6] && board[0] !== " ")  {
            if (board[6] === side) {
                return 1;
            } else {
                return -1;
            }

        } else if (board[1] === board[4] && board[4] === board[7] && board[1] !== " ") {
            if (board[7] === side) {
                return 1;
            } else {
                return -1;
            }
            
        } else if (board[2] === board[5] && board[5] === board[7] && board[2] !== " ") {
            if (board[2] === side) {
                return 1;
            } else {
                return -1;
            }
        }

        // check diagonals
        else if (board[0] === board[4] && board[4] === board[8] && board[0] !== " ")  {
            if (board[8] === side) {
                return 1;
            } else {
                return -1;
            }

        } else if (board[2] === board[4] && board[4] === board[7] && board[2] !== " ") {
            if (board[7] === side) {
                return 1;
            } else {
                return -1;
            }
            
        } else {
            return 0;
        }
    }
    //put the move on the board
    function makeMove(move, side) {
        gameBoard.setSquare(move, side)
    }

    function catsGame (board) {

        if (!(board.includes(" "))) {
            return true;
        }
        else {
            return false;
        }
    }

    //put all the parts together and make a move
    function play(c) {
        let move = findBestMove(gameBoard, "X");
        makeMove(move, "X");
        displayController.draw();
        gameControl.playTurn(!c, gameControl.getMode());
        
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
