const cells = document.querySelectorAll(".game-cell");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");
class board {
  getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  constructor() {
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  }

  playermove(row, col) {
    if (this.board[row][col] !== " ") {
      return false;
    }

    this.board[row][col] = "X";
    return true;
  }
  getBoard() {
    return this.board;
  }
  resetBoard() {
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  }

  aimove() {
    let changed = false;

    while (changed == false) {
      let col = this.getRandomInt(0, 3);
      let row = this.getRandomInt(0, 3);

      if (this.board[row][col] == " ") {
        this.board[row][col] = "O";
        const cell = document.querySelector(
          `[data-row="${row}"][data-col="${col}"]`,
        );
        cell.textContent = "O";
        changed = true;
      }
    }

    return this.board;
  }

  checkwin() {
    // Player wins (X)
    if (
      (this.board[0][0] === "X" &&
        this.board[0][1] === "X" &&
        this.board[0][2] === "X") ||
      (this.board[1][0] === "X" &&
        this.board[1][1] === "X" &&
        this.board[1][2] === "X") ||
      (this.board[2][0] === "X" &&
        this.board[2][1] === "X" &&
        this.board[2][2] === "X") ||
      (this.board[0][0] === "X" &&
        this.board[1][0] === "X" &&
        this.board[2][0] === "X") ||
      (this.board[0][1] === "X" &&
        this.board[1][1] === "X" &&
        this.board[2][1] === "X") ||
      (this.board[0][2] === "X" &&
        this.board[1][2] === "X" &&
        this.board[2][2] === "X") ||
      (this.board[0][0] === "X" &&
        this.board[1][1] === "X" &&
        this.board[2][2] === "X") ||
      (this.board[0][2] === "X" &&
        this.board[1][1] === "X" &&
        this.board[2][0] === "X")
    ) {
      return "Player 1 Wins";
    }

    // AI wins (O)
    if (
      (this.board[0][0] === "O" &&
        this.board[0][1] === "O" &&
        this.board[0][2] === "O") ||
      (this.board[1][0] === "O" &&
        this.board[1][1] === "O" &&
        this.board[1][2] === "O") ||
      (this.board[2][0] === "O" &&
        this.board[2][1] === "O" &&
        this.board[2][2] === "O") ||
      (this.board[0][0] === "O" &&
        this.board[1][0] === "O" &&
        this.board[2][0] === "O") ||
      (this.board[0][1] === "O" &&
        this.board[1][1] === "O" &&
        this.board[2][1] === "O") ||
      (this.board[0][2] === "O" &&
        this.board[1][2] === "O" &&
        this.board[2][2] === "O") ||
      (this.board[0][0] === "O" &&
        this.board[1][1] === "O" &&
        this.board[2][2] === "O") ||
      (this.board[0][2] === "O" &&
        this.board[1][1] === "O" &&
        this.board[2][0] === "O")
    ) {
      return "Player 2 Wins";
    }
  }
}
const Board = new board();
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    // Player move
    const moved = Board.playermove(row, col);

    // Don't allow clicking an occupied cell
    if (!moved) return;

    cell.textContent = "X";

    // Check player win
    let winner = Board.checkwin();

    if (winner) {
      result.textContent = winner;
      return;
    }

    // AI move
    Board.aimove();

    // Check AI win
    winner = Board.checkwin();

    if (winner) {
      result.textContent = winner;
      return;
    }
  });
});
restart.addEventListener("click", () => {
  Board.resetBoard();
  cells.forEach((cell) => {
    cell.textContent = " ";
  });
  result.textContent = "";
});
