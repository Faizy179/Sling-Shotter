const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
let isGameOver = false;
let score = 0;
const player = {
    x:240,
    y:500,
    radius: 10,
    color: "#00ffcc",
    vx:0,
    vy:0,
    speed:6,
    attatchedPeg:null,
    angle:0,
    orbitRadius:60,
    orbitDirection:1,//clockwise
}
let pegs = [
    {
        x: 240, y:560, radius: 16, color: "#ff0055"
    },
    {
         x: 180, y:400, radius: 16, color: "#ff0055"
    },
    {
         x: 300, y:240, radius: 16, color: "#ff0055"
    }
]

player.atatchedpeg = pegs[0];
document.addEventListener(
  "keydown", (e) => {
    if(e.code === "Space"){
        if(isGameOver){
            resetGame();
            return;
        }
        if(player.attatchedPeg){
            const releaseAngle = player.angle +(Math.pi/2)*player.orbitDirection;
            player.vx  = Math.cos (releaseAngle) * player.speed;
            player.vy = Math.sin (releaseAngle) *player.speed;
            player.attatchedPeg = null; 
        } 
    }
  }  
);


function updateLogic(){
 if(player.attatchedPeg){
    const angularVelocity = (player.speed / player.orbitRadius) + player.orbitDirection;
    player.angle += angularVelocity;
    
 }
}
function resetGame(){
    isGameOver  =false;
    score  = 0;
}