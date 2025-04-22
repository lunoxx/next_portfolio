window.onload = function() {

    var reloading = sessionStorage.getItem("reloading");

    if (reloading) {
        
        // Player 1:
        var randomNumber1 = 1 + Math.floor(Math.random() * 6);
        document.querySelector(".dice .img1").setAttribute("src", "images/dice" + randomNumber1 + ".png");

        // Player 2:
        var randomNumber2 = 1 + Math.floor(Math.random() * 6);
        document.querySelector(".dice .img2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

        var winnerText = [], 
            name1 = sessionStorage.getItem("player1"),
            name2 = sessionStorage.getItem("player2");

        document.getElementsByTagName("p")[0].innerHTML = "Player 1: " + name1;
        document.getElementsByTagName("p")[1].innerHTML = "Player 2: " + name2;

        if(randomNumber1 > randomNumber2) winnerText = "&#128681 " + name1 + " Wins";
        else if(randomNumber2 > randomNumber1) winnerText = name2 + " Wins &#128681";
        else winnerText = "Draw!";

        document.getElementsByTagName("h1")[0].innerHTML = winnerText;
    }
    else {
        var name1 = prompt("Please enter first player name:");
        var name2 = prompt("Please enter second player name.");

        sessionStorage.setItem("reloading", true);
        sessionStorage.setItem("player1", name1);
        sessionStorage.setItem("player2", name2);
    }
}


