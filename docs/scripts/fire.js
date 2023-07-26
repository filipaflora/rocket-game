class Fire {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;

    this.left = 1150;
    this.top = 0;

    this.width = 50;
    this.height = 50;

    this.element = document.createElement("img");
    this.element.src = "docs/images/fire.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);

    this.movement = -10;
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Define it it's a positive (goes to the right) or a negative (goes to the left) movement
    if (this.left === 0) {
      this.movement = 10;
    } else if (this.left + this.width > this.gameScreen.offsetWidth) {
      this.movement = -10;
    }

    // Movement itself
    this.left += this.movement;
    this.top += 1.5;

    
    this.updatePosition();
  }
}
