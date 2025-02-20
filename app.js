// Config
const canvasHeight = 500;
const canvasWidth = 500;

const heroSize = 100;
const heroHitX = 40;
const heroHitY = 65;
const heroBulletSize = 40;
const heroSpeed = 5;
const heroColor = "yellow";
const heroHealth = 1000;

const bulletSpeed = 7;
const bulletColor = "green";
const bulletDamage = 6;

// small enemy ................

const smallEnemySize = 60;
const smallEnemyHealth = 12;
const smallEnemyHitX = 15;
const smallEnemyHitY = 30;
const smallEnemyColor = "green";
const smallEnemySpeed = 3;
const smallEnemyChaDirPossi = 0.95;
const smallEnemyBulletFireRate = 0.99;
const totalsmallEnemy = 10;
const smallEnemyBulletSpeed = 7;
const smallEnemyBulletColor = "orange";
const smallEnemyBulletSize = 10;
const smallEnemyBulletDamage = 5;

// big enemy ................

const bigEnemySize = 80;
const bigEnemyHealth = 30;
const bigEnemyHitX = 20;
const bigEnemyHitY = 40;
const bigEnemyColor = "red";
const bigEnemySpeed = 1;
const bigEnemyChaDirPossi = 0.99;
const bigEnemyBulletFireRate = 0.99;
const totalBigEnemy = 2;
const bigEnemyBulletSpeed = 4;
const bigEnemyBulletColor = "red";
const bigEnemyBulletSize = 20;
const bigEnemyBulletDamage = 10;

// -------------State

let score = 0;

const hero = {
  x: 200,
  y: 400,
  d: "u",
  size: heroSize,
  hitX: heroHitX,
  hitY: heroHitY,
  health: heroHealth,
  bulletsize: heroBulletSize,
};

const bulletArra = [];

const enemyCharArr = [];

const upHero = document.getElementById("up_hero");
const downHero = document.getElementById("down_hero");
const leftHero = document.getElementById("left_hero");
const rightHero = document.getElementById("right_hero");

const upHeroBullet = document.getElementById("hero-up-bullet");
const downHeroBullet = document.getElementById("hero-down-bullet");
const leftHeroBullet = document.getElementById("hero-left-bullet");
const rightHeroBullet = document.getElementById("hero-right-bullet");

const upSmallEnemy = document.getElementById("up-small-enemy");
const downSmallEnemy = document.getElementById("down-small-enemy");
const leftSmallEnemy = document.getElementById("left-small-enemy");
const rightSmallEnemy = document.getElementById("right-small-enemy");

const upBigEnemy = document.getElementById("up-big-enemy");
const downBigEnemy = document.getElementById("down-big-enemy");
const leftBigEnemy = document.getElementById("left-big-enemy");
const rightBigEnemy = document.getElementById("right-big-enemy");

const smallEnemyUpBullet = document.getElementById("small-enemy-up-bullet");
const smallEnemyDownBullet = document.getElementById("small-enemy-down-bullet");
const smallEnemyLeftBullet = document.getElementById("small-enemy-left-bullet");
const smallEnemyRightBullet = document.getElementById(
  "small-enemy-right-bullet"
);

const bigEnemyUpBullet = document.getElementById("big-enemy-up-bullet");
const bigEnemyDownBullet = document.getElementById("big-enemy-down-bullet");
const bigEnemyLeftBullet = document.getElementById("big-enemy-left-bullet");
const bigEnemyRightBullet = document.getElementById("big-enemy-right-bullet");

const bgMusicEl = document.getElementById("bg-mucic");
const gameOverMusicEl = document.getElementById("gameOverMusic");
const enemyDownMusicEl = document.getElementById("enemyDownMusic");
const popupEl = document.getElementById("popup");
const scorehealthEl = document.getElementById("score&health");
const startgameBtnEl = document.getElementById("startgameBtn");
const RestartBtnEl = document.getElementById("RestartBtn");

const pausePlayBtnEl = document.getElementById("pause&playBtn");
let isgamePlay = false;

pausePlayBtnEl.addEventListener("click", () => {
  if (!isgamePlay) {
    pausePlayBtnEl.innerText = "Play";
    isgamePlay = true;
    bgMusicEl.pause();

    clearInterval(intervel);
  } else {
    pausePlayBtnEl.innerText = "Pause";
    isgamePlay = false;
  }
});

const canvasEl = document.getElementById("myCanvas");
canvasEl.height = canvasHeight;
canvasEl.width = canvasWidth;
const cnvCont = canvasEl.getContext("2d");

// ..................................       Game loop         .....................................

let intervel;

startgameBtnEl.addEventListener("click", () => {
  intervel = setInterval(function () {
    // Game logic
    enemySpwaner();
    // countEnemyTypeWise();
    bulletMover();
    enmyMover();
    heroBulletCollison();
    enemyBulletCollison();
    bulletToBulletCollison();
    bulletCancel();
    scoreUpdater();
    enemyRemover();
    enemyBulletDra();
    isGameOver();

    // Renderer
    cnvCont.clearRect(0, 0, 500, 500);

    drawBullet();

    drawEnemy();

    drawHero();

    // drawHitHeroBox();

    // drawCharacter(hero.x, hero.y, hero.size, heroColor, hero.d);
  }, 20);

  bgMusicEl.play();
  scorehealthEl.classList.toggle("hide");
  canvasEl.classList.toggle("hide");
  popupEl.classList.toggle("hide");
  startgameBtnEl.classList.toggle("hide");
});

// ............................          Drawing section             .................................

function drawCharacter(x, y, size, color, d) {
  cnvCont.fillStyle = color;
  cnvCont.beginPath();

  if (d === "u") {
    cnvCont.rect(x - size / 2, y - (3 / 2) * size, size, size);

    cnvCont.rect(x - size / 2, y - (1 / 2) * size, size, size);

    cnvCont.rect(x - (3 / 2) * size, y - size / 2, size, size);

    cnvCont.rect(x - (3 / 2) * size, y + size / 2, size, size);

    cnvCont.rect(x + (1 / 2) * size, y - size / 2, size, size);

    cnvCont.rect(x + (1 / 2) * size, y + (1 / 2) * size, size, size);
  }

  if (d === "d") {
    cnvCont.rect(x - size / 2, y - (1 / 2) * size, size, size);

    cnvCont.rect(x - (3 / 2) * size, y - (1 / 2) * size, size, size);

    cnvCont.rect(x + (1 / 2) * size, y - (1 / 2) * size, size, size);

    cnvCont.rect(x - (1 / 2) * size, y + (1 / 2) * size, size, size);

    cnvCont.rect(x - (3 / 2) * size, y - (3 / 2) * size, size, size);

    cnvCont.rect(x + (1 / 2) * size, y - (3 / 2) * size, size, size);
  }

  if (d === "l") {
    cnvCont.rect(x - size / 2, y - (1 / 2) * size, size, size);

    cnvCont.rect(x - (3 / 2) * size, y - (1 / 2) * size, size, size);

    cnvCont.rect(x - size / 2, y + (1 / 2) * size, size, size);

    cnvCont.rect(x - size / 2, y - (3 / 2) * size, size, size);

    cnvCont.rect(x + size / 2, y - (3 / 2) * size, size, size);

    cnvCont.rect(x + size / 2, y + (1 / 2) * size, size, size);
  }

  if (d === "r") {
    cnvCont.rect(x - size / 2, y - (1 / 2) * size, size, size);

    cnvCont.rect(x + size / 2, y - (1 / 2) * size, size, size);

    cnvCont.rect(x - size / 2, y + (1 / 2) * size, size, size);

    cnvCont.rect(x - size / 2, y - (3 / 2) * size, size, size);

    cnvCont.rect(x - (3 / 2) * size, y + (1 / 2) * size, size, size);

    cnvCont.rect(x - (3 / 2) * size, y - (3 / 2) * size, size, size);
  }

  cnvCont.fill();
}

function drawHero() {
  if (hero.d === "u") {
    cnvCont.drawImage(
      upHero,
      hero.x - hero.size / 2,
      hero.y - hero.size / 2,
      hero.size,
      hero.size
    );
  } else if (hero.d === "d") {
    cnvCont.drawImage(
      downHero,
      hero.x - hero.size / 2,
      hero.y - hero.size / 2,
      hero.size,
      hero.size
    );
  } else if (hero.d === "l") {
    cnvCont.drawImage(
      leftHero,
      hero.x - hero.size / 2,
      hero.y - hero.size / 2,
      hero.size,
      hero.size
    );
  } else if (hero.d === "r") {
    cnvCont.drawImage(
      rightHero,
      hero.x - hero.size / 2,
      hero.y - hero.size / 2,
      hero.size,
      hero.size
    );
  }
}

function drawHitHeroBox() {
  cnvCont.strokeStyle = "blue";
  cnvCont.lineWidth = 5;
  cnvCont.strokeRect(
    hero.x - hero.hitX / 2,
    hero.y - hero.hitY / 2,
    hero.hitX,
    hero.hitY
  );
}

function drawBullet() {
  // const ranNumBullet = Math.random() * totalsmallEnemy;

  let i = 0;
  while (i < bulletArra.length) {
    if (bulletArra[i].d === "u") {
      cnvCont.drawImage(
        bulletArra[i].bulletImages.up,
        bulletArra[i].x - bulletArra[i].size / 2,
        bulletArra[i].y - bulletArra[i].size / 2,
        bulletArra[i].size,
        bulletArra[i].size
      );
    } else if (bulletArra[i].d === "d") {
      cnvCont.drawImage(
        bulletArra[i].bulletImages.down,
        bulletArra[i].x - bulletArra[i].size / 2,
        bulletArra[i].y - bulletArra[i].size / 2,
        bulletArra[i].size,
        bulletArra[i].size
      );
    } else if (bulletArra[i].d === "l") {
      cnvCont.drawImage(
        bulletArra[i].bulletImages.left,
        bulletArra[i].x - bulletArra[i].size / 2,
        bulletArra[i].y - bulletArra[i].size / 2,
        bulletArra[i].size,
        bulletArra[i].size
      );
    } else if (bulletArra[i].d === "r") {
      cnvCont.drawImage(
        bulletArra[i].bulletImages.right,
        bulletArra[i].x - bulletArra[i].size / 2,
        bulletArra[i].y - bulletArra[i].size / 2,
        bulletArra[i].size,
        bulletArra[i].size
      );
    }

    i++;
  }
}

function enemySpwaner() {
  let countSmallEnemy = 0;
  let i = 0;

  while (i < enemyCharArr.length) {
    if (enemyCharArr[i].enemyType === "small") {
      countSmallEnemy++;
    }

    i++;
  }

  while (countSmallEnemy < totalsmallEnemy) {
    enemyCharArr.push({
      x: Math.ceil(Math.random() * 430) + 50,

      y: Math.ceil(Math.random() * 400) + 80,

      enemyHitX: smallEnemyHitX,
      enemyHitY: smallEnemyHitY,

      size: smallEnemySize,

      enemySpeed: smallEnemySpeed,

      d: "u",
      changeDirection: smallEnemyChaDirPossi,
      BulletFireRate: smallEnemyBulletFireRate,
      bulletSize: smallEnemyBulletSize,
      bulletColor: smallEnemyBulletColor,
      bulletSpeed: smallEnemyBulletSpeed,
      damage: smallEnemyBulletDamage,
      health: smallEnemyHealth,
      color: smallEnemyColor,
      enemyType: "small",
      enemyImages: {
        up: upSmallEnemy,
        down: downSmallEnemy,
        left: leftSmallEnemy,
        right: rightSmallEnemy,
      },
    });

    countSmallEnemy++;
  }

  let countBigEnemy = 0;

  i = 0;

  while (i < enemyCharArr.length) {
    if (enemyCharArr[i].enemyType === "big") {
      countBigEnemy++;
    }
    i++;
  }

  while (countBigEnemy < totalBigEnemy) {
    enemyCharArr.push({
      x: Math.ceil(Math.random() * 430) + 50,

      y: Math.ceil(Math.random() * 400) + 80,

      enemyHitX: bigEnemyHitX,
      enemyHitY: bigEnemyHitY,

      size: bigEnemySize,
      enemySpeed: bigEnemySpeed,

      d: "u",
      changeDirection: bigEnemyChaDirPossi,
      BulletFireRate: bigEnemyBulletFireRate,
      bulletSize: bigEnemyBulletSize,
      bulletColor: bigEnemyBulletColor,
      bulletSpeed: bigEnemyBulletSpeed,
      damage: bigEnemyBulletDamage,
      health: bigEnemyHealth,
      color: bigEnemyColor,
      enemyType: "big",
      enemyImages: {
        up: upBigEnemy,
        down: downBigEnemy,
        left: leftBigEnemy,
        right: rightBigEnemy,
      },
    });

    countBigEnemy++;
  }
}

function drawEnemy() {
  let i = 0;

  while (i < enemyCharArr.length) {
    if (enemyCharArr[i].d === "u") {
      cnvCont.drawImage(
        enemyCharArr[i].enemyImages.up,
        enemyCharArr[i].x - enemyCharArr[i].size / 2,
        enemyCharArr[i].y - enemyCharArr[i].size / 2,
        enemyCharArr[i].size,
        enemyCharArr[i].size
      );
    } else if (enemyCharArr[i].d === "d") {
      cnvCont.drawImage(
        enemyCharArr[i].enemyImages.down,
        enemyCharArr[i].x - enemyCharArr[i].size / 2,
        enemyCharArr[i].y - enemyCharArr[i].size / 2,
        enemyCharArr[i].size,
        enemyCharArr[i].size
      );
    } else if (enemyCharArr[i].d === "l") {
      cnvCont.drawImage(
        enemyCharArr[i].enemyImages.left,
        enemyCharArr[i].x - enemyCharArr[i].size / 2,
        enemyCharArr[i].y - enemyCharArr[i].size / 2,
        enemyCharArr[i].size,
        enemyCharArr[i].size
      );
    } else if (enemyCharArr[i].d === "r") {
      cnvCont.drawImage(
        enemyCharArr[i].enemyImages.right,
        enemyCharArr[i].x - enemyCharArr[i].size / 2,
        enemyCharArr[i].y - enemyCharArr[i].size / 2,
        enemyCharArr[i].size,
        enemyCharArr[i].size
      );
    }

    i++;
  }
}

// ..................     hero-bullet-values        ............................

const inputEvent = (e) => {
  if (e.code === "Space") {
    // audio part

    const bullet_fire_audio = new Audio("/assets/laser-shot-ingame-230500.wav");
    bullet_fire_audio.play();
    bullet_fire_audio.volume = 0.1;

    // ................................................

    if (hero.d === "u") {
      bulletArra.push({
        x: hero.x + 2,
        y: hero.y - hero.size / 2,
        d: hero.d,
        size: hero.bulletsize,
        bulletImages: {
          up: upHeroBullet,
          down: downHeroBullet,
          left: leftHeroBullet,
          right: rightHeroBullet,
        },

        color: heroColor,
        BulletType: "hero",
        bulletSpeed: bulletSpeed,
        damage: bulletDamage,
      });
    } else if (hero.d === "d") {
      bulletArra.push({
        x: hero.x + 20,
        y: hero.y + hero.size / 2,
        d: hero.d,
        size: hero.bulletsize,
        bulletImages: {
          up: upHeroBullet,
          down: downHeroBullet,
          left: leftHeroBullet,
          right: rightHeroBullet,
        },
        color: heroColor,
        BulletType: "hero",
        bulletSpeed: bulletSpeed,
        damage: bulletDamage,
      });
    } else if (hero.d === "l") {
      bulletArra.push({
        x: hero.x - hero.size / 2,
        y: hero.y - 10,
        d: hero.d,
        size: hero.bulletsize,
        bulletImages: {
          up: upHeroBullet,
          down: downHeroBullet,
          left: leftHeroBullet,
          right: rightHeroBullet,
        },
        color: heroColor,
        BulletType: "hero",
        bulletSpeed: bulletSpeed,
        damage: bulletDamage,
      });
    } else if (hero.d === "r") {
      bulletArra.push({
        x: hero.x + hero.size / 2,
        y: hero.y - 10,
        d: hero.d,
        size: hero.bulletsize,
        bulletImages: {
          up: upHeroBullet,
          down: downHeroBullet,
          left: leftHeroBullet,
          right: rightHeroBullet,
        },
        color: heroColor,
        BulletType: "hero",
        bulletSpeed: bulletSpeed,
        damage: bulletDamage,
      });
    }
  }
};

function enemyBulletDra() {
  let i = 0;

  while (i < enemyCharArr.length) {
    const BulletFireRand = Math.random();

    if (BulletFireRand > enemyCharArr[i].BulletFireRate) {
      bulletArra.push({
        x: enemyCharArr[i].x,
        y: enemyCharArr[i].y,
        d: enemyCharArr[i].d,
        size: enemyCharArr[i].bulletSize,
        color: enemyCharArr[i].bulletColor,
        BulletType: "enemy",
        bulletImages:
          enemyCharArr[i].enemyType === "small"
            ? {
                up: smallEnemyUpBullet,
                down: smallEnemyDownBullet,
                left: smallEnemyLeftBullet,
                right: smallEnemyRightBullet,
              }
            : {
                up: bigEnemyUpBullet,
                down: bigEnemyDownBullet,
                left: bigEnemyLeftBullet,
                right: bigEnemyRightBullet,
              },

        bulletSpeed: enemyCharArr[i].bulletSpeed,
        damage: enemyCharArr[i].damage,
      });
    }

    i++;
  }
  // console.log(bulletArra);
}

function bulletMover() {
  let i = 0;
  while (i < bulletArra.length) {
    if (bulletArra[i].d === "u") {
      bulletArra[i].y = bulletArra[i].y - bulletArra[i].bulletSpeed;
    } else if (bulletArra[i].d === "d") {
      bulletArra[i].y = bulletArra[i].y + bulletArra[i].bulletSpeed;
    } else if (bulletArra[i].d === "l") {
      bulletArra[i].x = bulletArra[i].x - bulletArra[i].bulletSpeed;
    } else if (bulletArra[i].d === "r") {
      bulletArra[i].x = bulletArra[i].x + bulletArra[i].bulletSpeed;
    }
    i++;
  }
}

function bulletCancel() {
  let i = 0;
  while (i < bulletArra.length) {
    if (
      bulletArra[i].x < 0 ||
      bulletArra[i].y < 0 ||
      bulletArra[i].x > canvasWidth ||
      bulletArra[i].y > canvasHeight ||
      bulletArra[i].hitted
    ) {
      bulletArra.splice(i, 1);
    }
    i++;
  }
}

function enmyMover() {
  let i = 0;

  // const rand = Math.random();
  const rand = Math.random();

  while (i < enemyCharArr.length) {
    // move in one direction

    if (enemyCharArr[i].d === "u") {
      enemyCharArr[i].y -= rand * enemyCharArr[i].enemySpeed;
    } else if (enemyCharArr[i].d === "d") {
      enemyCharArr[i].y += rand * enemyCharArr[i].enemySpeed;
    } else if (enemyCharArr[i].d === "l") {
      enemyCharArr[i].x -= rand * enemyCharArr[i].enemySpeed;
    } else {
      enemyCharArr[i].x += rand * enemyCharArr[i].enemySpeed;
    }

    // choose change direction or not

    const rand2 = Math.random();

    if (rand2 > enemyCharArr[i].changeDirection) {
      const rand1 = Math.random();

      if (rand1 < 0.25) {
        enemyCharArr[i].d = "u";
      } else if (rand1 < 0.5) {
        enemyCharArr[i].d = "d";
      } else if (rand1 < 0.75) {
        enemyCharArr[i].d = "l";
      } else {
        enemyCharArr[i].d = "r";
      }
    }

    i++;
  }
}

function enemyRemover() {
  let i = 0;

  while (i < enemyCharArr.length) {
    if (
      enemyCharArr[i].x < 0 - enemyCharArr[i].enemyHitX ||
      enemyCharArr[i].x > canvasWidth + enemyCharArr[i].enemyHitX ||
      enemyCharArr[i].y < 0 - enemyCharArr[i].enemyHitY ||
      enemyCharArr[i].y > canvasHeight + enemyCharArr[i].enemyHitY ||
      enemyCharArr[i].death
    ) {
      enemyCharArr.splice(i, 1);
    }
    i++;
  }
}

function heroBulletCollison() {
  for (let i = 0; i < bulletArra.length; i++) {
    if (bulletArra[i].BulletType === "enemy") {
      continue;
    }
    for (let j = 0; j < enemyCharArr.length; j++) {
      if (
        Math.abs(enemyCharArr[j].x - bulletArra[i].x) <
          enemyCharArr[j].enemyHitX + bulletArra[i].size / 2 &&
        Math.abs(enemyCharArr[j].y - bulletArra[i].y) <
          enemyCharArr[j].enemyHitY + bulletArra[i].size / 2
      ) {
        console.log("herobullet was collide");

        bulletArra[i].hitted = true;

        enemyCharArr[j].health = enemyCharArr[j].health - bulletArra[i].damage;

        if (enemyCharArr[j].health <= 0) {
          enemyCharArr[j].death = true;
          // enemyDownMusicEl.play();

          const enemyDeathMusic = new Audio(
            "/assets/PUBG_MESSAGE_TONE__-_Enemy_Down_Message_Ringtone_sound_effect(256k).wav"
          );

          enemyDeathMusic.volume = 0.1;

          enemyDeathMusic.play();
        }
      }
    }
  }
}

function enemyBulletCollison() {
  for (let i = 0; i < bulletArra.length; i++) {
    if (bulletArra[i].BulletType === "hero") {
      continue;
    }

    if (
      Math.abs(hero.x - bulletArra[i].x) <
        hero.hitX / 2 + bulletArra[i].size / 2 &&
      Math.abs(hero.y - bulletArra[i].y) <
        hero.hitY / 2 + bulletArra[i].size / 2
    ) {
      console.log("enemybullet was collide");

      bulletArra[i].hitted = true;

      hero.health = hero.health - bulletArra[i].damage;

      console.log(hero.health);

      if (hero.health <= 0) {
        hero.death = true;
      }
    }
  }
}

function bulletToBulletCollison() {
  for (let i = 0; i < bulletArra.length; i++) {
    for (let j = i; j < bulletArra.length; j++) {
      if (bulletArra[i].BulletType !== bulletArra[j].BulletType) {
        if (
          Math.abs(bulletArra[i].x - bulletArra[j].x) <
            bulletArra[i].size / 2 + bulletArra[j].size / 2 &&
          Math.abs(bulletArra[i].y - bulletArra[j].y) <
            bulletArra[i].size / 2 + bulletArra[j].size / 2
        ) {
          if (bulletArra[i].damage > bulletArra[j].damage) {
            bulletArra[i].damage = bulletArra[i].damage - bulletArra[j].damage;
            bulletArra[j].hitted = true;
          } else if (bulletArra[i].damage < bulletArra[j].damage) {
            bulletArra[j].damage = bulletArra[j].damage - bulletArra[i].damage;
            bulletArra[i].hitted = true;
          } else if (bulletArra[i].damage === bulletArra[j].damage) {
            bulletArra[i].hitted = true;
            bulletArra[j].hitted = true;
          }
        }
      }
    }
  }
}

let lastPressed = 0;

function throttle(fn, delay, ...arg) {
  if (Date.now() - lastPressed > delay) {
    lastPressed = Date.now();
    fn(...arg);
  }
}

window.addEventListener("keydown", (e) => {
  throttle(inputEvent, 100, e);

  // this group of code decide that character always in canvas size------------------

  if (hero.y < 40) {
    hero.y = 40;
  }

  if (hero.x > canvasWidth - 40) {
    hero.x = canvasWidth - 40;
  }

  if (hero.y > canvasHeight - 40) {
    hero.y = canvasHeight - 40;
  }

  if (hero.x < 40) {
    hero.x = 40;
  }

  // ----------------------------------

  if (e.code === "KeyS") {
    hero.y = hero.y + heroSpeed;
  }

  if (e.code === "ArrowDown") {
    hero.d = "d";
  }

  if (e.code === "KeyW") {
    hero.y = hero.y - heroSpeed;
  }

  if (e.code === "ArrowUp") {
    hero.d = "u";
  }

  if (e.code === "KeyA") {
    hero.x = hero.x - heroSpeed;
  }

  if (e.code === "ArrowLeft") {
    hero.d = "l";
  }

  if (e.code === "KeyD") {
    hero.x = hero.x + heroSpeed;
  }

  if (e.code === "ArrowRight") {
    hero.d = "r";
  }
});

function isGameOver() {
  if (hero.health <= 0) {
    clearInterval(intervel);

    popupEl.classList.toggle("hide");
    RestartBtnEl.classList.toggle("hide");

    bgMusicEl.pause();
    gameOverMusicEl.play();

    RestartBtnEl.addEventListener("click", () => {
      window.location.reload();
      popupEl.classList.toggle("hide");
    });

    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  }
}

function scoreUpdater() {
  for (let i = 0; i < bulletArra.length; i++) {
    if (bulletArra[i].BulletType === "hero" && bulletArra[i].hitted) {
      score += 5;
    }
  }

  for (let i = 0; i < enemyCharArr.length; i++) {
    if (enemyCharArr[i].death) {
      score += 10;
    }
  }

  let high_score = localStorage.getItem("high_storage");

  high_score = high_score * 1;
  // console.log(high_score);

  if (high_score < score) {
    localStorage.setItem("high_storage", score);
  }

  scorehealthEl.innerHTML =
    `health : ${hero.health}` +
    "  " +
    `score : ${score}` +
    "  " +
    `High Score : ${high_score || 0}`;
}
