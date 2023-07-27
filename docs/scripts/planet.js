class Planet {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    // creating a random left position and it always drops from the top
    this.left = Math.floor(
      Math.random() * this.gameScreen.offsetWidth * 0.8 +
        this.gameScreen.offsetWidth * 0.1
    ); 

    this.top = 0;

    // size of planet
    this.width = 100;
    this.height = 100;
      // create the HTML element and default styling
    this.element = document.createElement("img");
    this.element.src = "docs/images/planet.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // drop the obstacle 3px to the bottom
    this.top += 3;
    this.updatePosition();
  }
}
