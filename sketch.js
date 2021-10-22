var PLAY = 1;
var END = 0
var score = 0;
var gameState = PLAY;


var ground,groundImg;
var space,spaceImg;
var ufoGroup,ufo,ufo2;
var bulletGroup,bulletImg;
var craftGroup,craftImg;
var blastSound;
var restart,restartImg;


function preload(){
groundImg = loadImage("ground.png");
spaceImg = loadImage("space.png")
ufo2 = loadImage("ufo2.png");
bulletImg = loadImage("bullet.png");
craftImg = loadImage("craft.png")
restartImg = loadImage("restart.png");


blastSound = loadSound("blast.wav")

}

function setup() {
  createCanvas(400,400) 

 ground = createSprite(200,200)
 ground.addImage("ground",groundImg)
 ground.y = height/2
 ground.velocityY = -(2 + 5*score/30)

 space = createSprite(200,350,30,30)
 space.addImage("space",spaceImg)
 space.scale = 0.2
 space.y = 320;
 space.debug = false;
 space.setCollider('circle',0,0,230)
 
 restart = createSprite(200,200,30,30)
 restart.addImage("restart",restartImg);
 restart.scale = 0.08
 
 invisiableGround = createSprite(40,2,800,5)
 invisiableGround.visible = false;

 invisiableGround1 = createSprite (40,398,800,5)
 invisiableGround1.visible = false;

 invisiableGround2 = createSprite (3,398,5,800)
 invisiableGround2.visible = false;

 invisiableGround3 = createSprite (398,398,5,800)
 invisiableGround3.visible = false;

     ufoGroup = new Group();
     craftGroup = new Group();
     bulletGroup = createGroup();
}

function draw() {

  if(ground.y < 0){
      ground.y = ground.height/2
      ground.velocityY = -(2 + 5*score/30)
    }
  
    space.collide(invisiableGround2)
    space.collide(invisiableGround3)
  
    if(keyDown("a")){
    space.velocityX = -4
    }
  
     if(keyDown("d")){
     space.velocityX = 4
      }
  
      createufo();
      createcraft();
  
      if(ufoGroup.isTouching(space)){
      ground.velocityY = 0;
      ufo.velocityY = 0;
      
    }

    
    if(bulletGroup.isTouching(ufoGroup)){
      score = score+9
      blastSound.play();
       ufoGroup.destroyEach();
       gameState = END;
    }
    if(craftGroup.isTouching(space)){
      ground.velocityY = 0;
      craft.velocityY = 0;
      
    }

    if(bulletGroup.isTouching(craftGroup)){
      score = score+5
      blastSound.play();
       craftGroup.destroyEach();
       gameState = END;
    }

    if(gameState===END){

      restart.visible = true;



    }

    

    spwanbullet();

 
    
 
 
  drawSprites(); 
  textSize(20);
    fill("red")
    text("score:" + score,300,30)
 
 
}

function createufo(){
  if(World.frameCount % 60 === 0){
    var ufo = createSprite(Math.round(random(50,width-50),40,10,10));
    ufo.addImage("uof",ufo2);
    ufo.scale = 0.8;
    ufo.velocityY = 7;
    ufo.debug = false;
    ufo.setCollider('circle',0,0,50)
    ufo.lifetime = 200;
    ufoGroup.add(ufo)
  }

}
function createcraft(){
  if(World.frameCount % 100 === 0){
    var craft = createSprite(Math.round(random(50,width-50),40,10,10));
    craft.addImage("craft",craftImg);
    craft.scale = 0.8;
    craft.velocityY = 4;
    craft.debug = false;
    craft.setCollider('circle',0,0,50)
    craft.lifetime = 200;
    craftGroup.add(craft)
  }

}


function spwanbullet(){
  if(frameCount % 30 === 0){
   var bullet = createSprite(200,300,30,30);
   bullet.addImage("bullet",bulletImg);
   bullet.y = Math.round(random(80,350));
   bullet.scale = 0.05
   bullet.debug = false;
   bullet.setCollider('circle',0,0,200)

   bullet.velocityY = -3
   bullet.lifetime = 200
   bulletGroup.add(bullet);

      space.depth = bullet.depth;
      bullet.depth = bullet.depth+1

     bullet.x = space.x+13

  }
}


