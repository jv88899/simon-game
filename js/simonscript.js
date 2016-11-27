// global variables
var computerChoice = [];
var humanChoice = [];
var color = "";
var turnCount = 0;
var internalCount = 0;
var gameRunning = false;
var strictMode = false;
var inPlay = false;

// set audio
var greenBeep = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redBeep = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowBeep = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueBeep = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

// pre game functions
// 1. Turn the game on
$("#check").on("click", function () {
    if ($("#check").is(":checked")) {
        gameRunning = true;
    } else {
        gameRunning = false;
        resetGame("game turned off");
    }
});

// 2. Set strict mode
$(".strict-button").on("click", function () {
    if (gameRunning === true && strictMode === true) {
        strictMode = false;
        $(".strict-indicator").removeClass("on");
    } else if (gameRunning === true && strictMode === false) {
        strictMode = true;
        $(".strict-indicator").addClass("on");
    }
});

// game functions
// 1. Start the game
$(".start-button").on("click", function () {
    if (gameRunning === true && inPlay === false) {
        inPlay = true;
        playTheGame();
    } else if (gameRunning === true && inPlay === true) {
        inPlay = false;
        resetGame("start new game");
    }
});

// 2. Generate a random number that becomes a color
function getColor() {
    var randomNumber = Math.floor((Math.random() * 4) + 1);

    if (randomNumber === 1) {
        color = "green";
    } else if (randomNumber === 2) {
        color = "red";
    } else if (randomNumber === 3) {
        color = "yellow";
    } else if (randomNumber === 4) {
        color = "blue";
    } else {
        alert("An error occured while creating a color");
    }
    return color;
};

// 3. Play the colors
function playColors() {
    var count = 0;
    if (count < computerChoice.length) {
        setInterval(function () {
            if (computerChoice[count] === "green") {
                greenBeep.play();
                $("#green").addClass("darkgreen");
                setTimeout(function () {
                    $("#green").removeClass("darkgreen");
                }, 500)
            } else if (computerChoice[count] === "red") {
                redBeep.play();
                $("#red").addClass("darkred");
                setTimeout(function () {
                    $("#red").removeClass("darkred");
                }, 500)
            } else if (computerChoice[count] === "yellow") {
                yellowBeep.play();
                $("#yellow").addClass("darkyellow");
                setTimeout(function () {
                    $("#yellow").removeClass("darkyellow");
                }, 500)
            } else if (computerChoice[count] === "blue") {
                blueBeep.play();
                $("#blue").addClass("darkblue");
                setTimeout(function () {
                    $("#blue").removeClass("darkblue");
                }, 500)
            }
            count++;
        }, 1000)
    }
}

// 4. Play the game
function playTheGame() {
    turnCount++;
    $(".score-tracker").text(turnCount);
    getColor();
    computerChoice.push(color);
    playColors();
    internalCount = 0;
    humanChoice = [];

    if (turnCount === 21) {
        alert("Game Over. You win.");
    }
};

// 5. Human choice
$(".squares").on("click", function (e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        if (clickedItem === "green") {
            $("#" + clickedItem).addClass("darkgreen");
            greenBeep.play();
            setTimeout(function () {
                $("#" + clickedItem).removeClass("darkgreen");
            }, 250)
            humanChoice.push(clickedItem);
            internalCount++;
            checkAnswer();
        } else if (clickedItem === "red") {
            $("#" + clickedItem).addClass("darkred");
            redBeep.play();
            setTimeout(function () {
                $("#" + clickedItem).removeClass("darkred");
            }, 250)
            humanChoice.push(clickedItem);
            internalCount++;
            checkAnswer();
        } else if (clickedItem === "yellow") {
            $("#" + clickedItem).addClass("darkyellow");
            yellowBeep.play();
            setTimeout(function () {
                $("#" + clickedItem).removeClass("darkyellow");
            }, 250)
            humanChoice.push(clickedItem);
            internalCount++;
            checkAnswer();
        } else if (clickedItem === "blue") {
            $("#" + clickedItem).addClass("darkblue");
            blueBeep.play();
            setTimeout(function () {
                $("#" + clickedItem).removeClass("darkblue");
            }, 250)
            humanChoice.push(clickedItem);
            internalCount++;
            checkAnswer();
        }
    }
    e.stopPropagation();
})

// 6. Compare human vs computer
function checkAnswer() {
    if (turnCount === 1) {
        if (humanChoice[0] === computerChoice[0]) {
            playTheGame();
        } else if (humanChoice[0] !== computerChoice[0]) {
            if (strictMode) {
                resetGame("loss");
            } else if (!strictMode) {
                alert("That is an incorrect choice. Watch the pattern and try again.");
                humanChoice = [];
                playColors();
            }
        }
    } else if (internalCount < turnCount) {
        if (humanChoice[internalCount - 1] !== computerChoice[internalCount - 1]) {
            if (strictMode) {
                resetGame("loss");
            } else if (!strictMode) {
                alert("That is an incorrect choice. Watch the pattern and try again.");
                humanChoice = [];
                internalCount = 0;
                playColors();
            }
        }
    } else if (internalCount === turnCount) {
        if (humanChoice[internalCount - 1] !== computerChoice[internalCount - 1]) {
            if (strictMode) {
                resetGame("loss");
            } else if (!strictMode) {
                alert("That is an incorrect choice. Watch the pattern and try again.");
                humanChoice = [];
                internalCount = 0;
                playColors();
            }
        } else {
            playTheGame();
        }
    }
}

// 7. Reset the game
function resetGame(reason) {
    computerChoice = [];
    humanChoice = [];
    color = "";
    turnCount = 0;
    internalCount = 0;
    $(".score-tracker").text(turnCount);

    if (reason === "loss") {
        alert("You lost. Click Start to begin again.");
        inPlay = false;
    } else if (reason === "start new game") {
        inPlay = true;
        playTheGame();
        alert("New game started.");
    } else if (reason === "game turned off") {
        gameRunning = false;
        strictMode = false;
        inPlay = false;
    }
};
