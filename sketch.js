var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime;
var ground;
var bg,bgimage;
var score=0;
function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  bgimage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(600,600);
  bg = createSprite(0,0,100,100);
  bg.addImage(bgimage);
  bg.scale=1.7;
  bg.velocityX=-5;
  
  monkey = createSprite(70,330,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(300,365,900,10);
  
  
  ground.visible=false;
  console.log(ground.x);
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  score=0;
  survivaltime=0;
}


function draw() {
   background("white");
  
  
   console.log(bg.x)
  if (bg.x < 0){
      bg.x = bg.width/2;
    }
  
  if(keyDown("space")){
    monkey.velocityY=-15;
  }
  
  if(FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
    switch(score){
      case 10 : monkey.scale=0.12;
        break;
      case 20 : monkey.scale=0.14;
        break;
      case 30 : monkey.scale=0.16;
        break;
      case 40 : monkey.scale=0.18
      default: break;
    }
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  bananas();
  rocks();
  
  monkey.collide(ground);

  drawSprites();
  stroke("black");
  textSize(20);
  fill("black")
  text("Score:"+score,500,50);
  
 stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivaltime,100,50);
}

function bananas(){
  if(frameCount%80===0){
    banana = createSprite(400,320,20,20);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-4;
    FoodGroup.add(banana);
  }
}

function rocks(){
  if(frameCount%300===0){
    rock = createSprite(400,345,20,20);
    rock.velocityX=-7;
    rock.addImage(obstaceImage);
    rock.scale=0.1;
    rock.lifetime=100;
    obstacleGroup.add(rock);
  }
}