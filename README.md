# Superman in space

[Play the game!](https://dbravojuanico.github.io/super-man-game/)

## Description
Superman in space is a game where the player has to move the main character left and right in order to aim to incoming asteroids and shot the with a laser. The player has three life counters and every time superman collides with an asteroid or an asteroid goes past Superman (to earth) one life counter is lost. When there are no life counters remaining, the game ends.
For each asteroid destroyed, the player gets one score point
The asteroids move increasingly fast, so it is harder to destory them as the game porgresses. The objective of the game is to get the maximum score.

## MVP
- Main character has 3 helth points.
- The game has main character that moves left and right.
- The main character shoots a laser up when a key is pressed.
- Asteroids appear randomly from the top of the screen.
- Lasers destory asteroids.
- Collison with an asteroid or an asteroid reaching the bottom of the screen removes 1 helth point.
- Losing all health points triggers game over.
- When game is over, if the current score is the highest, it is saved.
- Restart / reset button.

## Backlog
- Sounds for laser / collision

## Data structure

### index.js
- supermanMove()
- laserMove()
- shoot()
- moveAsteroid1()
- moveAsteroid2()
- draw1Up()
- moveOneUp()
- drawScore()
- drawBestScore()
- gameOverFunc()
- isGameOver()
- startGame()

## States y States Transitions
- Splash screen
- Game screen
- Game over screen

## Links

- [Slides Link](https://docs.google.com/presentation/d/1fqnkrze5J4-MqAwXjh0IEWmeFrAHSyDwoK5TJwGyKJI/edit?usp=sharing)
- [Github repository Link](https://github.com/dbravojuanico/super-man-game)
- [Deployment Link](https://dbravojuanico.github.io/super-man-game/)