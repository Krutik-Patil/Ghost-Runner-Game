var towerImg,tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghostImg, ghost;
var invisibleBlock, invisibleBlockGroup;
var gameState = "PLAY";


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  climbersGroup = new Group();
  
  doorsGroup = new Group();
  
  invisibleBlockGroup= new Group();
  
}
function setup() {
 createCanvas(600,600);
 tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
}
function draw(){
  background(0);
  
  if (gameState === "PLAY"){
      
      
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  if(keyDown("LEFT_ARROW")){
     ghost.x = ghost.x - 3;
     }
  
  if(keyDown("RIGHT_ARROW")){
     ghost.x = ghost.x + 3;
     }
  
  if(keyDown("SPACE")){
     ghost.velocityY = -1;
     }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
     ghost.velocityY = 0;
     }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
     ghost.destroy();
     gameState = "END";
     }
  
  spawnDoors();
  drawSprites();
  }
  if (gameState === "END"){
    text("GAME OVER!",230,250);
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY =1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth  +=1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
     }
}