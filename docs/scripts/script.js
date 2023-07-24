window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  restartButton.addEventListener("click", function () {
    location.reload();
  });

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.rocket.directionX = -8;
            break;
          case "ArrowUp":
            game.rocket.directionY = -8;
            break;
          case "ArrowRight":
            game.rocket.directionX = 8;
            break;
          case "ArrowDown":
            game.rocket.directionY = 8;
            break;
        }
      }
    }
  }


  function handleKeyup(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.rocket.directionX = 0;
            break;
          case "ArrowUp":
            game.rocket.directionY = 0;
            break;
          case "ArrowRight":
            game.rocket.directionX = 0;
            break;
          case "ArrowDown":
            game.rocket.directionY = 0;
            break;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);

};
