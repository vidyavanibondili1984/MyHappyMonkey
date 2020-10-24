var bananaImage,obsImage,obsGroup,bground,score,overImage,ov;
var m1,m2,m3,m4,m5,m6,m7,m8,m9,m10;
var bgImage,monkeyImage,monkey,invground,fruitgroup,obs;
var score=0;
var gameState="play";
function preload()
{
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obsImage=loadImage("stone.png");
  bgImage=loadImage("jungle2.jpg");
 // overImage=loadImage("gameOver.png");
}
function setup() {
  createCanvas(400, 400);
  bground=createSprite(0,0,400,400);
  bground.addImage(bgImage);
  bground.velocityX=-2;
  
 monkey=createSprite(30,360,10,10);
  monkey.addAnimation("running",monkeyImage);
  monkey.scale=0.09;
  invground=createSprite(10,390,400,10);
  invground.visible=false;
  
  fruitgroup=new Group();
  obsgroup=new Group();
}

function draw() {
  background(220);
  if(bground.x<0)
    {
      bground.x=bground.width/2;
    }
  if(keyDown("space")&&monkey.y>100 && gameState==="play")
    {
      monkey.velocityY=-8;
    }
  if(fruitgroup.isTouching(monkey))
    {
      score=score+2;
      fruitgroup.destroyEach();
    }
  switch(score){
    case 10: monkey.scale=0.12;
              break;
              
   case 20:monkey.scale=0.16;
            break;
    case 30:monkey.scale=0.20;
      break;
      case 40:monkey.scale=0.26;
      break;
      default:break;
  }
  if(obsgroup.isTouching(monkey))
    {
      monkey.velocityX=0;
      bground.velocityX=0;
      monkey.scale=0.08;
      obsgroup.destroyEach();
      fruitgroup.destroyEach();
      gameState="end";
    
        
      }
  
  monkey.velocityY=monkey.velocityY+0.7;
  monkey.collide(invground);
  spawnFruits();
  spawnStones();
  drawSprites();
  fill("white");
  textSize(20);
  text("Score:"+score,200,20);
  
}
function spawnFruits()
{
  if(frameCount%60===0)
    {
      fruits=createSprite(390,200,10,10);
     fruits.addImage(bananaImage); 
      fruits.scale=0.05;
      fruits.velocityX=-6;
      fruits.y=Math.round(random(140,200));
      fruits.lifetime=500;
      fruits.depth=monkey.depth;
      monkey.depth=monkey.depth+1;
      fruitgroup.add(fruits);
      
    }
}
function spawnStones()
{
  if(frameCount%120===0)
    {
      obs=createSprite(390,370,10,10);
      obs.addImage(obsImage);
      obs.scale=0.1;
      obs.velocityX=-4;
      obs.lifetime=500;
      obsgroup.add(obs);
    }
}