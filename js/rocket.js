class Rocket {
  constructor (gameScreen, left, top, width, height, imgScr) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

    this.directionX = 0;
    this.directionY = 0;


    this.element = document.createElement("img");
    this.element.src = imgScr;
    this.element.style.position = "absolute";

    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }


  move() {

    this.left += this.directionX;
    this.top += this.directionY;

    //rigth side

    if(this.left + this.width > this.gameScreen.offsetWidth) {
      this.left = this.gameScreen.offsetWidth - this.width;
    }

    // left side
    else if (this.left < 0){
      this.left = 0;
    }

    //bottom side

    if(this.top + this.height > this.gameScreen.offsetHeight) {
      this.top = this.gameScreen.offsetHeight - this.height;
    }

    // top side
    else if (this.top < 0){
      this.top = 0;
    }

    this.updatePosition();
    

  }


  updatePosition() {
    this.element.style.left = `${this.left}px`
    this.element.style.top = `${this.top}px`
  }

  didCollide(spaceObject) {
    const rocketRect = this.element.getBoundingClientRect();
    const spaceObjectRect = spaceObject.element.getBoundingClientRect();

    if(rocketRect.left < spaceObjectRect.right &&
      rocketRect.right > spaceObjectRect.left &&
      rocketRect.top < spaceObjectRect.bottom &&
      rocketRect.bottom > spaceObjectRect.top
      ){
        return true
      }
      else {
        return false;
      }
  } 
}