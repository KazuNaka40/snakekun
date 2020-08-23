const tileSize = 20;

let mX = new Array();
let mY = new Array();
let mDX = 0;
let mDY = 1;
let mFoodX = 2;
let mFoodY = 5;
let gameOver: boolean;

let timerInterval = 100;

function addFood() {
  let cvs = <HTMLCanvasElement>document.getElementById("cnvs");
  let w = cvs!.width;
  let h = cvs!.height;
  console.log(w, h);

  mFoodX = random(tileSize, w - tileSize * 2, tileSize);
  mFoodY = random(tileSize, h - tileSize * 2, tileSize);

  mX.push(mX[mX.length - 1]);
  mY.push(mY[mY.length - 1]);
}

function isBody(x, y) {
  for (let i = mX.length - 1; i >= 0; i--) {
    if (mX[i] == x && mY[i] == y) {
      return true;
    }
    return false;
  }
}

/*export*/ function random(min: number, max: number, mult: number): number {
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

  for (let i = mX.length - 1; i >= 0; i--) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(mX[i] * tileSize, mY[i] * tileSize, tileSize, tileSize);
  }

  ctx.fillStyle = "#fff";
  ctx.font = "24px MS Gothic";
  if (gameOver) {
    ctx.fillText("GAME OVER", w / 2 - 100, h / 2 - 50);
  }
}

function update() {
  if (gameOver) {
    return;
  }
  let x = (mX[0] += mDX);
  let y = (mY[0] += mDY);

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
  }
}

function onPaint() {
  update();
  draw(<HTMLCanvasElement>document.getElementById("cnvs"));
}

window.onkeydown = function (ev: { keyCode: any }) {
  let c = ev.keyCode;
  if (c == 37) {
    mDX = -1;
    mDY = 0;
  }
  if (c == 38) {
    mDX = 0;
    mDY = -1;
  }
  if (c == 39) {
    mDX = 1;
    mDY = 0;
  }
  if (c == 40) {
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
