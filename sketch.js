var monkey, monkeyStillImage, monkey_running, road;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime = 0;

function preload(){
  
  monkey_running =             loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  road1 = loadImage("road1.jpg");
  monkeyStillImage = loadImage("sprite_0.png");
}



function setup() {
  
  createCanvas(460,400);
  
  monkey = createSprite(50,280);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  road = createSprite(270,330,50,200);
  road.addImage(road1);
  road.scale = 1.1;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  
  background("lightblue");
  drawSprites();
  
  road.velocityX = -10;
  road.depth = monkey.depth + 1;
  road.setCollider("rectangle", 0, 0, 500,40);
  monkey.collide(road);
  
  if(road.x < 210){
    road.x = 260;
  }
  
  //obstacle Sprite
  obstacleSpawn();
  
  //banana sprite
  bananaSpawn();
  
  if(keyDown("space")){
    monkey.velocityY = -10;
    monkey.addImage(monkeyStillImage);
  }else{
    monkey.velocityY = 10;
  }
  
  if(monkey.isTouching(foodGroup)){
    survivalTime = survivalTime + 1;
    foodGroup.destroyEach();
  }
  
  //survivalTime = Math.ceil(frameCount / frameRate());
  textSize(15);
  stroke("black");
  fill("blue");
  text("Survival Time: " + survivalTime, 0,15);
  
  console.log(frameCount);
}

function obstacleSpawn(){
  
  if(frameCount % 150 === 0){
    obstacle = createSprite(500,290);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -10;
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    obstacleGroup.add(obstacle);
  }
}

function bananaSpawn(){
  
  if(frameCount % 120 === 0){
    banana = createSprite(500,100);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.09;
    banana.lifetime = 100;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    foodGroup.add(banana);
  }
}


