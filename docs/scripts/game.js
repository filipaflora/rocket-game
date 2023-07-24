class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");

    this.rocket = new Rocket(
      this.gameScreen,
      550,
      800,
      100,
      150,
      "./images/rocket.png"
    );

    this.width = 1200;
    this.height = 700;

    this.planet = [];
    this.star = [];

    this.isPushingPlanet = false;
    this.isPushingStar = false;

    this.score = 0;

    this.lives = 5;

    this.gameIsOver = false;

    this.firstStarPush = true;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    // console.log(this.startScreen.style.display);

    this.gameScreen.style.display = "block";

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

    this.gameLoop();
  }

  gameLoop() {
    //console.log("Game Loop");

    if (this.gameIsOver) {
      return;
    }

    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;

    if (this.lives === 0) {
      this.endGame();
    }

    this.rocket.move();

    // check for collision with planet

    for (let i = 0; i < this.planet.length; i++) {
      const singlePlanet = this.planet[i];
      singlePlanet.move();

      if (this.rocket.didCollide(singlePlanet)) {
        singlePlanet.element.remove();

        this.planet.splice(i, 1);

        this.lives--;
      } else if (singlePlanet.top > this.height) {
        // this.score++;
        //this.score++ uncomment for star

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

    // check for collision with star
    for (let i = 0; i < this.star.length; i++) {
      const singleStar = this.star[i];
      singleStar.move();

      if (this.rocket.didCollide(singleStar)) {
        if (this.star) {
          console.log("crashed with a star");
          singleStar.element.remove();

          this.star.splice(i, 1);

          this.score++;
        }
        // } else if (singlePlanet.top > this.height) {

        //   this.score++;
        //   //this.score++ uncomment for star

        //   singlePlanet.element.remove();

        //   this.planet.splice(i, 1);
        // }
      }
    }

    /*if (!this.star.length && !this.isPushingStar) {
      this.isPushingStar = true;
      const pushStar = setTimeout(() => {
        this.star.push(new Star(this.gameScreen));
        this.isPushingStar = false;
        console.log("pushing star");
        console.log("stars array when pushing:", this.star);
        clearTimeout(pushStar);
      }, 3000);
    } else if (this.star.length > 0 && !this.isPushingStar) {
      const deleteStar = setTimeout(() => {
        this.star.forEach((starElement, index) => {
          starElement.element.remove();
          this.star.splice(index, 1);
          console.log("removing star");
          console.log("stars array when removing:", this.star);
          clearTimeout(deleteStar);
        });
      }, 4000);*/
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
    // console.log(this.planet);
    this.gameIsOver = true;

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";

    let finalScore = document.getElementById("final-score");

    finalScore.innerHTML = this.score;

  }
}
