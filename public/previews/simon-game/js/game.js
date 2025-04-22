
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// Let`s start the game
$(document).keypress(function() {
    if(!started) {
        nextSequence();
        started = true;
    }
});

// Get clicked button
$('.btn').click(function() {

    // Save user clicked buttons
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress($(this));
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    // reset user clicked pattern on every level-up
    userClickedPattern = [];

    level ++;
    $('#level-title').text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function gameOver() {
    started = false;
    level = 0;

    gamePattern = [];
    userClickedPattern = [];

    $(document.body).addClass("game-over");
    setTimeout(function() {
        $(document.body).removeClass("game-over");
    }, 200)

    $("#level-title").text("Game Over, Press Any Key to Restart");
}

function checkAnswer(currentLevel) {

    // check if last button pressed is correct
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // if first check is passed, check that they have finished their sequence with
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } 
    else gameOver();
}

// Add / Remove Animation
function animatePress(elem) {

    elem.addClass("pressed");
    
    setTimeout(function() {
        elem.removeClass("pressed");
    }, 100);
}

function playSound(soundName) {
    var audio = new Audio('../sounds/'+ soundName +'.mp3');
    return audio.play();
}