(() => {
window.addEventListener("DOMContentLoaded", () => {

/* =========================
CANVAS
========================= */

const canvas = document.createElement("canvas");
canvas.id = "hamsterCanvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
}
resize();
window.addEventListener("resize", resize);

const isMobile = window.matchMedia("(max-width: 700px)").matches;

/* =========================
SPRITE
========================= */

const sprite = new Image();
sprite.src = "https://pub-e3bf6ce01e0948019faa273c5ebc10ba.r2.dev/hamster/hamster-sheet.png";

const FRAME = { cols: 4, rows: 3 };

const ANIM = {
  walk: [0, 1, 2, 3],
  idle: [4, 5],
  jump: [6, 7],
  fall: [8],
  sleep: [9, 10],
  blink: [11]
};

let frameW = 0;
let frameH = 0;
let spriteLoaded = false;
let spriteFailed = false;

sprite.onload = () => {
  frameW = sprite.width / FRAME.cols;
  frameH = sprite.height / FRAME.rows;
  spriteLoaded = true;
};

sprite.onerror = () => {
  spriteFailed = true;
};

/* =========================
SOUND
========================= */

const gameSound = new Audio("https://pub-e3bf6ce01e0948019faa273c5ebc10ba.r2.dev/hamster/hamster-game.mp3");
gameSound.loop = true;
gameSound.volume = 0.25;

const deathSound = new Audio("https://pub-e3bf6ce01e0948019faa273c5ebc10ba.r2.dev/hamster/hamster-death.mp3");
deathSound.loop = false;
deathSound.volume = 0.45;

function startGameSound() {
  gameSound.play().catch(() => {});
}

function stopGameSound() {
  gameSound.pause();
  gameSound.currentTime = 0;
}

function playDeathSound() {
  deathSound.currentTime = 0;
  deathSound.play().catch(() => {});
}

/* =========================
HUD
========================= */

const hud = document.createElement("div");
hud.id = "hamsterHUD";
hud.innerHTML = `
  <div class="hamster-widget">
    <div class="hamster-icon">🐹</div>
    <div class="hamster-info">
      <div class="hamster-title">hamster.exe</div>
      <div id="hamsterStatus">sleeping</div>
      <div class="hamster-controls">
        ${isMobile ? "TAP • JUMP" : "ENTER • ESC • A/D • SPACE"}
      </div>
    </div>
  </div>
`;
document.body.appendChild(hud);

function setStatus(text) {
  const el = document.getElementById("hamsterStatus");
  if (el) el.textContent = text;
}

/* =========================
STATE
========================= */

let active = false;
let sleeping = true;
let gameMode = false;
let cameraX = 0;
let gameComplete = false;
let exitGlitchTimer = 0;

const hamster = {
  x: isMobile ? 60 : 120,
  y: window.scrollY + 120,
  vx: 0,
  vy: 0,
  w: isMobile ? 58 : 78,
  h: isMobile ? 58 : 78,
  grounded: false,
  dir: 1,
  state: "sleep",
  previousState: "sleep",
  animIndex: 0,
  animTimer: 0,
  blinkTimer: 0
};

const keys = {};
let jumpsUsed = 0;
const maxJumps = 2;

let platforms = [];

/* =========================
GAME MODE LEVEL
========================= */

const level = {
  width: 2300,
  finishX: 2140,
  platforms: [
    { x: 0, y: 430, w: 520, h: 12 },
    { x: 600, y: 370, w: 220, h: 12 },
    { x: 900, y: 315, w: 240, h: 12 },
    { x: 1220, y: 385, w: 260, h: 12 },
    { x: 1550, y: 330, w: 240, h: 12 },
    { x: 1870, y: 420, w: 360, h: 12 }
  ]
};

/* =========================
PLATFORMS FROM PAGE
========================= */

function buildPlatforms() {
  platforms = [];

  document
    .querySelectorAll(".about-block:not(.contact) p, .about-block:not(.contact) h2")
    .forEach(el => {
      const r = el.getBoundingClientRect();

      platforms.push({
        x: r.left,
        y: r.top + window.scrollY,
        w: r.width,
        h: 8
      });
    });
}

window.addEventListener("resize", () => {
  resize();
  buildPlatforms();
});

window.addEventListener("scroll", () => {
  if (!gameMode) buildPlatforms();
});

/* =========================
INPUT
========================= */

function wakeHamster() {
  active = true;
  sleeping = false;
  gameComplete = false;
  exitGlitchTimer = 0;

  canvas.classList.remove("hamster-exit-glitch");

  hamster.x = isMobile ? 60 : 120;
  hamster.y = window.scrollY + 120;
  hamster.vx = isMobile ? 1.2 : 0;
  hamster.vy = 0;
  hamster.dir = 1;
  hamster.grounded = false;

  setState("idle");
  buildPlatforms();
  startGameSound();

  if (spriteFailed) setStatus("sprite failed");
  else if (!spriteLoaded) setStatus("loading sprite");
  else setStatus(isMobile ? "tap jumping" : "curious");
}

function sleepHamster() {
  active = true;
  sleeping = true;
  exitGameMode();

  exitGlitchTimer = 0;
  canvas.classList.remove("hamster-exit-glitch");

  hamster.vx = 0;
  hamster.vy = 0;

  setState("sleep");
  setStatus("sleeping");
  stopGameSound();
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (e.key === "Enter") {
    wakeHamster();
    return;
  }

  if (e.key === "Escape") {
    sleepHamster();
    return;
  }

  if (!active || sleeping || isMobile || gameComplete) return;

  if (["a", "d", " "].includes(key) || e.key === " ") {
    e.preventDefault();
  }

  if (key === "a") {
    keys.a = true;
    hamster.dir = -1;
  }

  if (key === "d") {
    keys.d = true;
    hamster.dir = 1;
  }

  if (e.key === " ") jump();
});

document.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  if (key === "a") keys.a = false;
  if (key === "d") keys.d = false;
});

canvas.addEventListener("touchstart", (e) => {
  if (!isMobile) return;

  e.preventDefault();

  if (!active || sleeping) {
    wakeHamster();
    return;
  }

  jump();
}, { passive: false });

canvas.addEventListener("click", () => {
  if (!isMobile) return;

  if (!active || sleeping) {
    wakeHamster();
    return;
  }

  jump();
});

/* =========================
GAME MODE
========================= */

function startGameMode() {
  if (gameMode || isMobile) return;

  gameMode = true;
  gameComplete = false;
  exitGlitchTimer = 0;

  document.body.classList.add("hamster-game-mode");
  canvas.classList.remove("hamster-exit-glitch");

  keys.a = false;
  keys.d = false;

  hamster.x = 80;
  hamster.y = 300;
  hamster.vx = 0;
  hamster.vy = 0;
  hamster.dir = 1;
  hamster.grounded = false;

  cameraX = 0;
  jumpsUsed = 0;

  setState("idle");
  setStatus("platformer mode");
}

function exitGameMode() {
  if (!gameMode) return;

  gameMode = false;
  gameComplete = false;

  document.body.classList.remove("hamster-game-mode");
  canvas.classList.remove("hamster-exit-glitch");

  cameraX = 0;
  buildPlatforms();
}

function completeGameMode() {
  if (gameComplete) return;

  gameComplete = true;
  exitGlitchTimer = 35;

  canvas.classList.add("hamster-exit-glitch");

  keys.a = false;
  keys.d = false;

  hamster.vx = 0;
  hamster.vy = 0;

  setState("blink");
  setStatus("escape glitch");

  setTimeout(() => {
    exitGlitchTimer = 0;
    canvas.classList.remove("hamster-exit-glitch");

    gameMode = false;
    gameComplete = false;
    sleeping = true;
    active = true;

    document.body.classList.remove("hamster-game-mode");

    cameraX = 0;
    buildPlatforms();

    hamster.x = isMobile ? 60 : 120;
    hamster.y = window.scrollY + 120;
    hamster.vx = 0;
    hamster.vy = 0;
    hamster.grounded = false;
    hamster.dir = 1;

    setState("sleep");
    setStatus("escaped / sleeping");
    stopGameSound();
  }, 700);
}

/* =========================
JUMP
========================= */

function jump() {
  if (gameComplete) return;

  if (hamster.grounded) {
    hamster.vy = isMobile ? -6.8 : -7.4;
    hamster.grounded = false;
    jumpsUsed = 1;
    setState("jump");
  } else if (jumpsUsed < maxJumps) {
    hamster.vy = isMobile ? -6.5 : -7.2;
    jumpsUsed++;
    setState("jump");
  }
}

/* =========================
UPDATE
========================= */

function update() {
  if (!active) return;

  if (sleeping) {
    setState("sleep");
    updateAnimation();
    return;
  }

  if (gameComplete) {
    updateAnimation();
    return;
  }

  if (gameMode) updateGameMode();
  else updatePageMode();

  updateAnimation();
}

function updatePageMode() {
  const moving = isMobile || keys.a || keys.d;

  if (isMobile) {
    hamster.vx = 1.15;
    hamster.dir = 1;
  } else if (keys.a) {
    hamster.vx = -2.2;
  } else if (keys.d) {
    hamster.vx = 2.2;
  } else {
    hamster.vx *= 0.82;
  }

  hamster.vy += isMobile ? 0.28 : 0.32;

  hamster.x += hamster.vx;
  hamster.y += hamster.vy;

  hamster.grounded = false;

  collideWithPlatforms(platforms);
  updateState(moving);

  if (!isMobile && hamster.x > window.innerWidth - hamster.w - 10) {
    startGameMode();
    return;
  }

  if (isMobile && hamster.x > window.innerWidth + 40) {
    hamster.x = -hamster.w;
  }

  if (hamster.y > document.body.scrollHeight + 200) {
    playDeathSound();
    hamster.x = isMobile ? 60 : 120;
    hamster.y = window.scrollY + 120;
    hamster.vx = isMobile ? 1.2 : 0;
    hamster.vy = 0;
    setStatus("respawned");
  }

  if (!isMobile) {
    hamster.x = Math.max(0, Math.min(window.innerWidth - hamster.w, hamster.x));
  }
}

function updateGameMode() {
  const moving = keys.a || keys.d;

  if (keys.a) {
    hamster.vx = -2.5;
    hamster.dir = -1;
  } else if (keys.d) {
    hamster.vx = 2.5;
    hamster.dir = 1;
  } else {
    hamster.vx *= 0.82;
  }

  hamster.vy += 0.34;

  hamster.x += hamster.vx;
  hamster.y += hamster.vy;

  hamster.grounded = false;

  collideWithPlatforms(level.platforms);
  updateState(moving);

  hamster.x = Math.max(0, Math.min(level.width - hamster.w, hamster.x));

  cameraX = hamster.x - window.innerWidth * 0.35;
  cameraX = Math.max(0, Math.min(level.width - window.innerWidth, cameraX));

  if (hamster.y > window.innerHeight + 200) {
    playDeathSound();
    hamster.x = 80;
    hamster.y = 300;
    hamster.vx = 0;
    hamster.vy = 0;
    cameraX = 0;
    setStatus("respawned");
  }

  if (
    hamster.x + hamster.w > level.finishX &&
    hamster.x < level.finishX + 110 &&
    hamster.y + hamster.h > 250 &&
    hamster.y < 310 &&
    !gameComplete
  ) {
    completeGameMode();
  }
}

function collideWithPlatforms(platformList) {
  platformList.forEach(p => {
    const feet = hamster.y + hamster.h;
    const collisionInsetX = isMobile ? 18 : 22;

    const hitX =
      hamster.x + hamster.w - collisionInsetX > p.x &&
      hamster.x + collisionInsetX < p.x + p.w;

    const hitY =
      feet > p.y &&
      feet < p.y + p.h + 16;

    if (hitX && hitY && hamster.vy >= 0) {
      hamster.y = p.y - hamster.h;
      hamster.vy = 0;
      hamster.grounded = true;
      jumpsUsed = 0;
    }
  });
}

function updateState(moving) {
  if (!hamster.grounded) {
    if (hamster.vy < 0) {
      setState("jump");
      setStatus(spriteLoaded ? "jumping" : "loading sprite");
    } else {
      setState("fall");
      setStatus(spriteLoaded ? "falling" : "loading sprite");
    }
  } else if (moving && Math.abs(hamster.vx) > 0.4) {
    setState("walk");
    setStatus(spriteLoaded ? (gameMode ? "platformer mode" : "walking") : "loading sprite");
  } else {
    hamster.blinkTimer++;

    if (hamster.blinkTimer > 220 && hamster.blinkTimer < 250) {
      setState("blink");
      setStatus(spriteLoaded ? "blinking" : "loading sprite");
    } else {
      setState("idle");
      setStatus(spriteLoaded ? (gameMode ? "platformer mode" : "curious") : "loading sprite");
    }

    if (hamster.blinkTimer > 300) hamster.blinkTimer = 0;
  }
}

function setState(newState) {
  if (hamster.state !== newState) {
    hamster.previousState = hamster.state;
    hamster.state = newState;
    hamster.animIndex = 0;
    hamster.animTimer = 0;
  }
}

function updateAnimation() {
  hamster.animTimer++;

  let speed = 12;
  if (hamster.state === "walk") speed = isMobile ? 8 : 7;
  if (hamster.state === "jump") speed = 9;
  if (hamster.state === "fall") speed = 12;
  if (hamster.state === "sleep") speed = 22;
  if (hamster.state === "blink") speed = 18;

  const frames = ANIM[hamster.state] || ANIM.idle;

  if (hamster.animTimer > speed) {
    hamster.animIndex = (hamster.animIndex + 1) % frames.length;
    hamster.animTimer = 0;
  }
}

/* =========================
DRAW
========================= */

function getCurrentFrameIndex() {
  const frames = ANIM[hamster.state] || ANIM.idle;
  return frames[hamster.animIndex % frames.length];
}

function drawHamster(drawX, drawY) {
  if (!spriteLoaded || !frameW || !frameH) {
    ctx.fillStyle = "#ffcc66";
    ctx.fillRect(drawX, drawY, hamster.w, hamster.h);
    return;
  }

  const frameIndex = getCurrentFrameIndex();
  const sx = (frameIndex % FRAME.cols) * frameW;
  const sy = Math.floor(frameIndex / FRAME.cols) * frameH;

  ctx.save();

  if (exitGlitchTimer > 0) {
    ctx.globalAlpha = Math.random() > 0.25 ? 1 : 0.55;
    ctx.translate(
      Math.random() * 4 - 2,
      Math.random() * 3 - 1.5
    );
  }

  if (hamster.dir === -1) {
    ctx.translate(drawX + hamster.w, drawY);
    ctx.scale(-1, 1);
    ctx.drawImage(sprite, sx, sy, frameW, frameH, 0, 0, hamster.w, hamster.h);
  } else {
    ctx.drawImage(sprite, sx, sy, frameW, frameH, drawX, drawY, hamster.w, hamster.h);
  }

  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!active) return;

  if (gameMode) drawGameMode();
  else drawPageMode();
}

function drawPageMode() {
  const drawY = hamster.y - window.scrollY;
  drawHamster(hamster.x, drawY);
}

function drawGameMode() {
  ctx.save();

  if (exitGlitchTimer > 0) {
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = Math.random() > 0.5 ? "#00ffff" : "#ff66cc";
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 160 + 30,
      Math.random() * 10 + 3
    );
    ctx.restore();

    ctx.translate(
      Math.random() * 4 - 2,
      Math.random() * 3 - 1.5
    );
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGameText();

  ctx.translate(-cameraX, 0);

  level.platforms.forEach(p => {
    ctx.fillStyle = "#ff66cc";
    ctx.fillRect(p.x, p.y, p.w, p.h);

    ctx.fillStyle = "rgba(255, 102, 204, 0.35)";
    ctx.fillRect(p.x, p.y + p.h, p.w, 4);
  });

  /* ESCAPE KEY */

  const escX = level.finishX;
  const escY = 250;
  const escW = 110;
  const escH = 60;

  ctx.shadowBlur = exitGlitchTimer > 0 ? 32 : 25;
  ctx.shadowColor = "#00ffff";

  ctx.fillStyle =
    exitGlitchTimer > 0 && Math.random() > 0.78
      ? "#00ffff"
      : "#111";

  ctx.fillRect(escX, escY, escW, escH);

  ctx.lineWidth = 3;
  ctx.strokeStyle =
    exitGlitchTimer > 0 && Math.random() > 0.8
      ? "#ff66cc"
      : "#00ffff";

  ctx.strokeRect(escX, escY, escW, escH);

  ctx.shadowBlur = 0;

  ctx.fillStyle =
    exitGlitchTimer > 0 && Math.random() > 0.78
      ? "#111"
      : "#00ffff";

  ctx.font = "bold 24px IBM Plex Mono, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(
    exitGlitchTimer > 0 && Math.random() > 0.88 ? "404" : "ESC",
    escX + escW / 2,
    escY + escH / 2
  );

  drawHamster(hamster.x, hamster.y);

  ctx.restore();
}

function drawGameText() {
  ctx.fillStyle =
    exitGlitchTimer > 0 && Math.random() > 0.7
      ? "#00ffff"
      : "#ff66cc";

  ctx.font = "13px IBM Plex Mono, monospace";

  ctx.fillText(
    exitGlitchTimer > 0
      ? "escape sequence corrupted..."
      : "platformer mode — reach the cyan exit / ESC to leave",
    24,
    34
  );
}

/* =========================
LOOP
========================= */

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

buildPlatforms();
loop();

});
})();