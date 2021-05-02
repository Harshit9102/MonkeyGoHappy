var play=1;
var end=0;
var gamestate=play;
var monkey , monkey_running;
var monkey_collided;
var bg,bgImage;
var fake_ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup; 
var ObstacleGroup;
var score=0;
var restart_button,restart_buttonImage;
var restart,restartImage;


function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=loadAnimation("sprite_0.png")
  restart_buttonImage=loadImage("REPLAY BUTTON.png");
  restartImage=loadImage("restart.png");
  bgImage = loadImage("Jungle bg.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(900,670);
  
  
  bg = createSprite(600,250,1,1);
  bg.addImage(bgImage);
  bg.scale=2.5 ;
  bg.velocityX=-3;
  
  
monkey = createSprite(50,330,1,1);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.07;
  
  fake_ground = createSprite(200,600,910,10);
  fake_ground.visible=false;
  
  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
  restart_button = createSprite(400,300,1,1);
  restart_button.addImage(restart_buttonImage);
  restart_button.scale=0.1;
  restart_button.visible=false;
  
  restart = createSprite(400,250,1,1);
  restart.addImage(restartImage);
  restart.scale=0.3;
  restart.visible=false;
  
  
  edges=createEdgeSprites();
}


function draw() {
    background("skyblue");

  if(gamestate===play){
     if(bg.x<150 ){
    bg.x=bg.width/2;
  }
    if(keyDown("space")&&monkey.y>320){
    monkey.velocityY=-15;
  }
  
  monkey.velocityY=monkey.velocityY+1;
  
     if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
  }
    switch(score){
    case 10: monkey.scale=0.08;
      break;
    case 20: monkey.scale=0.09;
      break;
    case 30: monkey.scale=0.1;
      break;
    case 40: monkey.scale=0.2;
      break;
      default:break;
    }
      if(ObstacleGroup.isTouching(monkey)){
        gamestate=end;
      }
     spawn_banana();
  spawn_obstacles();
    
   }else if(gamestate===end){
     bg.velocityX=0;
     monkey.changeAnimation("collided",monkey_collided);
    ObstacleGroup.destroyEach();
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.destroyEach();
     restart.visible=true;
     restart_button.visible=true;
     if(mousePressedOver(restart_button)){
       reset();
     }
   }
  
    
  
  monkey.collide(edges);
  monkey.collide(fake_ground);
  
  
  
  
  
    
  
  
  
 
  
  
  
  drawSprites();
  
  text(mouseX+","+mouseY,mouseX,mouseY);
  
   stroke("black");
  textSize(20);
  fill("black");
   
  
  text("Score= "+score,250,50);  
}

function spawn_banana(){
  if(frameCount%100===0){
    banana = createSprite(450,450,1,1);
    banana.addImage(bananaImage);
    banana.scale=0.2;
    banana.velocityX=-5;
    banana.y=Math.round(random(200,400));
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}

function spawn_obstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(910,580,1,1);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-7;
    obstacle.lifetime=200;
    ObstacleGroup.add(obstacle);
  }
}

function reset(){
  gamestate=play;
  score=0;
  bg.velocityX=-3;
  FoodGroup.destroyEach();
  ObstacleGroup.destroyEach();
  restart.visible=false;
  restart_button.visible=false;
  monkey.changeAnimation("running",monkey_running);
}



