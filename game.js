const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// player
let player = {
  x: 100,
  y: 300,
  width: 30,
  height: 30,
  dx: 0,
  dy: 0,
  speed: 4,
  jump: -12,
  gravity: 0.6,
  grounded: false
};

// controls
let keys = {};
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

// platforms
let platforms = [
  { x: 0, y: 350, w: 800, h: 50 }, // ground
  { x: 200, y: 280, w: 100, h: 10 },
  { x: 400, y: 230, w: 120, h: 10 },
  { x: 600, y: 180, w: 100, h: 10 }
];

function update() {
  // movement
  if (keys["ArrowRight"]) player.dx = player.speed;
  else if (keys["ArrowLeft"]) player.dx = -player.speed;
  else player.dx = 0;

  // jump
  if (keys["Space"] && player.grounded) {
    player.dy = player.jump;
    player.grounded = false;
  }

  // gravity
  player.dy += player.gravity;

  player.x += player.dx;
  player.y += player.dy;

  // collision with platforms
  player.grounded = false;
  platforms.forEach((p) => {
    if (
      player.x < p.x + p.w &&
      player.x + player.width > p.x &&
      player.y < p.y + p.h &&
      player.y + player.height > p.y
    ) {
      // landing
      if (player.dy >= 0) {
        player.y = p.y - player.height;
        player.dy = 0;
        player.grounded = true;
      }
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // sky
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // platforms
  ctx.fillStyle = "#654321";
  platforms.forEach((p) => {
    ctx.fillRect(p.x, p.y, p.w, p.h);
  });

  // player
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
