const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 18,
paddleHeight = 120,
paddleSpeed = 8,
ballRadius = 12,
initialBallSpeed = 8,
maxBallSpeed = 40,
netWidth = 5,
netColor = "WHITE";


function drawNet(){
    for(let i=0; i<=canvas.height;i+=15){
        drawRect(canvas.width / 2 - netWidth / 2, i, netWidth, 10, netColor);
        netWidth, 10, netColor;
    }
}

function drawRect(x, y, width, height, color){
    context.fillStyle = color;
context.fillRect(x, y, width, height);



}

function drawCircle(x, y, radius, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color, fontSize = 60,
fontWeight = 'bold', font = "Courier New"){
context.fillStyle = color;
context.font = `${fontSize}px ${font}`;
context.textAlign = "center";
context.fillText(text, x, y);


}

function createPaddle(x, y, width, height, color){
    return { x, y, width, height, color, score: 0};
}

function createBall(x, y, radius, valocityX, valocityY,

 color){
    return { x, y, radius, valocityX, valocityY, color, 

   spped: initialBallSpeed };
 }

const user = createPaddle(0, canvas.height / 2-
paddleHeight / 2, paddleWidth, paddleHeight, "WHITE");

const com = createPaddle(canvas.width - paddleWidth, canvas.
height / 2 - paddleHeight / 2, paddleWidth, paddleHeight,
"WHITE" );

const ball = createBall(canvas.width / 2, canvas.height /
   2 , ballRadius, initialBallSpeed, initialBallSpeed,"WHITE");

canvas.addEventListener('mousemove', movePaddle);

function movePaddle(event){
    const rect = canvas.getBoundingClientRect();
    
    user.y = event.clientY - rect.top - user.height / 2;

}
function collision(b, p){
    return (
        b.x + b.radius > p.x && b.x - b.radius < p.x + p.
        width && b.y + b.radius > p.y && b.y - b.radius <p.
        y + p.height
    );
}


function resetBall(){
ball.x = canvas.width / 2;
ball.y = Math.random() * (canvas.height - ball.radius *
 2) + ball.radius;
 ball.valocityX = -ball.valocityX;
 ball.spped = initialBallSpeed;

}

function update(){
    if(ball.x - ball.radius < 0){
        com.score++;
        resetBall();
    }else if (ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall();

    }

ball.x += ball.valocityX;
ball.y += ball.valocityY;


com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

if(ball.y - ball.radius < 0 || ball.y + ball.radius >
    canvas.height){

ball.valocityY = -ball.valocityY;

    }

let player = ball.x + ball.radius < canvas.width / 2 ?
user : com;
if (collision(ball, player)){
const collidePoint = ball.y - (player.y + player.
 height / 2);
const collisionAngle = (Math.PI / 4) * 
(collidePoint / (player.height / 2));
const direction = ball.x + ball.radius < canvas.
width / 2 ? 1 : -1;
ball.valocityX = direction * ball.spped * Math.cos
(collisionAngle);
ball.valocityY = ball.spped * Math.sin
(collisionAngle);

ball.spped += 0.2;
if(ball.spped > maxBallSpeed){
    ball.spped = maxBallSpeed;
           }



      }


}

function render(){

    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawNet();


    drawText(user.score, canvas.width / 4, canvas.height /
   2, "GRAY", 120, 'bold' );
   drawText(com.score, (3 * canvas.width) / 4, canvas.
 height / 2, "GRAY", 120, 'bold');

drawRect(user.x, user.y, user.width, user.height, user.
color);
drawRect(com.x, com.y, com.width, com.height, com.
color );
drawCircle(ball.x, ball.y, ball.radius, ball.color);

}


function gameloop() {
update();
render();
}

const framePerSec = 60;
setInterval(gameloop, 1000 / framePerSec);
