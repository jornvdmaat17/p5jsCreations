var cY = -302;
var cX = 0;
var cZ = 0;
var b;
var timer;

function setup(){
  createCanvas(400,400,WEBGL);
  b = new Box(cX, cY, 0,20,100,20, 0 , 0 , 0);
  timer = 0;
}

function draw(){
  background(255);

  noFill();
  strokeWeight(2);

  if(millis() - timer > 10){
    cY += 3;
    cX += 0.01;
    //cZ += 1;
    b = new Box(cX, cY, cZ,20,100,20, 0 , 0 , 0);
    timer = millis();
    if(cY > 320){
      cY = -302;
      cX =0;
      cZ = 0;
    }
    // if(cX > 2){
    //   cX = 0;
    // }
  }
    push();
    b.display(cX,HALF_PI,0);
    pop();
}


function Box(x,y,z,sx,sy,sz,rx,ry,rz){
  this.x = x;
  this.y = y;
  this.z = z;
  this.sx = sx;
  this.sy = sy;
  this.sz = sz;
  this.rx = rx;
  this.ry = ry;
  this.rz = rz;

  this.display = function(rx, ry, rz){
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    rotateX(this.rx);
    rotateY(this.ry);
    rotateZ(this.rz);
    translate(this.x, this.y, this.z);
    box(this.sx,this.sy,this.sz);
  }

  this.changePos = function(cx, cy, cz){
    this.x = cx;
    this.y = cy;
    this.y = cz;
  }
}
