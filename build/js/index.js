"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
var tileSize = 20;
var mX = 5;
var mY = 2;
var mDX = 0;
var mDY = 1;
var mFoodX = 2;
var mFoodY = 5;
var timerInterval = 100;
function addFood() {
    var cvs = document.getElementById("cnvs");
    var w = cvs.width;
    var h = cvs.height;
    console.log(w, h);
    mFoodX = random(tileSize, w - tileSize * 2, tileSize);
    mFoodY = random(tileSize, h - tileSize * 2, tileSize);
}
function random(min, max, mult) {
    var w = max - min;
    var num = min + Math.floor(Math.random() * w);
    return num - (num % mult);
}
exports.random = random;
function draw(cvs) {
    var ctx = cvs.getContext("2d");
    var w = cvs.width;
    var h = cvs.height;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "blue";
    ctx.fillRect(20, 20, w - 40, h - 40);
    ctx.fillStyle = "red";
    ctx.fillRect(mFoodX, mFoodY, tileSize, tileSize);
    ctx.fillStyle = "yellow";
    ctx.fillRect(mX * tileSize, mY * tileSize, tileSize, tileSize);
}
function update() {
    mX += mDX;
    mY += mDY;
    if (mX * tileSize === mFoodX && mY * tileSize === mFoodY) {
        addFood();
    }
}
function onPaint() {
    update();
    draw(document.getElementById("cnvs"));
}
window.onkeydown = function (ev) {
    var c = ev.keyCode;
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
    addFood();
    setInterval(onPaint, timerInterval);
};
