const Gameboard = (function () {
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const reset = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameboard[i][j] = "";
      }
    }
  };
  return { gameboard, reset };
})();

const display = (function () {
  const board = document.getElementById("gameboard");

  const updateScore = function (scoreOfX, scoreOfO) {
    const scorex = document.getElementById("scoreboxX");
    const scoreo = document.getElementById("scoreboxO");
    scorex.textContent = scoreOfX;
    scoreo.textContent = scoreOfO;
  };
  function updateTurn(turn) {
    const x = document.getElementById("x");
    const o = document.getElementById("o");
    if (turn === "X") {
      x.style = "";
      o.style = "border-color:white;";
    } else {
      x.style = "border-color:white;";
      o.style = "";
    }
  }
  function image(x, y, text) {
    if (text !== "") {
      return text;
    }
    const res = game.draw(x, y);
    updateTurn(res);
    return res;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");

      cell.textContent = "";
      cell.addEventListener("click", () => {
        cell.textContent = image(j, i, cell.textContent);
      });
      board.appendChild(cell);
    }
  }
  const reset = function () {
    board.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");

        cell.textContent = "";
        cell.addEventListener("click", () => {
          cell.textContent = image(j, i, cell.textContent);
        });
        board.appendChild(cell);
      }
    }
  };
  const declare = function (str) {
    const box = document.getElementById("declareBox");
    const btn = document.getElementById("close");
    box.showModal();
    document.getElementById("declareSentence").textContent = str;
    btn.addEventListener("click", () => {
      box.close();
    });
  };
  return { reset, declare, updateScore };
})();

function player(name, marker) {
  let score = 0;
  return { name, marker, score };
}

const game = (function () {
  let player1 = player("X", "X");
  let player2 = player("O", "O");
  let turn = true;
  let round = 1;
  let count = 0;

  function declareWinner(marker) {
    if (round === 3) {
      if (marker === "X") {
        player1.score++;
        display.declare(player1.name + " won game");
      } else if (marker === "O") {
        player2.score++;
        display.declare(player2.name + " won game");
      }
      player1.score = 0;
      player2.score = 0;
      round = 1;
    } else if (marker === "X") {
      player1.score++;
      display.declare(player1.name + " won round " + round);
    } else if (marker === "O") {
      player2.score++;
      display.declare(player2.name + " won round " + round);
    }
    round++;
    display.updateScore(player1.score, player2.score);
    Gameboard.reset();
    display.reset();
    count = 0;
  }

  const checkWin = function () {
    for (let i = 0; i < 3; i++) {
      if (
        Gameboard.gameboard[i][0] === Gameboard.gameboard[i][1] &&
        Gameboard.gameboard[i][1] === Gameboard.gameboard[i][2] &&
        Gameboard.gameboard[i][0] !== ""
      ) {
        declareWinner(Gameboard.gameboard[i][0]);
      } else if (
        Gameboard.gameboard[0][i] === Gameboard.gameboard[1][i] &&
        Gameboard.gameboard[1][i] === Gameboard.gameboard[2][i] &&
        Gameboard.gameboard[0][i] !== ""
      ) {
        declareWinner(Gameboard.gameboard[0][i]);
      }
    }
    if (
      Gameboard.gameboard[0][0] === Gameboard.gameboard[1][1] &&
      Gameboard.gameboard[1][1] === Gameboard.gameboard[2][2] &&
      Gameboard.gameboard[0][0] !== ""
    ) {
      declareWinner(Gameboard.gameboard[0][0]);
    } else if (
      Gameboard.gameboard[0][2] === Gameboard.gameboard[1][1] &&
      Gameboard.gameboard[1][1] === Gameboard.gameboard[2][0] &&
      Gameboard.gameboard[0][2] !== ""
    ) {
      declareWinner(Gameboard.gameboard[0][2]);
    }
  };
  const draw = function (x, y) {
    let marker = "";

    if (turn) {
      marker = "X";
    } else {
      marker = "O";
    }
    if (Gameboard.gameboard[y][x] === "") {
      Gameboard.gameboard[y][x] = marker;
      count++;
    }
    checkWin();
    if (count >= 9) {
      display.declare("tie");
      Gameboard.reset();
      display.reset();
      count = 0;
    }
    turn = !turn;
    return marker;
  };
  return { draw, turn };
})();
