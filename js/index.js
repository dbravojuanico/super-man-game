// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// 3 main spaces 
const startScreen = document.querySelector("#game-intro")
const gameSpace = document.querySelector("#game-space")
const gameOverScreen = document.querySelector("#game-over")

// Score - lose condition
let currentScore = 0
let bestScore = 0
let gameOver = false
let isHit1 = false
let isHit2 = false
let healthPoints = 3


// Superman variables
let supermanX = 300
let supermanY = 750
const supermanWidth = 80
const supermanHeight = 160
let supermanSpeed = 5
let movingLeft = false
let movingRight = false

// Asteroid 1 variables
let asteroid1Width = 100;
let asteroid1Height = asteroid1Width;
let asteroid1X = 250;
let asteroid1Y = 10;
let asteroid1Speed = 4

// Asteroid 2 variables
let asteroid2Width = 100;
let asteroid2Height = asteroid1Width;
let asteroid2X = 400;
let asteroid2Y = -50;
let asteroid2Speed = 3

// Laser variables 
let laserX = supermanX + 10
let laserY = supermanY - 40
let laserWidth = 10
let laserHeight = 50
let laserSpeed = 15
let shooting = false

// Images
const superManImg = new Image()
superManImg.src = "/images/supermanImg.png"
const backgroundImg = new Image()
backgroundImg.src = "/images/space_background2_mod.jpg"
const asteroid1Img = new Image()
asteroid1Img.src ="/images/asteroid1img.png"
const asteroid2Img = new Image()
asteroid2Img.src = "/images/asteroid2img.png"
const heartImg = new Image()
heartImg.src = "/images/heartImg-cutout.png"

// Animation frame Id
let animationFrameId

// Window load
window.onload = () => {
    // (not) Showing elements after first load
    canvas.style.display = "none"
    gameSpace.style.display = "none"
    startScreen.style.display = "block"
    gameOverScreen.style.display = "none"

    // Press button start screen
    document.querySelector("#start-button").onclick  = () => {
        gameOver = false
        superManImg.src = "/images/supermanImg.png"
        healthPoints = 3
        currentScore = 0
        asteroid2Y = -50;
        asteroid1Y = 10;
        supermanX = 300
        supermanY = 750

        startGame()
    }

    /*// Laser Class
    class Laser {
        constructor(){
            // Laser variables 
            this.x = supermanX + 40
            this.y = supermanY - 40
            this.width = 15
            this.height = 50
            this.speed = 5
        }

        moveLaser(){
            this.y -= this.speed
        }

        drawLaser () {
            ctx.beginPath()
            ctx.fillStyle = "red"
            ctx.rect (this.x, this.y, this.width, this.height)
            ctx.fill()
            ctx.closePath()
        }

        checkCollision(){
            if (
                asteroid1X < this.x + this.width &&
                asteroid1X + asteroid1Width > this.x &&
                asteroid1Y < this.y + this.height &&
                asteroid1Height + asteroid1Y > this.y
            ){
                gameOver = true
            }
        }
    } */

    // FUNCTIONS
    // Superman movement
    function supermanMove() {
        
        if (movingLeft && supermanX > 10){
            supermanX -= supermanSpeed
        }
        if (movingRight && supermanX < (canvas.width - (supermanWidth +10)))
            supermanX += supermanSpeed
        }    
    
    // Shoot laser
    function laserMove() {
        if (
            asteroid1X < laserX + laserWidth &&
            asteroid1X + asteroid1Width > laserX &&
            asteroid1Y < laserY + laserHeight &&
            asteroid1Height + asteroid1Y > laserY
        ){
            currentScore += 1
            if(currentScore > bestScore){
                bestScore = currentScore
            }
            console.log(currentScore)
            console.log(bestScore)
            shooting = false
            laserY = supermanY - 40
            asteroid1Y = -20
            asteroid1X = (Math.floor(Math.random() * canvas.width)) - asteroid1Width
        }
        if (
            asteroid2X < laserX + laserWidth &&
            asteroid2X + asteroid2Width > laserX &&
            asteroid2Y < laserY + laserHeight &&
            asteroid2Height + asteroid2Y > laserY
        ){
            currentScore += 1
            if(currentScore > bestScore){
                bestScore = currentScore
            }
            console.log(currentScore)
            console.log(bestScore)
            shooting = false
            laserY = supermanY - 40
            asteroid2Y = -20
            asteroid2X = (Math.floor(Math.random() * canvas.width)) - asteroid2Width
        }
        if (laserY < 0) {
            shooting = false
            laserY = supermanY - 40
        }
        laserY -= laserSpeed
    }

    // Shoot laser
    function shoot() {
        ctx.beginPath()
        ctx.fillStyle = "red"
        ctx.rect (laserX, laserY, laserWidth, laserHeight)
        ctx.fill()
        ctx.closePath()

        laserMove()
    }

    // Asteroid 1 movement
    function moveAsteroid1 () {
        if (
            asteroid1X < supermanX + supermanWidth &&
            asteroid1X + asteroid1Width > supermanX &&
            asteroid1Y < supermanY + supermanHeight &&
            asteroid1Height + asteroid1Y > supermanY
        ){
            asteroid1Y = -30
            asteroid1X = (Math.floor(Math.random() * canvas.width)) - asteroid1Width
            healthPoints -= 1
        }
        if (asteroid1Y < canvas.height){
            asteroid1Y += asteroid1Speed
        } else {
            asteroid1Y = 0
            asteroid1X = (Math.floor(Math.random() * canvas.width)) - asteroid1Width
            healthPoints -= 1
        }
    }

    // Asteroid 2 movement
    function moveAsteroid2 () {
        if (
            asteroid2X < supermanX + supermanWidth &&
            asteroid2X + asteroid2Width > supermanX &&
            asteroid2Y < supermanY + supermanHeight &&
            asteroid2Height + asteroid2Y > supermanY
        ){
            asteroid2Y = -10
            asteroid2X = (Math.floor(Math.random() * canvas.width)) - asteroid2Width
            healthPoints -= 1
        }
        if (asteroid2Y < canvas.height){
            asteroid2Y += asteroid1Speed
        } else {
            asteroid2Y = 0
            asteroid2X = (Math.floor(Math.random() * canvas.width)) - asteroid2Width
            healthPoints -= 1
        }
    }

    // Print score & best score
    function drawScore() {
        ctx.beginPath();
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(`Score: ${currentScore}`, 10, 30);
        ctx.closePath();
    }

    function drawBestScore() {
        ctx.beginPath();
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(`Best: ${bestScore}`, 535, 30);
        ctx.closePath();
    }

    // Print HP

    
   

    // GAME OVER

    function gameOverFunc () {
        gameOver = true
    } 

    function isGameOver () {
        if (healthPoints < 1) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
            superManImg.src = "/images/supermanImgGrey.png"
            ctx.drawImage(superManImg, supermanX, supermanY, supermanWidth, supermanHeight)
            ctx.beginPath();
            ctx.font = "60px sans-serif";
            ctx.fillStyle = "white";
            ctx.fillText("GAME OVER",140,300 );
            ctx.closePath();
            ctx.beginPath();
            ctx.font = "40px sans-serif";
            ctx.fillStyle = "white";
            ctx.fillText(`${currentScore} POINTS`,230,360 );
            ctx.closePath();
            
            setTimeout (gameOverFunc, 3000)
        }
    }

    // Main game function
    function startGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.display = "block"
        gameSpace.style.display = "block"
        startScreen.style.display = "none"
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(superManImg, supermanX, supermanY, supermanWidth, supermanHeight)
        ctx.drawImage(asteroid1Img, asteroid1X, asteroid1Y, asteroid1Width, asteroid1Height)
        ctx.drawImage(asteroid2Img, asteroid2X, asteroid2Y, asteroid2Width, asteroid2Height)
        drawScore()
        drawBestScore()
        supermanMove()
        moveAsteroid1()
        moveAsteroid2()
        
    
        isGameOver()
        

        if(shooting){          
            shoot()
        }

        // Check for game over
        if(gameOver) {
            cancelAnimationFrame(animationFrameId)
            canvas.style.display = "none"
            gameSpace.style.display = "none"
            startScreen.style.display = "none"
            gameOverScreen.style.display = "block"
        } else {
            animationFrameId = requestAnimationFrame(startGame);
        }

        // EVENT LISTENERS INGAME
        // Superman movement
        document.addEventListener("keydown", event => {
            if (event.code === "ArrowLeft") {
              movingLeft = true;
            }
            if (event.code === "ArrowRight") {
              movingRight = true;
            }
        });

        document.addEventListener("keyup", event => {
            movingLeft = false;
            movingRight = false;
        });

        // Laser shooting
    
        document.addEventListener("keydown", event => {
            if (event.code === "ArrowUp"){
                laserX = supermanX + 32
                shooting = true
            }
        })

        // Game restart after game over
        document.querySelector("#replay-button").onclick  = () => {
            
            canvas.style.display = "none"
            gameSpace.style.display = "none"
            startScreen.style.display = "block"
            gameOverScreen.style.display = "none"
        }

    }
}