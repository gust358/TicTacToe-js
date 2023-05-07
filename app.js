let clientSymbol = "X";
let botSymbol = "O";
let symbol = clientSymbol;
let gameOver = false;

let winStates = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ]
]


function restart() {
    symbol = clientSymbol;
    gameOver = false;
    let squares = document.querySelectorAll(".square")
    squares.forEach((square) => {
        square.className = "square"
    });

}
function loadPlays() {
    let arr = [];
    let squares = document.querySelectorAll(".square")
    squares.forEach((square) => {
        arr.push(square.className)
    });
    return arr

}
function checkDraw(arr) {
    let allPlays = arr.filter((it) => { return it === "square" });
    if (allPlays.length === 0) {
        gameOver = true;
        setTimeout(() => {
            document.getElementById("winner").innerHTML = `${clientSymbol} ${botSymbol}`;
            document.getElementById("message").innerHTML = "Draw!";
            document.getElementById("result").style.display = "flex";
        }, 1000);
    }
}

function checkVictory(arr) {
    for (let i = 0; i < winStates.length; i++) {
        let seq = winStates[ i ];
        let pos1 = seq[ 0 ];
        let pos2 = seq[ 1 ];
        let pos3 = seq[ 2 ];
        if (arr[ pos1 ] === arr[ pos2 ] &&
            arr[ pos1 ] === arr[ pos3 ] &&
            arr[ pos1 ] !== "square") {
            gameOver = true;
            let placar = parseInt(localStorage.getItem(symbol));
            localStorage.setItem(symbol, placar + 1);
            setTimeout(() => {
                document.getElementById("winner").innerHTML = `${symbol}`;
                document.getElementById("message").innerHTML = "WINNER!";
                document.getElementById("result").style.display = "flex";
                document.getElementById(symbol).innerHTML = localStorage.getItem(symbol);
            }, 1000);
        }
    }
}
function updateClass(id) {
    let square = document.getElementById(id);
    square.className = `square ${symbol}`;
}

function opponent() {
    if (gameOver === false) {
        let arr = loadPlays();
        sweetSquares(arr);
        handleMove();
    }
}


function handleMove() {
    if (gameOver) {
        return;
    }
    let arr = loadPlays();
    checkVictory(arr);
    checkDraw(arr);
    if (gameOver === false) {
        symbol = (symbol === clientSymbol) ? botSymbol : clientSymbol;
        if (symbol === botSymbol) {
            setTimeout(() => { opponent() }, 1000);
        }
    }
};


function handleClick(event) {
    if (symbol === clientSymbol) {
        if (gameOver === false) {
            let position = event.target.id;
            let square = document.getElementById(position);
            if (square.className === "square") {
                square.className = `square ${symbol}`
            }
            let arr = loadPlays();
            checkVictory(arr);
            handleMove();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem(botSymbol, 0);
    localStorage.setItem(clientSymbol, 0);
    document.querySelectorAll(".square").forEach((it) => {
        it.addEventListener("click", handleClick)
    });
    document.getElementById("box").addEventListener("click", () => {
        document.getElementById("result").style.display = "none";
        restart();
    });
    document.getElementById("restart").addEventListener("click", restart);
})

