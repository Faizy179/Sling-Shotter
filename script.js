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
    player.x = player.attatchedPeg.x + Math.cos(player.angle) + player.orbitRadius;
    player.y = player.attatchedPeg.y + Math.sin(player.angle) + player.orbitRadius;
 }
 else{
    player.x += player.vx;
    player.y += player.vy;
    for ( let i = 0; i < pegs.length; i++){
        const currentPeg = pegs[i];
        const distance = Math.hypot(player.x-currentPeg.x,player.y - currentPeg.y);
        if(distance <= player.orbitRadius + 5 && distance >= player.orbitRadius - 5){
            player.attatchedPeg = currentPeg;
            player.angle = Math.atan2(player.y - currentPeg.y,player.x-currentPeg.x);\
            break;
        }
    }
 }
    if(player.x < 0 || player.x > canvas.width || player.y < 0 || player.y > canvas.height){
        isGameOver = true;
    }
}

function render(){
    ctx.fillStyle = "#111";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    pegs.forEach(
        peg => {
            ctx.fillStyle = peg.color;
            ctx.beginPath();
            ctx.arc(peg.x,peg.y,peg.radius,0,Math.PI*2);
            ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255,0.1)"   
            ctx.setLineDash([5,5]);
            ctx.beginPath();
            ctx.arc(peg.x,peg.y,player.orbitRadius,0,Math.PI*2);
            ctx.stroke();
            ctx.setLineDash([]);//reset
        }
    );
    if(player.attatchedPeg){
        ctx.strokeStyle = "rgba(0,255,255,0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(player.attatchedPeg.x,player,player.attatchedPeg.y);
        ctx.lineTo(player.x,player.y);
        ctx.stroke();
    }
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x,player.y,player.radius,0,Math.PI*2);
    ctx.fill();
}
function resetGame(){
    isGameOver  =false;
    score  = 0;
}