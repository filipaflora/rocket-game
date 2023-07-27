class Rocket {
  constructor (gameScreen, left, top, width, height, imgScr) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

    // direction of the rocket moving horizontally and vertically
    this.directionX = 0;
    this.directionY = 0;

    // create image tag for the rocket, define src and do default styling
    this.element = document.createElement("img");
    this.element.src = imgScr;

    //position absolute: accurately track and update the rocket position based on game logic 
    this.element.style.position = "absolute";

    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    // append rocket to the gamescreen
    this.gameScreen.appendChild(this.element);
  }


  move() {
    // update rocket's position based on direction X and Y
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensures rocket remains inside the game screen 

    // .offSetWidth() is a property of the DOM element that represents the width of an element, including its content, padding and order (not margin). It returns a value in pixels.

    //Rigth side
    if(this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;
    }

    // Left side
    else if (this.left < 0){
      this.left = 0;
    }

    // Bottom side

    if(this.top + this.height > this.gameScreen.offsetHeight) {
      this.top = this.gameScreen.offsetHeight - this.height;
    }

    // Top side
    else if (this.top < 0){
      this.top = 0;
    }

    this.updatePosition();
    

  }

  // updates the position of the rocket in the CSS
  updatePosition() {
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
  }
  // .getBoundingClientRect() -- gives us information about top, left, right, bottom, width and height about a HTML element
  didCollide(spaceObject) {
    const rocketRect = this.element.getBoundingClientRect();
    const spaceObjectRect = spaceObject.element.getBoundingClientRect();

    if(rocketRect.left < spaceObjectRect.right &&
      rocketRect.right > spaceObjectRect.left &&
      rocketRect.top < spaceObjectRect.bottom &&
      rocketRect.bottom > spaceObjectRect.top
      // all of these have to be true for a collision 
      ){
        return true
      }
      else {
        return false;
      }
  } 
}