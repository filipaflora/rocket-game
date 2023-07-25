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

    this.width = 1200;
    this.height = 700;

    this.planet = [];
    this.star = [];
    this.fire = [];

    this.isPushingPlanet = false;
    this.isPushingStar = false;
    this.isPushingFire = false;

    this.score = 0;

    this.lives = 5;

    this.fireCounter = 0;

    this.gameIsOver = false;

    this.firstStarPush = true;
    this.firstFirePush = true;

    this.backgroundMusic = null;
    this.planetAudio = new Audio ("/docs/sounds/planet-audio.mp3");
    this.starAudio = new Audio ("/docs/sounds/star-audio.mp3");
    this.fireAudio = new Audio ("/docs/sounds/fire-audio.mp3");
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

    setInterval(() => {
      this.star.push(new Star(this.gameScreen));
      this.isPushingStar = false;
      // console.log("pushing star");
      // console.log("stars array when pushing:", this.star);
    }, 3000);

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

    setInterval(() => {
      this.fire.push(new Fire(this.gameScreen));
      this.isPushingFire = false;
      // console.log("pushing star");
      // console.log("stars array when pushing:", this.star);
    }, 10000);

    // setTimeout(() => {
    //   setInterval(() => {
    //     if (this.firstFirePush) {
    //       this.firstFirePush = false;
    //       this.fire[0].element.remove();
    //       this.fire.splice(0, 1);
    //       // console.log("removing star");
    //       // console.log("stars array when removing:", this.star);
    //     } else if (this.fire.length != 0) {
    //       this.fire[0].element.remove();
    //       this.fire.splice(0, 1);
    //       // console.log("removing star");
    //       // console.log("stars array when removing:", this.star);
    //     }
    //   }, 3000);
    // }, 2000);

    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();
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

        this.planetAudio.play();
        this.planetAudio.volume = 0.1;

        singlePlanet.element.remove();

        this.planet.splice(i, 1);

        this.lives--;

        

      } else if (singlePlanet.top > this.height) {
        singlePlanet.element.remove();

        this.planet.splice(i, 1);
      }
    }

    

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
          this.starAudio.play();
          singleStar.element.remove();

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
        this.fireAudio.play();
        singleFire.element.remove();

        this.fire.splice(i, 1);

        this.fireCounter++;
      }

      if (this.fireCounter === 5){
        this.fireCounter = 0;
        this.lives++;
      }
    }
  }

  endGame() {
    this.rocket.element.remove();

    this.planet.forEach((singlePlanet) => {
      singlePlanet.element.remove();
    });

    this.star.forEach((singleStar) => {
      singleStar.element.remove();
    });

    this.planet = [];
    this.star = [];
    this.gameIsOver = true;

    this.gameContainer.style.display = "none";
    this.gameEndScreen.style.display = "flex";

    let finalScore = document.getElementById("final-score");

    finalScore.innerHTML = this.score;

    this.backgroundMusic.pause();
  }

}
