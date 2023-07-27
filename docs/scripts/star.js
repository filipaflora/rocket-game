class Star {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    // creating a random position for the stars (random left and random top)
    this.left = Math.floor(
      Math.random() * this.gameScreen.offsetWidth * 0.8 +
        this.gameScreen.offsetWidth * 0.1
    );
    this.top = Math.floor(
      Math.random() * this.gameScreen.offsetHeight * 0.8 +
        this.gameScreen.offsetHeight * 0.1
    ); 

    // size of the star
    this.width = 50;
    this.height = 50;

    // create the HTML elements and default styling 
    this.element = document.createElement("img");
    this.element.src = "/docs/images/star.png";
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
    this.updatePosition();
  }
}
