
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return true;
        }
    }

    return false;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (!gameActive || board[index] !== "") {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.disabled = true;

    if (checkWinner()) {
        statusText.textContent = "Player " + currentPlayer + " Wins! 🎉";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Player " + currentPlayer + "'s Turn";
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.disabled = false;
    });

    statusText.textContent = "Player X's Turn";
}

cells.forEach(function(cell) {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
