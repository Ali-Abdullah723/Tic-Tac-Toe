const cells = document.querySelectorAll(".game-cell");
const result = document.querySelector(".result");
const board = (() => {
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  const playermove = (row, col) => {
    board[row][col] = "X";
    return board;
  };

  const getBoard = () => board;

  const aimove = () => {
    let changed = false;

    while (changed == false) {
      let col = getRandomInt(0, 3);
      let row = getRandomInt(0, 3);

      if (board[row][col] == " ") {
        board[row][col] = "O";
        const cell = document.querySelector(
          `[data-row="${row}"][data-col="${col}"]`,
        );
        cell.textContent = "O";
        changed = true;
      }
    }

    return board;
  };

  const checkwin = () => {
    // Player wins (X)
    if (
      (board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") ||
      (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") ||
      (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") ||
      (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") ||
      (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") ||
      (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") ||
      (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
      (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X")
    ) {
      return "Player 1 Wins";
    }

    // AI wins (O)
    if (
      (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O") ||
      (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O") ||
      (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O") ||
      (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") ||
      (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") ||
      (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O") ||
      (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
      (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
    ) {
      return "Player 2 Wins";
    }
  };

  return { playermove, aimove, checkwin, getBoard };
})();
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    board.playermove(row, col);
    cell.textContent = "X";
    if (board.checkwin() == "Player 1 Wins") {
      result.textContent = board.checkwin();
    }else if(board.checkwin() == "Player 2 Wins"){
      result.textContent = board.checkwin();
    }
    board.aimove();
  });
});
