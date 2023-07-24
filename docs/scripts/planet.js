class Planet {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    this.left = Math.floor(
      Math.random() * this.gameScreen.offsetWidth * 0.8 +
        this.gameScreen.offsetWidth * 0.1
    ); // Check if we need to change that

    this.top = 0;
    this.width = 100;
    this.height = 100;

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
    this.top += 3;
    this.updatePosition();
  }
}
