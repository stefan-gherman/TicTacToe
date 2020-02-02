//alert('You should write code into "static/js/game.js" to make it work');

sessionStorage.setItem("currentTurn", "X")


retryButton = document.getElementById("retry-button");

retryButton.addEventListener("click", function(event){
    sessionStorage.currentTurn = "X";
    window.location.reload(true);
});

const gameBoardSquare = document.querySelectorAll('.game-cell');

const xSymbol = document.createElement("p");
xSymbol.setAttribute("style", "font-size:24px;")
xSymbol.textContent = "X"

const oSymbol = document.createElement("p");
oSymbol.setAttribute("style", "font-size:24px;")
oSymbol.textContent = "O"


const gameBoard = document.getElementById("game-board");
const rowNumber = parseInt(gameBoard.dataset.rowNum);
const colNumber = parseInt(gameBoard.dataset.colNum);
const victoryCond = parseInt(gameBoard.dataset.winSize);

sessionStorage.squaresLeft = rowNumber * colNumber;



let boardRepresentation = []


for (let i = 0; i< rowNumber; i++){
    boardRepresentation.push([])
    for( let j = 0; j< colNumber; j++){
        boardRepresentation[i].push('*');
    }
}

const verifyWinner = (arr, xVal, yVal, points) => {
    let valO = 0;
    let valX = 0;

    for (let i =0; i< xVal; i++){
        for (let j=0; j<yVal; j++){
            if (arr[i][j] === 'X'){
                valX += 1;
            } else if (arr[i][j] === 'O'){
                valO += 1;
            }

        }
         if (valX === points){
                return 'X';
            } else if(valO === points){
                return 'O';
            }
        valX = 0;
        valO = 0;
    }
    valX=0;
    valO=0;

    for (let i =0; i< yVal; i++){
        for (let j=0; j< xVal; j++){
            if (arr[j][i] === 'X'){
                valX += 1;
            } else if (arr[j][i] === 'O'){
                valO += 1;
            }
        }
         if (valX === points){
                return 'X';
            } else if(valO === points){
                return 'O';
            }
        valX = 0;
        valO = 0;
    }
    valX = 0;
    valO = 0;


    if (xVal === yVal) {
        for(let i = 0; i< xVal; i++){
            for (let j = 0; j< xVal; j++){
                if (i === j){
                    if (arr[i][j] === 'X'){
                        valX += 1;
                    } else if (arr[i][j] === 'O'){
                        valO += 1;
                    }

                }
            }

            if (valX === points){
                return 'X';
            } else if(valO === points){
                return 'O';
            }

        }
        valX = 0;
        valO = 0;

        for(let i = 0; i< xVal; i++){
            for (let j =0; j< xVal; j++){
                if (j === xVal - i - 1 ){
                    if (arr[i][j] === 'X'){
                        valX += 1;
                    } else if (arr[i][j] === 'O'){
                        valO += 1;
                    }
                }

            }
            if (valX === points){
                return 'X';
            } else if(valO === points){
                return 'O';
            }
        }

    }


    return false;
}

const disableBoxes = (arr) => {
    for (let innerArr of arr){
        innerArr.setAttribute("style", "pointer-events: none;");
    }
}

const disableHandler = () => {
    disableBoxes(gameBoardSquare);
}

console.log(sessionStorage.squaresLeft);
for (let gameBoard of gameBoardSquare) {


    gameBoard.addEventListener('click', function (event) {
        let pressed = event.target;
        console.log(pressed.getAttribute("class"), pressed);

        if (sessionStorage.currentTurn === 'X'){
            sessionStorage.squaresLeft -= 1;
            pressed.innerHTML = xSymbol.innerHTML;
            sessionStorage.currentTurn ='O';
            pressed.setAttribute("style", "pointer-events: none;");
            boardRepresentation[parseInt(pressed.dataset.coordinateY)][parseInt(pressed.dataset.coordinateX)] = xSymbol.innerHTML;
            let winner =  verifyWinner(boardRepresentation,rowNumber,colNumber,victoryCond);
            if ( winner != false){
                pressed.innerHTML = xSymbol.innerHTML;
                disableHandler();
                setTimeout(function () {alert(winner + " Won!");}, 250);

            }
        } else if(sessionStorage.currentTurn === 'O') {
            pressed.innerHTML = oSymbol.innerHTML;
            sessionStorage.squaresLeft -= 1;
            sessionStorage.currentTurn='X';
            pressed.setAttribute("style", "pointer-events: none;");
            boardRepresentation[parseInt(pressed.dataset.coordinateY)][parseInt(pressed.dataset.coordinateX)] = oSymbol.innerHTML;
            let winner =  verifyWinner(boardRepresentation,rowNumber,colNumber,victoryCond);
            if ( winner != false){
                pressed.innerHTML = oSymbol.innerHTML;
                disableHandler();
                setTimeout(function () {alert(winner + " Won!");}, 250);

            }
        }
        
        if (parseInt(sessionStorage.squaresLeft) < 1) {
            disableHandler();
            setTimeout(function () {alert("It's a tie!");}, 250);
        }


    });
}
