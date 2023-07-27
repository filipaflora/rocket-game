class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameContainer = document.getElementById("game-container");

    this.rocket = new Rocket(
      this.gameScreen,
      550,
      800,
      100,
      150,
      "docs/images/rocket.png"
    );
    
    // Style for the game board
    this.width = 1200;
    this.height = 700;

    this.planet = [];
    this.star = [];
    this.fire = [];
    this.blackhole = [];

    // flag about pushing obstacles it prevents us from pushing multiple simultaneously obstacles
    this.isPushingPlanet = false;
    this.isPushingStar = false;
    this.isPushingFire = false;
    this.isPushingBlackhole = false;

    this.score = 0;
    this.lives = 5;
    this.fireCounter = 0;

    this.gameIsOver = false;

    this.firstStarPush = true;
    this.firstFirePush = true;
    this.firstBlackholePush = true;

    // background music
    this.backgroundMusic = null;
    this.planetAudio = new Audio("/docs/sounds/planet-audio.mp3");
    this.starAudio = new Audio("/docs/sounds/star-audio.mp3");
    this.fireAudio = new Audio("/docs/sounds/fire-audio.mp3");
    this.blackholeAudio = new Audio("/docs/sounds/blackhole-audio.mp3");
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.backgroundMusic = document.createElement("audio");
    this.backgroundMusic.src = "/docs/sounds/background-audio.mp3";
    this.gameScreen.appendChild(this.backgroundMusic);
    this.backgroundMusic.play();

    // STAR
    // pushes one star in a static location
    // included in start() method so it only pushes one star at a time 
    setInterval(() => {
      this.star.push(new Star(this.gameScreen));
      this.isPushingStar = false;
      // console.log("pushing star");
      // console.log("stars array when pushing:", this.star);
    }, 3000);

    // removes the star after a specific time interval 
    setTimeout(() => {
      setInterval(() => {
        if (this.firstStarPush) {
          this.firstStarPush = false;
          this.star[0].element.remove();
          this.star.splice(0, 1);
          // console.log("removing star");
          // console.log("stars array when removing:", this.star);
        } else if (this.star.length != 0) {
          this.star[0].element.remove();
          this.star.splice(0, 1);
          // console.log("removing star");
          // console.log("stars array when removing:", this.star);
        }
      }, 3000);
    }, 2000);

    // FIRE
    //pushes one fire in a pre-determined location
    setInterval(() => {
      this.fire.push(new Fire(this.gameScreen));
      this.isPushingFire = false;
      
    }, 12000);

    // BLACKHOLE
    //pushes blackhole in a static location
    // included in start() method so it only pushes one blackhole at a time 
    setInterval(() => {
      this.blackhole.push(new Blackhole(this.gameScreen));
      this.isPushingBlackhole = false;
      
    }, 15000);

    // removes the blackhole after a specific time interval
    setTimeout(() => {
      setInterval(() => {
        if (this.firstBlackholePush) {
          this.firstBlackholePush = false;
          this.blackhole[0].element.remove();
          this.blackhole.splice(0, 1);
         
        } else if (this.blackhole.length != 0) {
          this.blackhole[0].element.remove();
          this.blackhole.splice(0, 1);
          
        }
      }, 15000);
    }, 5000);

    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();

    //This line schedules the next iteration of the game loop using the "requestAnimationFrame" method, which is a built-in broswer API that creates smooth and efficient animations by leveraging the browser's rendering capabiltiies
    //When RAF is called, it takes a callback function of this.gameLoop as an argument which creates a recursive loop.
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");
    let fireCounter = document.getElementById("fire");

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
    fireCounter.innerHTML = this.fireCounter;

    if (this.lives === 0) {
      this.endGame();
    }

    this.rocket.move();

    // CHECK FOR COLLISIONS WITH PLANET

    for (let i = 0; i < this.planet.length; i++) {
      const singlePlanet = this.planet[i];
      singlePlanet.move();

      if (this.rocket.didCollide(singlePlanet)) {
        // music for the planet
        this.planetAudio.play();
        this.planetAudio.volume = 0.1;
        
        // remove the obstacle from the DOM
        singlePlanet.element.remove();

        // remove the obstacle from the array
        this.planet.splice(i, 1);

        // reduce rocket lives by one
        this.lives--;

        // check if the obstacle id off the screen at the bottom
      } else if (singlePlanet.top > this.height) {
        // remove the obstacle from the HTML
        singlePlanet.element.remove();
        // remove the obstales from the array of obstacles
        this.planet.splice(i, 1);
      }
    }

    //The function below checks if there is no obstacle being pushed (false) and that no obstacles are currently on the screen (this.obstacles = 0) If these are true, then the following happens (the flag to true, a new Object class of obstacle is created and added to the this.obstacles array, and the flag is turned back to false)
    if (!this.planet.length && !this.isPushingPlanet) {
      this.isPushingPlanet = true;
      setTimeout(() => {
        this.planet.push(new Planet(this.gameScreen));
        this.isPushingPlanet = false;
      }, 500);
    }

    // CHECK FOR COLLISIONS WITH STAR

    for (let i = 0; i < this.star.length; i++) {
      const singleStar = this.star[i];
      singleStar.move();

      if (this.rocket.didCollide(singleStar)) {
        if (this.star) {
          console.log("crashed with a star");
          // music for the star
          this.starAudio.play();

          //remove obstacle from DOM
          singleStar.element.remove();

          // remove obstacle from array
          this.star.splice(i, 1);

          this.score++;
        }
      }
    }

    // CHECK FOR COLLISIONS WITH FIRE

    for (let i = 0; i < this.fire.length; i++) {
      const singleFire = this.fire[i];
      singleFire.move();

      if (this.rocket.didCollide(singleFire)) {
        //music for the fire
        this.fireAudio.play();

        // remove obstacle from the DOM
        singleFire.element.remove();

        // remove obstacle from the array
        this.fire.splice(i, 1);
        // update the count of fires catched by the rocket
        this.fireCounter++;
      }
      // when rocket collects 5 fires, the fire counter goes to zero and one life is added
      if (this.fireCounter === 5) {
        this.fireCounter = 0;
        this.lives++;
      }
    }

    // CHECK FOR COLLISIONS WITH BLACKHOLE

    // ROCKET WITH BLACKHOLE

    for (let i = 0; i < this.blackhole.length; i++) {
      const singleBlackhole = this.blackhole[i];
      singleBlackhole.move();

      if (this.rocket.didCollide(singleBlackhole)) {
        // music for blackhole
        this.blackholeAudio.play();
        this.blackholeAudio.volume = 0.2;

        // remove obstacle from the DOM
        singleBlackhole.element.remove();

        // remove obstacle from the array
        this.blackhole.splice(i, 1);

        //End game if lives are at 1
        if (this.lives === 1) {
          this.endGame();
        }
        // reduces lives to 1 
        this.lives = 1;
      }
    }

    //BLACKHOLE WITH PLANET

    for (let i = 0; i < this.planet.length; i++) {
      const singlePlanet = this.planet[i];
      // if there is an element in the blackhole array (meaning there is one blackhole in the screen) and if the blackhole collids with planet
      if (
        this.blackhole[0] &&
        this.blackhole[0].blackholeDidCollide(singlePlanet)
      ) {
        console.log("crashed with a planet");
        // music for blackhole
        this.blackholeAudio.play();
        this.blackholeAudio.volume = 0.2;
        // remove the planet from the DOM
        singlePlanet.element.remove();
        // remove planet from array
        this.planet.splice(i, 1);
        
      }
    }

    //BLACKHOLE WITH STAR
    for (let i = 0; i < this.star.length; i++) {
      const singleStar = this.star[i];
      // if there is an element in the blackhole array (meaning there is one blackhole in the screen) and if the blackhole collids with star
      if (
        this.blackhole[0] &&
        this.blackhole[0].blackholeDidCollide(singleStar)
      ) {
        console.log("crashed with a star");
        // remove the star from the DOM
        singleStar.element.remove();
        // remove the star from the array
        this.star.splice(i, 1);
      
      }
    }

    //BLACKHOLE WITH FIRE

    for (let i = 0; i < this.fire.length; i++) {
      const singleFire = this.fire[i];
      // if there is an element in the blackhole array (meaning there is one blackhole in the screen) and if the blackhole collids with fire
      if (
        this.blackhole[0] &&
        this.blackhole[0].blackholeDidCollide(singleFire)
      ) {
        console.log("crashed with a fire");
        // music for blackhole
        this.blackholeAudio.play();
        this.blackholeAudio.volume = 0.2;

        // remove fire from the DOM
        singleFire.element.remove();

        // remove fire from the array
        this.fire.splice(i, 1);
        
      }
    }
  }

  endGame() {
    // remove rocket from DOM
    this.rocket.element.remove();

    // remove all obstacles from the array of obstacles
    this.planet.forEach((singlePlanet) => {
      // remove from the HTML
      singlePlanet.element.remove();
    });
    // remove all obstacles from the array of obstacles
    this.star.forEach((singleStar) => {
      // remove from the HTML
      singleStar.element.remove();
    });

    //Removes all elements from the array
    this.planet = [];
    this.star = [];
    this.gameIsOver = true;

    // Hide game Screen
    this.gameContainer.style.display = "none";

    // Show the end game screen
    this.gameEndScreen.style.display = "flex";


    // display final score
    let finalScore = document.getElementById("final-score");

    finalScore.innerHTML = this.score;

    // stop the background music from the game 
    this.backgroundMusic.pause();
  }
}
