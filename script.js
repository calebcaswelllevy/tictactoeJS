

let gameBoard = (function(){
    // initialize squares
    let squares = []
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
    // add event listeners to squares
    for (let i=0; i<9; i++) {
        let ref = document.getElementById(`S${i}`)
        ref.addEventListener('click', () => console.log(`square ${i} clicked`))
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

    //Check for winner
    function isWon() {
        //TO DO...
    }
    // While loop that runs while 
    // won is false:
    let won = true;
    while (won === false) {
        displayController.draw()
        makeMove(O) 
        }

}

displayController.draw()

