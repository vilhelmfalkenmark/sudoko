const game_DOMNODE = document.getElementById("game");

let gameBoard = [
  [null, null, null, null, 9, 7, 1, null, 3],
  [null, 1, 6, null, null, 4, null, null, null],
  [5, null, null, 2, null, null, null, null, null],
  [4, 7, 2, 9, null, null, null, null, 1],
  [null, null, null, null, null, null, null, null, null],
  [6, null, null, null, null, 3, 4, 7, 9],
  [null, null, null, null, null, 9, null, null, 7],
  [null, null, null, 5, null, null, 8, 6, null],
  [3, null, 5, 7, 8, null, null, null, null]
];

/**
 * @function writeInitGameBoard
 */
function writeInitGameBoard() {
  let i = 0;
  while (i < gameBoard.length) {
    let arr = gameBoard[i];
    let j = 0;

    while (j < arr.length) {
      const square = document.createElement("div");
      let className = "square";
      if ((i + 1) % 3 === 0) {
        className += " square-bottom";
      }
      if ((j + 1) % 3 === 0) {
        className += " square-right";
      }

      square.className = className;
      square.innerHTML = arr[j];

      if (arr[j] === null) {
        const input = document.createElement("input");
        input.id = `${j}-${i}`;
        input.className = "input";
        input.type = "number";
        input.min = 1;
        input.max = 9;
        input.addEventListener("input", checkInputValue);
        square.appendChild(input);
      } else {
        square.id = `${j}-${i}`;
      }
      game_DOMNODE.appendChild(square);
      j++;
    }
    i++;
  }
}

/**
 * @function highlightDuplicate
 */
function highlightDuplicate(x, y) {
  document.getElementById(`${x}-${y}`).classList.add("highlight");
}

/**
 * @function checkX
 */
function checkX(x, y, n) {
  let i = 0;
  while (i < 9) {
    if (gameBoard[y][i] === n) {
      highlightDuplicate(i, y);
      return false;
    }
    i++;
  }
  return true;
}

/**
 * @function checkY
 */
function checkY(x, y, n) {
  let i = 0;
  while (i < 9) {
    if (gameBoard[i][x] === n) {
      highlightDuplicate(x, i);
      return false;
    }
    i++;
  }
  return true;
}

/**
 * @function checkColumn
 */
function checkColumn(x, y, n) {
  let i = 0;
  while (i < 3) {
    let j = 0;
    while (j < 3) {
      if (n === gameBoard[y - (y % 3) + i][x - (x % 3) + j]) {
        highlightDuplicate(x - (x % 3) + j, y - (y % 3) + i);
        return false;
      }
      j++;
    }
    i++;
  }
  return true;
}

/**
 * @function checkSquare
 */
function checkSquare(x, y, n) {
  const validX = checkX(x, y, n);
  const validY = checkY(x, y, n);
  const validGrid = checkColumn(x, y, n);

  if (validX && validY && validGrid) {
    gameBoard[y][x] = n;
    return true;
  }

  return false;
}

/**
 * @function checkInputValue
 */
function checkInputValue(e) {
  const coords = this.id.split("-");
  const x = parseInt(coords[0]);
  const y = parseInt(coords[1]);
  const n = parseInt(e.target.value) || null;

  if (n === null) {
    this.className = "input";

    const hl = document.getElementsByClassName("highlight");

    let i = 0;
    while (i < hl.length) {
      hl[i].classList.toggle("highlight");
    }

    gameBoard[y][x] = null;
    return;
  }

  if (checkSquare(x, y, n)) {
    this.className = "input input-correct";
  } else {
    this.className = "input input-wrong";
  }
}

writeInitGameBoard();
