const tileSize = 20;

let mX = new Array();
let mY = new Array();
let mDX = 0;
let mDY = 1;
let mFoodX = 2;
let mFoodY = 5;
let gameOver: boolean;

let timerInterval = 80;

function addFood() {
  let cvs = <HTMLCanvasElement>document.getElementById("cnvs");
  let w = cvs!.width;
  let h = cvs!.height;
  let again = true;
  let uFoodX = 0;
  let uFoodY = 0;

  while (again) {
    uFoodX = random(tileSize, w - tileSize * 2, tileSize);
    uFoodY = random(tileSize, h - tileSize * 2, tileSize);
    let over = false;
    for (let i = 0; i < mX.length; i++) {
      if (uFoodX == mX[i] * tileSize && uFoodY == mY[i] * tileSize) {
        over = true;
      }
    }
    if (!over) {
      again = false;
    }
  }
  mFoodX = uFoodX;
  mFoodY = uFoodY;
}

function extSnake() {
  for (let i = 0; i < 5; i++) {
    mX.push(mX[mX.length - 1]);
    mY.push(mY[mY.length - 1]);
  }
}

function isBody(x: number, y: number): boolean {
  for (let i = 0; i < mX.length; i++) {
    if (mX[i] == x && mY[i] == y) {
      return true;
    }
  }
  return false;
}
function random(min: number, max: number, mult: number): number {
  let w = max - min;
  let num = min + Math.floor(Math.random() * w);
  return num - (num % mult);
}

function draw(cvs: HTMLCanvasElement) {
  let ctx = cvs.getContext("2d")!;
  let w = cvs.width;
  let h = cvs.height;

  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "blue";
  ctx.fillRect(20, 20, w - 40, h - 40);

  ctx.fillStyle = "red";
  ctx.fillRect(mFoodX, mFoodY, tileSize, tileSize);

  for (let i = 0; i < mX.length; i++) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      mX[i] * tileSize + 1,
      mY[i] * tileSize + 1,
      tileSize - 1,
      tileSize - 1
    );
  }

  ctx.fillStyle = "#fff";
  ctx.font = "100px MS Gothic";
  if (gameOver) {
    ctx.fillText("GAME OVER", w / 2 - 400, h / 2 - 50);
  }
}

function update() {
  if (gameOver) {
    return;
  }
  let x = mX[0] + mDX;
  let y = mY[0] + mDY;

  if (
    isBody(x, y) ||
    x < 1 ||
    y < 1 ||
    x * tileSize > 1420 - 40 ||
    y * tileSize > 760 - 40
  ) {
    gameOver = true;
  }
  mX.unshift(x);
  mY.unshift(y);
  mX.pop();
  mY.pop();
  if (x * tileSize === mFoodX && y * tileSize === mFoodY) {
    addFood();
    extSnake();
  }
}

function onPaint() {
  update();
  draw(<HTMLCanvasElement>document.getElementById("cnvs"));
}

window.onkeydown = function (ev: { keyCode: any }) {
  let c = ev.keyCode;

  //left
  if (c == 37 && (!(mDX == 1) || mX.length == 1)) {
    mDX = -1;
    mDY = 0;
  }
  //up
  if (c == 38 && (!(mDY == 1) || mX.length == 1)) {
    mDX = 0;
    mDY = -1;
  }
  //right
  if (c == 39 && (!(mDX == -1) || mX.length == 1)) {
    mDX = 1;
    mDY = 0;
  }
  //down
  if (c == 40 && (!(mDY == -1) || mX.length == 1)) {
    mDX = 0;
    mDY = 1;
  }
};

window.onload = function () {
  mX.push(5);
  mY.push(2);
  addFood();
  setInterval(onPaint, timerInterval);
};
