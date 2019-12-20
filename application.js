var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Constraint = Matter.Constraint;

//Global variables
var boxesRope1 = [];
var rope1Static;
var rope1Active;
var rope1Constraint = [];
var boxesRope2 = [];
var rope2Active;
var rope2Static;
var rope2Constraint = [];
var boxesRope3 = [];
var rope3Static;
var rope3Active;
var rope3Constraint = [];
var engine;
var world;
var box1;
var mousePosition = {};
var mouseSpeed;
var mouseHasMoved;
var mouseDown;
var prevX = 0;
var prevY = 0;
var score = 0;
var scoreText;
var rope3Slide = {
  min: 100,
  max: 400,
};
var star1 = {
  x: 390,
  y: 350,
  active: true
};
var star2= {
  x: 200,
  y: 450,
  active: true
};
var star3 = {
  x: 50,
  y: 540,
  active: true
}
var endBox = {
  x: 130,
  y: 540,
  sizeX: 60,
  sizeY: 60
}
var slideValue = 1;
//Stage and Pixi Renderer
var stage = new PIXI.Container();
const renderer = PIXI.autoDetectRenderer(800,600,{
  transparent: true,
  resolution: 1
});

//Creates a canvas at ID "display"
document.getElementById('display').appendChild(renderer.view);
function setup() {
  //Booleans to make sure each first box of a rope is static and each rope is drawn.
  rope1Static = true;
  rope2Static = true;
  rope3Static = true;
  rope1Active = true;
  rope2Active = true;
  rope3Active = true;

  mouseDown = false;
  mouseHasMoved = false;
  stage.interactive = true;
  engine = Engine.create();

  //Create main box.
  box1 = Bodies.rectangle(300, 250, 40, 40);
  world = engine.world;
  Engine.run(engine);
  World.add(world, box1);

    //Create boxes for rope 1.
    for (i = 150; i < 400; i += 10) {
    if (rope1Static == true) {
      boxRope1 = Bodies.rectangle(i, 100, 3, 3, { isStatic: true});
      rope1Static = false;
    }
    else {
      boxRope1 = Bodies.rectangle(i, 100, 3, 3);
    }
    boxesRope1.push(boxRope1);
    }
    //Add all boxes of rope 1 to the Matter.js world.
    for (i = 0; i < boxesRope1.length; i++) {
    World.add(world, boxesRope1[i]);
    }

    //Create boxes for rope 2.
    for (i = 150; i < 400; i += 10) {
    if (rope2Static == true) {
      boxRope2 = Bodies.rectangle(i, 200, 3, 3, { isStatic: true});
      rope2Static = false;
    }
    else {
      boxRope2 = Bodies.rectangle(i, 300, 3, 3);
    }
    boxesRope2.push(boxRope2);
    }
    //Add all boxes of rope 2 to the Matter.js world.
    for (i = 0; i < boxesRope2.length; i++) {
    World.add(world, boxesRope2[i]);
    }

    //Create boxes for rope 3.
    for (i = 600; i < 900; i += 10) {
    if (rope3Static == true) {
      boxRope3 = Bodies.rectangle(i, 300, 3, 3, { isStatic: true});
      rope3Static = false;
    }
    else {
      boxRope3 = Bodies.rectangle(i, 300, 3, 3);
    }
    boxesRope3.push(boxRope3);
    }
    //Add all boxes of rope 3 to the Matter.js world.
    for (i = 0; i < boxesRope3.length; i++) {
    World.add(world, boxesRope3[i]);
    }


  //Constraints for rope 1.
  for (i = 1; i < boxesRope1.length + 1; i++) {
    if (i < boxesRope1.length) {
  var options = {
    bodyA: boxesRope1[i],
    bodyB: boxesRope1[i-1],
    length: 1,
    stiffness: 1
  }
  }
  else {
    var options = {
      bodyA: boxesRope1[i-1],
      bodyB: box1,
      length: 25, //Below 25, the box starts glitching.
      stiffness: 1
    }
  }
  var constraint = Constraint.create(options);
  World.add(world, constraint);
  rope1Constraint.push(constraint);
  }

  //Constraints for rope 2.
  for (i = 1; i < boxesRope2.length + 1; i++) {
    if (i < boxesRope2.length) {
  var options = {
    bodyA: boxesRope2[i],
    bodyB: boxesRope2[i-1],
    length: 1,
    stiffness: 1
  }
  }
  else {
    var options = {
      bodyA: boxesRope2[i-1],
      bodyB: box1,
      length: 25, //Below 25, the box starts glitching.
      stiffness: 1
    }
  }
  var constraint = Constraint.create(options);
  World.add(world, constraint);
  rope2Constraint.push(constraint);
  }

  //Constraints for rope 3.
  for (i = 1; i < boxesRope3.length + 1; i++) {
    if (i < boxesRope3.length) {
  var options = {
    bodyA: boxesRope3[i],
    bodyB: boxesRope3[i-1],
    length: 1,
    stiffness: 1
  }
  }
  else {
    var options = {
      bodyA: boxesRope3[i-1],
      bodyB: box1,
      length: 25, //Below 25, the box starts glitching.
      stiffness: 1
    }
  }
  var constraint = Constraint.create(options);
  World.add(world, constraint);
  rope3Constraint.push(constraint);
  }
}

function draw() {

  //Draw main box.
  var box1Graphic = new PIXI.Graphics();
  box1Graphic.beginFill(0xFFFF00);
  box1Graphic.lineStyle(5, 0xFF0000);
  box1Graphic.drawRect(box1.position.x + 10, box1.position.y + 10, 20, 20);

  //Draw each rectangle of rope 1.
  if (rope1Active) {
  var drawRopes1 = new PIXI.Graphics();
  drawRopes1.beginFill(0xFFFF00);
  drawRopes1.lineStyle(5, 0xFF0000);
  for (i = 0; i < boxesRope1.length; i++) {
    drawRopes1.drawRect(boxesRope1[i].position.x, boxesRope1[i].position.y, 3, 3);
  }
}

  //Draw each rectangle of rope 2.
  if (rope2Active) {
  var drawRopes2 = new PIXI.Graphics();
  drawRopes2.beginFill(0xFFFF00);
  drawRopes2.lineStyle(5, 0xFF0000);
  for (i = 0; i < boxesRope2.length; i++) {
    drawRopes2.drawRect(boxesRope2[i].position.x, boxesRope2[i].position.y, 3, 3);
  }
}

  //Draw each rectangle of rope 3.
  if (rope3Active) {
  var drawRopes3 = new PIXI.Graphics();
  drawRopes3.beginFill(0xFFFF00);
  drawRopes3.lineStyle(5, 0xFF0000);
  for (i = 0; i < boxesRope3.length; i++) {
    drawRopes3.drawRect(boxesRope3[i].position.x, boxesRope3[i].position.y, 3, 3);
  }
}

  //The rectangle around the moving 3rd rope.
  var rope3Container = new PIXI.Graphics();
  rope3Container.beginFill(220000);
  rope3Container.lineStyle(1, 220000);
  rope3Container.drawRect(590, 100, 20, 300);

  //Drawing Stars.
  //Star1
  var star1Draw = new PIXI.Graphics();
  star1Draw.beginFill(0xFF0000);
  star1Draw.lineStyle(3, 220000);
  star1Draw.drawRect(star1.x, star1.y, 20, 20);

  //Star2
  var star2Draw = new PIXI.Graphics();
  star2Draw.beginFill(0xFF0000);
  star2Draw.lineStyle(3, 220000);
  star2Draw.drawRect(star2.x, star2.y, 20, 20);

  //Star3
  var star3Draw = new PIXI.Graphics();
  star3Draw.beginFill(0xFF0000);
  star3Draw.lineStyle(3, 220000);
  star3Draw.drawRect(star3.x, star3.y, 20, 20);

  //Draw "end box".
  var endDraw = new PIXI.Graphics();
  endDraw.beginFill(2200000);
  endDraw.lineStyle(3, 0xFF0000);
  endDraw.drawRect(endBox.x, endBox.y, endBox.sizeX, endBox.sizeY);

  let line1Draw = new PIXI.Graphics();
  if (rope1Active) {
  for (i = 0; i < boxesRope1.length; i++) {
  line1Draw.lineStyle(2, 220000);
  line1Draw.moveTo(0, 0);
  if (i < boxesRope1.length-2) {
  line1Draw.moveTo(boxesRope1[i].position.x, boxesRope1[i].position.y);
  line1Draw.lineTo(boxesRope1[i+1].position.x, boxesRope1[i+1].position.y);
  }
  else {
    line1Draw.moveTo(boxesRope1[i].position.x, boxesRope1[i].position.y);
    line1Draw.lineTo(box1.position.x, box1.position.y);
  }
  }
}

let line2Draw = new PIXI.Graphics();
if (rope2Active) {
for (i = 0; i < boxesRope2.length; i++) {
line2Draw.lineStyle(2, 220000);
line2Draw.moveTo(0, 0);
if (i < boxesRope2.length-1) {
line2Draw.moveTo(boxesRope2[i].position.x, boxesRope2[i].position.y);
line2Draw.lineTo(boxesRope2[i+1].position.x, boxesRope2[i+1].position.y);
}
else {
  line2Draw.moveTo(boxesRope2[i-1].position.x, boxesRope2[i-1].position.y);
  line2Draw.lineTo(box1.position.x, box1.position.y);
}
}
}

let line3Draw = new PIXI.Graphics();
if (rope3Active) {
for (i = 1; i < boxesRope3.length + 1; i++) {
line3Draw.lineStyle(2, 220000);
line3Draw.moveTo(0, 0);
if (i < boxesRope3.length - 4) {
line3Draw.moveTo(boxesRope3[i].position.x, boxesRope3[i].position.y);
line3Draw.lineTo(boxesRope3[i-1].position.x, boxesRope3[i-1].position.y);
}
else {
  line3Draw.moveTo(boxesRope3[boxesRope1.length].position.x, boxesRope3[boxesRope1.length].position.y);
  line3Draw.lineTo(box1.position.x, box1.position.y);
}
}
}


  //Add to stage
  stage.addChild(rope3Container);
  if (star1.active) {
  stage.addChild(star1Draw);
  }
  if (star2.active) {
  stage.addChild(star2Draw);
  }
  if (star3.active) {
  stage.addChild(star3Draw);
  }
  stage.addChild(box1Graphic);
  if (rope1Active) {
  stage.addChild(line1Draw);
  }
  if (rope2Active) {
  stage.addChild(line2Draw);
  }
  if (rope3Active) {
  stage.addChild(line3Draw);
  }
  stage.addChild(scoreText);
  stage.addChild(endDraw);

  //Render the stage
  renderer.render(stage);

  //Remove from stage
  stage.removeChild(box1Graphic);

  if (rope1Active) {
  stage.removeChild(drawRopes1);
  stage.removeChild(line1Draw);
  }
  if (rope2Active) {
  stage.removeChild(drawRopes2);
  stage.removeChild(line2Draw);
  }
  if (rope3Active) {
  stage.removeChild(drawRopes3);
  stage.removeChild(line3Draw);
  }
  stage.removeChild(rope3Container);
  if (star1.active) {
  stage.removeChild(star1Draw);
  }
  if (star2.active) {
  stage.removeChild(star2Draw);
  }
  if (star3.active) {
  stage.removeChild(star3Draw);
  }
  stage.removeChild(scoreText);
}

//EventListener to see if the mouse is moving. If so, save the mouse coordinates in mousePosition.x and .y
document.addEventListener('mousemove',(evt)=>{
  mouseHasMoved = true;
  var mx = evt.clientX;
  var my = evt.clientY;
  mousePosition = {
    x: mx,
    y: my
  }
});

//EventListener to see if mouse button is currently pressed.
document.addEventListener('mousedown',(evt)=>{
  mouseDown = true;
});

//EventListener to see if mouse button is released.
document.addEventListener('mouseup',(evt)=>{
  mouseDown = false;
});


function mouseSpeedCalc() {
  let dx = prevX - mousePosition.x;
  let dy = prevY - mousePosition.y;
  var difBtwnPoints =  Math.sqrt(dx*dx + dy*dy);
  prevX = mousePosition.x;
  prevY = mousePosition.y;
  return difBtwnPoints;
}

function checkForCut() {
  //Check if mouse touches Rope 1. If so, remove all objects and constraints of Rope 1s from World and stop drawing the rope.
  for (i = 0; i < boxesRope1.length; i++) {
    if (mousePosition.x > boxesRope1[i].position.x && mousePosition.x < boxesRope1[i].position.x + 10 && mousePosition.y > boxesRope1[i].position.y && mousePosition.y < boxesRope1[i].position.y + 10 && mouseDown == true && mouseSpeed > 0) {
      rope1Active = false;
      for (j = 0; j < boxesRope1.length; j++) {
      World.remove(world, boxesRope1[j]);
      }
      for (k = 0; k < rope1Constraint.length; k++) {
        World.remove(world, rope1Constraint[k]);
      }
    }
  }

  //Check if mouse touches Rope 2. If so, remove all objects and constraints of Rope 2 from World and stop drawing the rope.
  for (i = 0; i < boxesRope2.length; i++) {
    if (mousePosition.x > boxesRope2[i].position.x && mousePosition.x < boxesRope2[i].position.x + 10 && mousePosition.y > boxesRope2[i].position.y && mousePosition.y < boxesRope2[i].position.y + 10 && mouseDown == true && mouseSpeed > 0) {
      rope2Active = false;
      for (j = 0; j < boxesRope2.length; j++) {
      World.remove(world, boxesRope2[j]);
      }
      for (k = 0; k < rope2Constraint.length; k++) {
        World.remove(world, rope2Constraint[k]);
      }
    }
  }

  //Check if mouse touches Rope 3. If so, remove all objects and constraints of Rope 3 from World and stop drawing the rope.
  for (i = 0; i < boxesRope3.length; i++) {
    if (mousePosition.x > boxesRope3[i].position.x && mousePosition.x < boxesRope3[i].position.x + 10 && mousePosition.y > boxesRope3[i].position.y && mousePosition.y < boxesRope3[i].position.y + 10 && mouseDown == true && mouseSpeed > 0) {
      rope3Active = false;
      for (j = 0; j < boxesRope3.length; j++) {
      World.remove(world, boxesRope3[j]);
      }
      for (k = 0; k < rope3Constraint.length; k++) {
        World.remove(world, rope3Constraint[k]);
      }
    }
  }

}

function CheckForCollisionStar() {
  if (box1.position.x + 20 > star1.x && box1.position.x + 20 < star1.x + 20 && box1.position.y + 20 > star1.y && box1.position.y + 20 < star1.y + 20 && star1.active) {
    star1.active = false;
    score++;
  }
  if (box1.position.x + 20 > star2.x && box1.position.x + 20 < star2.x + 20 && box1.position.y + 20 > star2.y && box1.position.y + 20 < star2.y + 20 && star2.active) {
    star2.active = false;
    score++;
  }
  if (box1.position.x + 20 > star3.x && box1.position.x + 20 < star3.x + 20 && box1.position.y + 20 > star3.y && box1.position.y + 20 < star3.y + 20 && star3.active) {
    star3.active = false;
    score++;
  }
}


function animate() {
  scoreText = new PIXI.Text('Score: ' + score + '/3', { font: '20px Snippet', fill: 'black', align: 'left' });
  scoreText.position.x = 20;
  scoreText.position.y = 20;
  draw();
  CheckForCollisionStar();

  if (mouseHasMoved) {
  mouseSpeed = mouseSpeedCalc();
  checkForCut();
  }

  if (boxesRope3[0].position.y <= rope3Slide.min) {
  slideValue = 1
  }
  if (boxesRope3[0].position.y >= rope3Slide.max) {
  slideValue = -1
  }

  boxesRope3[0].position.y += slideValue;

  requestAnimationFrame(animate);

}

setup();
animate();
