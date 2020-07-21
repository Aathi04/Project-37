var database;
var strokeColor
var x, y;
var gSlider, fVal;
var red1, black1, white1, green1,
yellow1,orange1,pink1, purple1, brown1;

var drawing = [];
var db_drawing = [];

function setup() {
  createCanvas(1200,800);
  background(255);

  database = firebase.database();

  strokeColor = "black";

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);
  clearButton.position(490,870);

  red1 = createButton("red");
  red1.position(400, 790);

  purple1 = createButton("purple");
  purple1.position(450, 790);

  black1 = createButton("black");
  black1.position(515, 790);

  brown1 = createButton("brown");
  brown1.position(570, 790);

  yellow1 = createButton("yellow");
  yellow1.position(400,820);

  orange1 = createButton("orange");
  orange1.position(460, 820);

  green1 = createButton("green");
  green1.position(520, 820);

  pink1 = createButton("pink");
  pink1.position(580, 820);

  white1 = createButton("ERASER");
  white1.position(400, 870);

  gSlider = createSlider(x,y)
  gSlider.position(400, 750);
}

function mouseDragged() {
  var point = {
    x: mouseX,
    y: mouseY,
    x1: pmouseX,
    y1: pmouseY,
    stroke_weight: fVal,
    stroke_color: strokeColor,
  }
  drawing.push(point);
  var ref = database.ref("drawing");
  ref.set({
    d: drawing,
  })
  readData();
}

function draw() {

  x = mouseX;
  y = mouseY;

  fVal = gSlider.value();
  
  white1.mousePressed(() => {
      strokeColor = "white";
  });
    
  red1.mousePressed(() => {
      strokeColor = "red";
  });

  purple1.mousePressed(() => {
    strokeColor = "purple";
  });

  black1.mousePressed(() => {
      strokeColor = "black";
  });

  yellow1.mousePressed(() => {
    strokeColor = "yellow";
  });

  orange1.mousePressed(() => {
    strokeColor = "orange";
  });

  brown1.mousePressed(() => {
    strokeColor = "brown";
  });

  pink1.mousePressed(() => {
    strokeColor = "pink";
  });

  if (mouseIsPressed && mouseY < 600) {
    stroke(0);
    stroke(strokeColor);
    strokeWeight(fVal);
    line(x, y, pmouseX, pmouseY);
  }
}

function readData() {
  var query = database.ref("drawing/").on("value", (data) => {
    db_drawing = data.val();
  });
}

function clearDrawing() {
  db_drawing = [];
  var drawingRef = database.ref("drawing");
  drawingRef.set({
    d: []
  });
  background(255);
}