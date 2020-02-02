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


for (let gameBoard of gameBoardSquare) {
    gameBoard.addEventListener('click', function (event) {
        let pressed = event.target;
        console.log(pressed.getAttribute("class"), pressed);
        if (sessionStorage.currentTurn === 'X'){
            pressed.textContent = xSymbol.innerHTML;
            sessionStorage.currentTurn ='O';
            pressed.setAttribute("style", "pointer-events: none;")
        } else if(sessionStorage.currentTurn === 'O') {
            pressed.textContent = oSymbol.innerHTML;
            sessionStorage.currentTurn='X';
            pressed.setAttribute("style", "pointer-events: none;")
        }



    });
}