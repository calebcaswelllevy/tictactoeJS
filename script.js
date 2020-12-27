

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
            let s = document.getElementById(`${i}`);
            s.innerHTML = gameBoard.getSquare(i);
        }
    };
    return {
        draw,
    };
})()

displayController.draw()