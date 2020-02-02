//alert('You should write code into "static/js/game.js" to make it work');

sessionStorage.setItem("currentTurn", "X")

retryButton = document.getElementById("retry-button");

retryButton.addEventListener("click", function(event){
    sessionStorage.currentTurn = "X";
    window.location.reload(true);
});