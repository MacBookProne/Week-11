let numPlays = 0;
let gameFinished = false;
let currentPlayer = 'X';
let currentPlays = {
    X: [],
    O: []
};

const positionWin = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function updatePlayerTurn() {
    $("#playerTurn").text(currentPlayer + "'s Turn");
}


function playAgain() {
    console.log("playAgain called");// making sure playAgain is called
    numPlays = 0;
    gameFinished = false;
    currentPlayer = 'X';
    currentPlays = {
        X: [],
        O: []
    };
    $(".square, #gameResult").text('');
    updatePlayerTurn(); // Update player turn
}

function showGameResult(type) {
    gameFinished = true;

    if (type === 'Win') {
        $("#gameResult").text('Winner is ' + currentPlayer);
    } else {
        $("#gameResult").text('Draw!');
    }
    $("#gameResult").append('<p id="playAgain" onClick="playAgain()">Play Again?</p>');
}


function isWinner() {
    if (numPlays < 5) return false; // No need to check < 5th play
    for (let i = 0; i < positionWin.length; i++) {
        let winCondition = positionWin[i];
        if (winCondition.every(index => currentPlays[currentPlayer].includes(index))) {
            return true; // Current player is winning
        }
    }
    return false; // No winner found
}

$(document).ready(function () {
    $('.square').on('click', function() {
        if (!gameFinished && $(this).text() === '') { // check if game is already over
            $(this).text(currentPlayer);
            currentPlays[currentPlayer].push(parseInt($(this).attr('data-index')));
            numPlays++; // Increment the number of plays

            if (isWinner()) {
                showGameResult('Win');
                return; // Stop further execution after win
            } else if (numPlays === 9) {
                showGameResult('Draw');
                return; // Stop further execution if draw
            }

            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            updatePlayerTurn();
        }
    });
    $(document).on('click', '#playAgain', function() {
        playAgain();
    });
});
