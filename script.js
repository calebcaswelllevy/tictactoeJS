

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

    //retrieve indexed array copy
    function getArray() {
        fooSquares = squares.slice()
        for (let i = 0; i<9; i++) {
            if (fooSquares[i] === " ") {
                fooSquares[i] = i;
            }
        }
        return fooSquares;
    }

    //add event listeners to board squares
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

    
    
    //Start game over
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
        getArray,
        getSquare,
        reset,
        listen,
    }
})();


// Module to draw the board ui
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


//Module for ai moves
// currently only minimax is implemented
let ai = (function(){
    

    //put the move on the board
    function makeMove(move, side) {
        gameBoard.setSquare(move, side)
    }

    //stand in for random moves ai module
    let random = (function(){
        //TO DO
        return {}
    })()

    // stand in for Q learning AI:
    let ql = (function(){
        //TO DO
        return {}
    })()

    //holder module to encapsulate miniMax functions
    let mm = (function(){

        // human
        let huPlayer = "O";
        
        // ai
        let aiPlayer = "X";
        
        // returns list of the indexes of empty spots on the board
        function emptyIndices(board){
            return  board.filter(s => s != "O" && s != "X");
          }
        
        // winning combinations using the board indexies
        function winning(board, player){
            if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
            ) {
            return true;
            } else {
            return false;
            }
           }
        
           // the main minimax function
        function minimax(newBoard, player){

            //available spots
            let availSpots = emptyIndices(newBoard);
        
            // checks for the terminal states such as win, lose, and tie 
          //and returning a value accordingly
          if (winning(newBoard, huPlayer)){
         
            return {score:-10};
         }
           else if (winning(newBoard, aiPlayer)){

           return {score:10};
           }
         else if (availSpots.length === 0){

             return {score:0};
         }
         // an array to collect all the objects
         let moves = [];
        
         // loop through available spots
         for (let i = 0; i < availSpots.length; i++){
            //create an object for each and store the index of that spot 
            let move = {};
              move.index = newBoard[availSpots[i]];
        
            // set the empty spot to the current player
            newBoard[availSpots[i]] = player;
            
            /*collect the score resulted from calling minimax 
              on the opponent of the current player*/
            if (player == aiPlayer){
              let result = minimax(newBoard, huPlayer);
              move.score = result.score;
            }
            else{
              let result = minimax(newBoard, aiPlayer);
              move.score = result.score;
            }
        
            // reset the spot to empty
            newBoard[availSpots[i]] = move.index;
        
            // push the object to the array
            moves.push(move);
          }
          // if it is the computer's turn loop over the moves and choose the move with the highest score
          let bestMove;
          if(player === aiPlayer){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
              if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
              }
            }
          } else {
              // else loop over the moves and choose the move with the lowest score
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
              if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
              }
            }
          }
        
            // return the chosen move (object) from the moves array
            return moves[bestMove];
        
        }
        return {
            minimax,
            winning,
        }
        })()
    //put all the parts together and make a move
    function play(c) {
        let move = mm.minimax(gameBoard.getArray(), "X");
        makeMove(move.index, "X");
        displayController.draw();
        gameControl.playTurn(!c, gameControl.getMode()); 
    }

    return {//module functions
        makeMove,
        play,
        mm,
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
