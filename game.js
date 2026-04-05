const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;

let x = 50;
let y = 200;
let velocity = 0;
let gravity = 0.5;

document.addEventListener("keydown", () => {
  velocity = -10;
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  velocity += gravity;
  y += velocity;

  if (y > 200) {
    y = 200;
    velocity = 0;
  }

  ctx.fillStyle = "red";
  ctx.fillRect(x, y, 30, 30);

  requestAnimationFrame(gameLoop);
}

gameLoop();
