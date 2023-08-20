# Cosmic Collector

**Concept:** A space game where you want to collect stars to gain points and dodge planets and black holes to avoid losing. A Planet will remove a life and colliding with a Black Hole will reduce your lives to 1. Collecting a star will give you a point and collecting 5 fires will give you an extra life.

We used 5 different classes: rocket (player), planet (obstacle), black hole (obstacle), star (reward), and fire (reward). All 5 classes had the following methods, which were sometimes implemented in slightly different ways:
- updatePosition();
- move ();


## Specifics of how each class and method worked:

### Rocket:

**Purpose:** player that moves across the screen to collect rewards and avoid obstacles

**Appears on the screen:** We wanted it to appear at the bottom and center of the screen

**Movement:** We wanted it to move in the x and y direction

**Disappear:** The rocket is never meant to leave the screen


### Planet:

**Purpose:** An obstacle that reduces a player's life if the rocket collides with it

**Appears on the screen:** We wanted it to appear at the top of the screen in a random position

**Movement:** It moves down the Y-axis only until it hits the bottom of the screen

**Disappear:** It disappears when a rocket hits it or it gets to the bottom of a screen. When it disappears, a new one appears at the top of the screen.


### Black Hole:

**Purpose:** An obstacle that reduces the player's life to one if the rocket collides with it. If the player only has 1 life when hitting it, it ends the game.

**Appears on the screen:** It appears at a random position on the screen every 15 seconds

**Movement:** It is fixed and doesn't move but rotates for visual effect

**Disappear:** It disappears when a rocket hits it or if it has been on the screen for 5 seconds without being hit

### Star:

**Purpose:** A reward that a player collects to gain a point

**Appears on the screen:** It appears at a random position on the screen every 3 seconds

**Movement:** It is fixed and doesn't move

**Disappear:** It disappears when a rocket hits it or if it has been on the screen for 2 seconds without being hit

### Fire:

**Purpose:** If a player collects 5 fires, they will gain an extra life

**Appears on the screen:** It appears on the screen in the top right corner every 12 seconds

**Movement:** It moves diagonally across the screen, hitting the left to right boundaries before bouncing and switching the direction of movement.

**Disappear:** It disappears when a rocket hits it, it has hit the bottom of the screen, or if it collides with a Black hole.
