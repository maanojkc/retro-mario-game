const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// player
let player = {
  x: 100,
  y: 300,
  width: 40,
  height: 40,
  dx: 0,
  dy: 0,
  speed: 5,
  jump: -14,
  gravity: 0.7,
  grounded: false
};

// camera
let cameraX = 0;

// controls
let keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// platforms (long level)
let platforms = [];
for (let i = 0; i < 50; i++) {
  platforms.push({ x: i * 200, y: 400, w: 200, h: 50 });
}

// extra platforms
platforms.push({ x: 400, y: 300, w: 120, h: 10 });
platforms.push({ x: 800, y: 250, w: 120, h: 10 });
platforms.push({ x: 1200, y: 200, w: 120, h: 10 });

// coins
let coins = [];
for (let i = 0; i < 20; i++) {
  coins.push({ x: i * 300 + 150, y: 350, collected: false });
}

// enemies
let enemies = [
  { x: 600, y: 360, dir: 1 },
  { x: 1200, y: 360, dir: -1 }
];

let score = 0;

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

  // collision
  player.grounded = false;
  platforms.forEach(p => {
    if (
      player.x < p.x + p.w &&
      player.x + player.width > p.x &&
      player.y < p.y + p.h &&
      player.y + player.height > p.y
    ) {
      if (player.dy >= 0) {
        player.y = p.y - player.height;
        player.dy = 0;
        player.grounded = true;
      }
    }
  });

  // coins
  coins.forEach(c => {
    if (
      !c.collected &&
      player.x < c.x + 20 &&
      player.x + player.width > c.x &&
      player.y < c.y + 20 &&
      player.y + player.height > c.y
    ) {
      c.collected = true;
      score++;
    }
  });

  // enemies movement
  enemies.forEach(e => {
    e.x += e.dir * 2;
    if (e.x % 200 === 0) e.dir *= -1;

    // collision with player
    if (
      player.x < e.x + 30 &&
      player.x + player.width > e.x &&
      player.y < e.y + 30 &&
      player.y + player.height > e.y
    ) {
      alert("Game Over!");
      location.reload();
    }
  });

  // camera follow
  cameraX = player.x - canvas.width / 2;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // sky
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-cameraX, 0);

  // platforms
  ctx.fillStyle = "#654321";
  platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

  // coins
  coins.forEach(c => {
    if (!c.collected) {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // enemies
  ctx.fillStyle = "purple";
  enemies.forEach(e => ctx.fillRect(e.x, e.y, 30, 30));

  // player
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.restore();

  // UI
  ctx.fillStyle = "black";
  ctx.font = "20px monospace";
  ctx.fillText("Score: " + score, 20, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
