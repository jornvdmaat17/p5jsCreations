var height;
var width;
var onScreen = [];
var onRefl = [];
var onLine = [];

function setup() {
  height = window.innerWidth - 100;
  width = window.innerHeight - 100;
  createCanvas(height, width);
}

function draw() {
  var input = $("#input").val();
  stroke(0);
  fill(0);
  rect(width / 2 - 4 , 0, 8, height);
  fill(100);
  if(mouseIsPressed){
    var x = mouseX;
    var y = mouseY;
    if(input == "vierkant" && allowedDraw(x, y)){
      var obj = new Rect(x, y);
      if(!contains(obj, onScreen)){
        onScreen.push(obj);
      }
    }
    if(input == "driehoek" && allowedDraw(x, y)){
      var obj = new Triangle(x, y);
      if(!contains(obj, onScreen)){
        onScreen.push(obj);
      }
    }
    if(onScreen.length > 5){
      onScreen.shift();
      onRefl.shift();
      clear();
      rect(width / 2 - 4 , 0, 8, height);
    }
  }

  for(i = 0; i < onScreen.length;i++){
    onScreen[i].display();
  }

  for(i = 0; i < onRefl.length;i++){
    onRefl[i].display();
  }

  for(i = 0; i < onLine.length;i++){
    onLine[i].display();
  }


  $("#clearC").click(function(){
         clear();
         onScreen = [];
         onRefl = [];
         onLine = [];
  });
  $(document).ready(function() {
    $("#calcRefl").click(function(){
          calcRefl();
    });
  });
}

function allowedDraw(x , y){
  return x > 100 && x < width / 2 - 104 && y > 100 && y < height - 104;
}

function calcRefl(){
  for(k = 0; k < onScreen.length;k++){
    var obj = onScreen[k];
    switch(obj.returnObj()){
      case "rect":
        var n = new Rect(width - obj.x, obj.y);
        if(!contains(n, onRefl)){
          onRefl.push(n);
        }
        break;
      case "triangle":
        var n = new Triangle(width - obj.x, obj.y);
        if(!contains(n, onRefl)){
          onRefl.push(n);
        }
        break;
    }
    drawLines();
  }

}

function drawLines(){
  for(i = 0; i < onRefl.length; i++){
  var corners = onRefl[i].returnCorners();
  for(j = 0; j < corners.length;j++){
    var xDiff = width - corners[j].x;
    var l = new Line(corners[j].x, corners[j].y, xDiff, corners[j].y);
    if(!contains(l, onLine, "line")){
      onLine.push(l);
    }
  }
}
}

function Rect(x, y){
  this.x = x;
  this.y = y;

  this.display = function(){
    rect(x - 100, y - 100, 200, 200);
  };

  this.returnCorners = function(){
    return [{x:this.x-100, y:this.y-100}, {x:this.x+100, y:this.y-100},{x:this.x-100, y:this.y+100},{x:this.x+100, y:this.y+100}];
  };

  this.returnObj = function(){
    return "rect";
  };
}

function Line(x1, y1, x2, y2){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;

  this.display = function(){
    line(x1, y1, x2, y2);
  }
}

function Triangle(x, y){
  this.x = x;
  this.y = y;

  this.display = function(){
    triangle(x-100, y + 70, x , y-100, x + 100, y+70);
  };

  this.returnCorners = function(){
    return [{x:this.x-100, y:this.y + 70}, {x:this.x, y:this.y-100},{x:this.x+100, y:this.y+70}];
  };

  this.returnObj = function(){
    return "triangle";
  };
}

function contains(obj, arr, object){
  for(i = 0; i < arr.length;i++){
    if(object == "line"){
      if(obj.x1 == arr[i].x1 && obj.y1 == arr[i].y1 && obj.x2 == arr[i].x2 && obj.y2 == arr[i].y2){
        return true;
      }
    }else{
      if(obj.x == arr[i].x && obj.y == arr[i].y){
        return true;
      }
    }
  }
  return false;
}
