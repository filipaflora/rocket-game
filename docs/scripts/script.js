window.onload = function () {
  //this sets up an event listener to execute a function when the window has finished loading. window.onload is an event which is necessary to ensure that JS code is executed only after the entire HTML document and its resources (images, styling and scripts) have finished loading. It is useful when you want to perform actions or maniuplate elements on the page that rely on the presence and availability of all HTML elements and external resources.

  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  

  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  //this function creates a new game by creating a new class of games, then calling on the start() method within the game class
  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }
  ///location.reload() is a built-in javaScript method that reloads or refreshes the current web page. When it is called, the webpage is reloaded from the server and all the resources (HTML, CSS, JS, images) are fetched again, effectively resetting the page to its inital state
  restartButton.addEventListener("click", function () {
    location.reload();
  });

 
  //Function that handles keydown (pressing a key) events. Event is a placehodler and anything can be used instead
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeyStrokes.includes(key)) {
      // prevent the default key actions from happening
      //in this case, it's scroll-up/down/left/right in the browser window
      event.preventDefault();

      if (game) {
        switch (key) {
          // amount of pixels that the rocket moves and direction when we press the keys 
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
  //Function that handles keyup (pressing a key) events. Event is a placehodler and anything can be used instead
  function handleKeyup(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    // prevent the default key actions from happening
    //in this case, it's scroll-up/down/left/right in the browser window
    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      if (game) {
        switch (key) {
          // amount of pixels that the rocket moves and direction when we press the keys 
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
// associate the handleKeydown function with the eventListener
// associate the handleKeyup function with the eventListener
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
