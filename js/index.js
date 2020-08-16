"use strict";

const tileSize=20;

let mX=5;
let mY=2;
let mDX=0;
let mDY=1;
let mFoodX=2;
let mFoodY=5;
let mapWidth=1420;//20 - 1380
let mapHeight=720;//20 - 680



let timerInterval=100;
let mTimer;

function addFood(){
    let cvs = document.getElementById("cnvs");
    let w = cvs.width;
    let h = cvs.height;
    console.log(w,h);

    mFoodX=random(tileSize,w-tileSize*2,tileSize);
    mFoodY=random(tileSize,h-tileSize*2,tileSize);
}

function random (min,max,mult){
    let w = max-min;
    let num =min+Math.floor(Math.random()*w);
    return num-num%mult;
}


function draw(cvs){
    let ctx = cvs.getContext("2d");
    let w = cvs.width;
    let h = cvs.height;

    ctx.fillStyle="red";
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle="blue";
    ctx.fillRect(20, 20, w-40, h-40);

    ctx.fillStyle="red";
    ctx.fillRect(mFoodX,mFoodY,tileSize,tileSize);

    ctx.fillStyle="yellow";
    ctx.fillRect(mX*tileSize,mY*tileSize,tileSize,tileSize);
}

function update () {
    mX += mDX;
    mY += mDY;
    if(mX*tileSize === mFoodX && mY*tileSize===mFoodY ){
        addFood();
    }

}

function onPaint(){
    update();
    draw(document.getElementById("cnvs"));
}



window.onkeydown=function(ev){
    let c=ev.keyCode;
    if(c==37){mDX=-1;mDY=0;}
    if(c==38){mDX=0;mDY=-1;}
    if(c==39){mDX=1;mDY=0;}
    if(c==40){mDX=0;mDY=1;}
}

window.onload=function() {
    addFood();
    setInterval(onPaint, timerInterval);

}
