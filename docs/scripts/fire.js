class Fire {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    // pre determined location at the top right corner of the screen
    this.left = 1150;
    this.top = 0;

    // size of the fire
    this.width = 50;
    this.height = 50;

    // create the HTML element and default styling
    this.element = document.createElement("img");
    this.element.src = "docs/images/fire.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);

    // initialize the movement variable
    this.movement = -15;
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Define if it's a positive (goes to the right) or a negative (goes to the left) movement
    if (this.left <= 0) {
      this.movement = 15;
    } else if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.movement = -15;
    }

    // Movement itself
    this.left += this.movement;
    this.top += 1.5;

    this.updatePosition();
  }
}
