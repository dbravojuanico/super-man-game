// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// 3 main spaces 
const startScreen = document.querySelector("#game-intro")
const gameSpace = document.querySelector("#game-space")
const gameOverScreen = document.querySelector("#game-over")

// Superman variables
let SupermanX = 300
let SupermanY = 750
const supermanWidth = 70
const supermanHeight = 150


// Images
const superManImg = new Image()
superManImg.src = "/images/SM_backview_2_mod.png"
const backgroundImg = new Image()
backgroundImg.src = "/images/space_background_mod.jpg"

// Window load
window.onload = () => {
    // (not) Showing elements after first load
    canvas.style.display = "none"
    gameSpace.style.display = "none"
    startScreen.style.display = "block"
    gameOverScreen.style.display = "none"

    // Press button start screen
    document.querySelector("#start-button").onclick  = () => {
        let SupermanX = 300
        let SupermanY = 750

        startGame()
    }


    // FUNCTIONS
    // Superman movement




    // Main game function
    function startGame() {
        ctx.clearRect(0, 0, canvas.height, canvas.height)
        ctx.drawImage(superManImg, SupermanX, SupermanY, supermanWidth, supermanHeight)
        canvas.style.display = "block"
        gameSpace.style.display = "block"
        startScreen.style.display = "none"



        // EVENT LISTENERS INGAME
        // Superman movement



    }

}