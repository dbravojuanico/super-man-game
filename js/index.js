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
let supermanSpeed = 6
let movingLeft = false
let movingRight = false

// Asteroid random X value (in range)
function randomNumberInRange () {
    return Math.floor(Math.random()*(540-10)+10)
}

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

// 1up variables
let oneUpWidth = 50
let oneUpHeight = 80
let oneUpX = randomNumberInRange()
let oneUpY = -20
let oneUpSpeed = 4
let oneUp = false

// Laser variables 
let laserX = supermanX + 10
let laserY = supermanY - 40
let laserWidth = 10
let laserHeight = 50
let laserSpeed = 15
let shooting = false

// Score positioning
let bsX

// Images
const superManImg = new Image()
superManImg.src = "./images/supermanImg.png"
const backgroundImg2 = new Image()
backgroundImg2.src = "images/space_background2_flipped.jpg"
const backgroundImg = new Image()
backgroundImg.src = "images/space_background2_mod.jpg"
const asteroid1Img = new Image()
asteroid1Img.src ="images/asteroid1img.png"
const asteroid2Img = new Image()
asteroid2Img.src = "images/asteroid2img.png"
const heartImg = new Image()
heartImg.src = "images/heartImg-cutout.png"
const oneUpImg = new Image()
oneUpImg.src = "images/1upElement.png"

// Animation frame Id
let animationFrameId = 1

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
        backgroundImgY = 0
        backgroundImg2Y = -canvas.height
        superManImg.src = "./images/supermanImg.png"
        healthPoints = 3
        currentScore = 0
        asteroid2Y = -50;
        asteroid1Y = 10;
        supermanX = 300
        supermanY = 750
        asteroid1Speed = 3
        asteroid2Speed = 3
        
        startGame()
    }

    // FUNCTIONS
    // Superman movement
    function supermanMove() {
        
        if (movingLeft && supermanX > 10){
            supermanX -= supermanSpeed
        }
        if (movingRight && supermanX < (canvas.width - (supermanWidth +10)))
            supermanX += supermanSpeed
        }    
    
    // Shoot laser / move & collision
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
            shooting = false
            laserY = supermanY - 40
            asteroid1Y = -20
            asteroid1X = randomNumberInRange()
            asteroid1Speed *= 1.01
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
            shooting = false
            laserY = supermanY - 40
            asteroid2Y = -20
            asteroid2X = randomNumberInRange()
            asteroid2Speed *= 1.01
        }
        if (laserY < 0) {
            shooting = false
            laserY = supermanY - 40
        }
        laserY -= laserSpeed
    }

    // Draw laser
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
            asteroid1X = randomNumberInRange()
            healthPoints -= 1
        }
        if (asteroid1Y < canvas.height){
            asteroid1Y += asteroid1Speed
        } else {
            asteroid1Y = 0
            asteroid1X = randomNumberInRange()
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
            asteroid2X = randomNumberInRange ()
            healthPoints -= 1
        }
        if (asteroid2Y < canvas.height){
            asteroid2Y += asteroid1Speed
        } else {
            asteroid2Y = 0
            asteroid2X = randomNumberInRange()
            healthPoints -= 1
        }
    }

    // Draw 1up
    function draw1Up() {
        if (animationFrameId % 1200 === 0 && animationFrameId !== 0) {
            console.log(animationFrameId)
            oneUpY = -30
            oneUp = true
        }
    }

    // 1up movment & collision
    function moveOneUp(){
        if (oneUp === true) {
            ctx.drawImage (oneUpImg, oneUpX, oneUpY, oneUpWidth, oneUpHeight )
            oneUpY += oneUpSpeed
        }   
        if (oneUpY === canvas.height){
            oneUp = false
        }  
        if (
            oneUpX < supermanX + supermanWidth &&
            oneUpX + oneUpWidth > supermanX &&
            oneUpY < supermanY + supermanHeight &&
            oneUpHeight + oneUpY > supermanY
            ){
            if (healthPoints < 3) {
                healthPoints += 1
                oneUpY = -30
                oneUp = false
            }
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
        if (bestScore >= 100) {
            bsX = 515
        } else {
            bsX = 535
        }
        ctx.fillText(`Best: ${bestScore}`, bsX, 30);
        
        ctx.closePath();
    }

    // GAME OVER

    function gameOverFunc () {
        gameOver = true
    } 

    function isGameOver () {
        if (healthPoints < 1) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Background imgs (moving)
            ctx.drawImage(backgroundImg, 0, backgroundImgY, canvas.width, canvas.height+2)
            ctx.drawImage(backgroundImg2, 0, backgroundImg2Y, canvas.width, canvas.height+2)
            if (backgroundImgY === canvas.height){
                backgroundImgY = -canvas.height
            }
            if (backgroundImg2Y === canvas.height){
                backgroundImg2Y = -canvas.height
            }

            //Draw elements (during gameover)
            superManImg.src = "images/supermanImgGrey.png"
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
            
            setTimeout (gameOverFunc, 3500)
        }
    }

    //Background imgs Y position
    let backgroundImgY = 0
    let backgroundImg2Y = -backgroundImgY
    

    // MAIN GAME FUNCTION
    function startGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.display = "block"
        gameSpace.style.display = "block"
        startScreen.style.display = "none"

        // Background Imgs (moving)
        ctx.drawImage(backgroundImg, 0, backgroundImgY, canvas.width, canvas.height+2)
        ctx.drawImage(backgroundImg2, 0, backgroundImg2Y, canvas.width, canvas.height+2)
        
        backgroundImgY += 1
        backgroundImg2Y += 1
        if(backgroundImgY > canvas.height){
            backgroundImgY = -canvas.height
        }
        if(backgroundImg2Y > canvas.height){
            backgroundImg2Y = -canvas.height
        }

        // Draw elements
        ctx.drawImage(superManImg, supermanX, supermanY, supermanWidth, supermanHeight)
        ctx.drawImage(asteroid1Img, asteroid1X, asteroid1Y, asteroid1Width, asteroid1Height)
        ctx.drawImage(asteroid2Img, asteroid2X, asteroid2Y, asteroid2Width, asteroid2Height)
        drawScore()
        drawBestScore()
        supermanMove()
        moveAsteroid1()
        moveAsteroid2()
        draw1Up()
        moveOneUp()
        
        // Print HP
        if(healthPoints === 3) {
            ctx.drawImage(heartImg, 10, 910, 30,30)
            ctx.drawImage(heartImg, 50, 910, 30,30)
            ctx.drawImage(heartImg, 90, 910, 30,30)
        } else if (healthPoints === 2) {
            ctx.drawImage(heartImg, 10, 910, 30,30)
            ctx.drawImage(heartImg, 50, 910, 30,30)
        } else if (healthPoints === 1) {
            ctx.drawImage(heartImg, 10, 910, 30,30)
        }

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
            window.location.reload()
            //canvas.style.display = "none"
            //gameSpace.style.display = "none"
            //startScreen.style.display = "block"
            //gameOverScreen.style.display = "none"

            // RESET ANIMATION FRAME??
            // animationFrameId = 0
        }

    }
}