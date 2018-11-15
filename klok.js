

function setup(){
  createCanvas(400,400);
  createCanvas(400,400);
}

function draw(){
    background(255);
    var uur = hour() % 12;
    var min = minute();
    var sec = second();
    stroke(0);
    strokeWeight(4);
    noFill();
    ellipse(200, 200, 300, 300);

    var angleUur = map(uur, 0, 24, 0, 4 * PI);
    var angleMin = map(min, 0, 60, 0, TWO_PI);
    var angleSec = map(sec, 0, 60, 0, TWO_PI);
    translate(width/2, height/2);

    push();
    rotate(angleUur);
    stroke(0);
    line(0,0,0,-50);
    pop();

    push();
    rotate(angleMin);
    stroke(0);
    line(0,0,0,-100);
    pop();

    push();
    rotate(angleSec);
    stroke(0);
    line(0, 0, 0 , -130);
    pop();

}
