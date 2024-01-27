function main() {
  // Win Patterns
  let winPattrens = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // Accessing Main Box
  let mainBox = document.querySelector("#main");

  // Accessing Game Board
  let gameBoard = document.querySelector("#game-board");

  // Accessing Game Sounds
  let clickAudio = document.querySelector("#click-audio");
  let winAudio = document.querySelector("#win-audio");

  // Accessing Game Play-Close Buttons Box, Play Button and Close Button
  let playCloseBox = document.querySelector("#game-start");
  let playBtn = document.querySelector("#play");
  let closeBtn = document.querySelector("#close");

  // Accessing Game Cells Box and All Cells
  let cellsBox = document.querySelector("#cells-box");
  let allCells = cellsBox.querySelectorAll(".cell");

  // Accessing Game Control Box, Reset Button, Start Button and Winner Box
  let gameControlBox = document.querySelector("#game-control-box");
  let resetBtn = document.querySelector("#reset");
  let playAgainBtn = document.querySelector("#play-again");
  let winnerBox = document.querySelector("#winner-box");

  // Game Variables
  let check = true; // (X - first Turn)
  let count = 0;

  // Hiding Start Button and Winner Box
  playAgainBtn.classList.add("display-none");
  winnerBox.classList.add("display-none");

  // function to Dsiplay the Winner
  function displayWinner(winner = "") {
    // Hide Cells Box
    cellsBox.style.display = "none";

    // Hide Reset Button
    resetBtn.classList.add("display-none");

    // Show Play Again Button & Winner Box
    playAgainBtn.classList.remove("display-none");
    winnerBox.classList.remove("display-none");

    // Play Win Audio
    winAudio.play();

    // Hiding Game Board
    gameBoard.style.display = "none";

    // Assigning innerText to Winner Box
    winnerBox.innerText = `Congraluations, Winner is ${winner}`;
  }

  // function to Check the Game is Draw
  function checkDraw() {
    displayWinner();
    winnerBox.innerText = `Game Tie!`;
    count = 0;
  }

  // function to Check the Winner
  function checkWinner() {
    winPattrens.forEach((pattren) => {
      let posVal1 = allCells[pattren[0]].innerText;
      let posVal2 = allCells[pattren[1]].innerText;
      let posVal3 = allCells[pattren[2]].innerText;

      if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
        if (posVal1 === posVal2 && posVal2 === posVal3) {
          // Calling function to Display the Winner
          setTimeout(function () {
            displayWinner(posVal1);
          }, 300);
        }
      }
    });
  }

  // function After Starting the Game

  function startGame() {
    // Hiding Play-Close Buttons Box
    playCloseBox.classList.add("display-none");

    // Show Cells Box
    cellsBox.style.display = "grid";

    // Show Only Reset Button
    gameControlBox.style.display = "flex";

    // Iterate allCells NodeList
    allCells.forEach((cell) => {
      // Adding Event Listener on Each Cell
      cell.addEventListener("click", function () {
        if (check) {
          cell.innerText = "X";
          cell.disabled = true;
          check = false;
        } else {
          cell.innerText = "0";
          cell.disabled = true;
          check = true;
        }

        // Adding Click Sound on Button
        clickAudio.play();

        // Increment Count Value with Click on Each Cell
        count++;

        // Check if All Cells are filled then Calling the checkDraw function
        if (count === 9) {
          checkDraw();
        }

        // Calling function to Check the Winner
        checkWinner();
      });
    });
  }

  // Add Event Listener on Game Play Button
  playBtn.addEventListener("click", function () {
    clickAudio.play();
    startGame();
  });

  // Add Event Listener on Game Close Button
  closeBtn.addEventListener("click", function () {
    clickAudio.play();
    setTimeout(function () {
      window.close();
    }, 500);
  });

  // function to Reset the Game Values
  function resetGame() {
    allCells.forEach((cell) => {
      check = true;
      cell.innerText = "";
      cell.disabled = false;
      clickAudio.play();
      count = 0;
    });
  }

  // Add Event Listener on Game Reset Button
  resetBtn.addEventListener("click", resetGame);

  // Add Event Listener on Game Play Again Button
  playAgainBtn.addEventListener("click", function () {
    // Show Game Board
    gameBoard.style.display = "block";

    // Show Cells Box
    cellsBox.style.display = "grid";

    // Show Reset Button
    resetBtn.classList.remove("display-none");

    // Hide Play Again Button & Winner Box
    playAgainBtn.classList.add("display-none");
    winnerBox.classList.add("display-none");

    // Calling function to reset the Game Values
    resetGame();
  });
}

main();