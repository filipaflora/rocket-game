class Blackhole {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    // reandom position (left and top) for the blackhole
    this.left = Math.floor(
      Math.random() * this.gameScreen.offsetWidth * 0.6 +
        this.gameScreen.offsetWidth * 0.20
    );
    this.top = Math.floor(
      Math.random() * this.gameScreen.offsetHeight * 0.6 +
        this.gameScreen.offsetHeight * 0.20
    ); 

    // size of the blackhole
    this.width = 120;
    this.height = 120;
    
    // create the HTML elements and default styling
    this.element = document.createElement("img");
    this.element.src = "docs/images/blackhole.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
      // creating the id for that element do we can access it in the CSS
    this.element.setAttribute('id', 'blackhole');

    this.gameScreen.appendChild(this.element);
    
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
// method that checks if other obstacles collide with the blackhole
  blackholeDidCollide(spaceObject) {
    const blackholeRect = this.element.getBoundingClientRect();
    const spaceObjectRect = spaceObject.element.getBoundingClientRect();

    if(blackholeRect.left < spaceObjectRect.right &&
      blackholeRect.right > spaceObjectRect.left &&
      blackholeRect.top < spaceObjectRect.bottom &&
      blackholeRect.bottom > spaceObjectRect.top
      ){
        return true
      }
      else {
        return false;
      }
  } 

  move() {
    this.updatePosition();
  }
}
