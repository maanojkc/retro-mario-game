const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;

let x = 50;
let y = 200;
let velocity = 0;
let gravity = 0.5;
let ground = 200;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    velocity = -10;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // gravity
  velocity += gravity;
  y += velocity;

  // ground collision
  if (y > ground) {
    y = ground;
    velocity = 0;
  }

  // draw ground
  ctx.fillStyle = "green";
  ctx.fillRect(0, 230, canvas.width, 70);

  // draw player
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, 30, 30);

  requestAnimationFrame(gameLoop);
}

gameLoop();
