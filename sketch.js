var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var racer2, racer2Animation;
var racer3, racer3Animation;
var racer4, racer4Animation;
var racerA, racerB, racerC;
var racer2Grp;
var racer3Grp;
var racer4Grp;
var bellSound;
var cycleBell, cycleBellImage;
var reset, resetImage;
var gameOver , gameOverImage;
var coin1, coin1Image;
var coin2, coin2Image;
var obstacle1, obstacle1Image;
var rock1, rock2;
var rock1Image, rock2Image;
var coin1Grp, coin2Grp;
var obstacle1Grp;
var rock1Grp, rock2Grp;
var booster, boosterImage,boosterGrp,power,powerImage;
var coinSound;
var gameOverSound;
var boostSound;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var goldcoin = 0;
var score = 0;

function preload(){
  pathImg = loadImage("images/Road.png");
 bellSound = loadSound("bell.mp3");
  cycleBellImage = loadImage("cycleBell.png");
  gameOverImage = loadImage("gameover.png");
  coin1Image = loadImage("coin.png");
  coin2Image = loadImage("coin.png");
  obstacle1Image = loadImage("obstacle1.png");
  rock1Image = loadImage("rock1.png");
  rock2Image = loadImage("rock2.png");
  powerImage = loadImage("power.png");
  coinSound = loadSound("coinCollect.mp3");
  gameOverSound = loadSound("gameoverSound.mp3");
  boostSound = loadSound("booster.wav");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  racer2Animation = loadAnimation("opponent1.png","opponent2.png");
  racer3Animation = loadAnimation("opponent4.png","opponent5.png");
  racer4Animation = loadAnimation("opponent7.png","opponent8.png");
  boosterImage = loadAnimation("booster1.png","booster2.png");
  racerA = loadAnimation("opponent3.png");
  racerB = loadAnimation("opponent6.png");
  racerC = loadAnimation("opponent9.png");
}

function setup(){
  
createCanvas(windowWidth, windowHeight);
  
// Moving background
path=createSprite(windowWidth-300,windowHeight/2,windowWidth, windowHeight);
path.addImage(pathImg);
path.scale = 0.5;
path.velocityX = -5;
  
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("Cycling",mainRacerImg1);
mainCyclist.scale=0.095;
mainCyclist.debug=false;
mainCyclist.setCollider("rectangle",0,0,1070,1240);
  
  
cycleBell = createSprite((width/2)-180,35,20,20);
cycleBell.addImage("cycle bell", cycleBellImage);
cycleBell.scale = 0.27;

gameOver = createSprite(windowWidth/2,(windowHeight/2)-100,20,20);
gameOver.addImage("gameOverPic",gameOverImage);
gameOver.scale = 0.6;
gameOver.visible = false;
  
  
  racer2Grp = createGroup();
  racer3Grp = createGroup();
  racer4Grp = createGroup();
  coin1Grp = createGroup();
  coin2Grp = createGroup();
  obstacle1Grp = createGroup();
  rock1Grp = createGroup();
  rock2Grp = createGroup();
  boosterGrp = createGroup();
    
  
}

function draw() {
  //code to reset the background
  if(path.x<width-1000){
    path.x = width-300;
  }
 
  if(gameState===PLAY){
   
  coins();
  obstacles();
  rocks();
  boosters();
  path.velocityX = -(4 + 2*distance/450);
    
  mainCyclist.y = World.mouseY;
    
  if(keyDown("UP_ARROW")){
    mainCyclist.y = mainCyclist.y-7;
  }
    
    if(keyDown("DOWN_ARROW")){
    mainCyclist.y = mainCyclist.y+7;
  }
    
  distance = distance + Math.round(getFrameRate()/50);
  edges= createEdgeSprites();
  mainCyclist.collide(edges);
  if(mousePressedOver(cycleBell)){
    bellSound.play();
  }

   if(frameCount%275===0){
     var select_Cyclist = Math.round(random(1,4));
     if(select_Cyclist===1){
       yellowCR();
     }
     else if(select_Cyclist===3){
       pinkCR();
     }
     else{
       redCR();
     }
   }

    if(coin1Grp.isTouching(mainCyclist)){
      coin1Grp.destroyEach();
      coinSound.play();
      goldcoin = goldcoin+1;
      score = score+10;
    }
    
      if(coin2Grp.isTouching(mainCyclist)){
      coin2Grp.destroyEach();
      coinSound.play();
      goldcoin = goldcoin+1;
      score = score+10;
    }
    
    if(obstacle1Grp.isTouching(mainCyclist)){
      gameOverSound.play();
      mainCyclist.addAnimation("Cycling",mainRacerImg2);
      racer2Grp.destroyEach();
      racer3Grp.destroyEach();
      racer4Grp.destroyEach();
      coin1Grp.destroyEach();
      coin2Grp.destroyEach();
      rock1Grp.destroyEach();
      rock2Grp.destroyEach();
      obstacle1Grp.destroyEach();
      boosterGrp.destroyEach();
      gameState=END;
    }
   if(racer2Grp.isTouching(mainCyclist)){
     gameOverSound.play();
     racer2.addAnimation("racer2Anim",racerA);
     racer2.velocityX = 0;
     racer2Grp.setLifetimeEach(-1);
     mainCyclist.addAnimation("Cycling",mainRacerImg2);
     racer3Grp.destroyEach();
     racer4Grp.destroyEach();
     coin1Grp.destroyEach();
     coin2Grp.destroyEach();
     rock1Grp.destroyEach();
     rock2Grp.destroyEach();
     obstacle1Grp.destroyEach();
     boosterGrp.destroyEach();
     gameState=END;
    }
    if(racer3Grp.isTouching(mainCyclist)){
      gameOverSound.play();
      racer3.addAnimation("racer3Anim",racerB);
      racer3.velocityX = 0;
      racer3Grp.setLifetimeEach(-1);
      racer2Grp.destroyEach();
      racer4Grp.destroyEach();
      coin1Grp.destroyEach();
      coin2Grp.destroyEach();
      rock1Grp.destroyEach();
      rock2Grp.destroyEach();
      obstacle1Grp.destroyEach();
      boosterGrp.destroyEach();
      mainCyclist.addAnimation("Cycling",mainRacerImg2);
      gameState=END;
    }
    if(racer4Grp.isTouching(mainCyclist)){
      gameOverSound.play();
      racer4.addAnimation("racer4Anim",racerC);
      racer4.velocityX = 0;
      racer4Grp.setLifetimeEach(-1);
      racer2Grp.destroyEach();
      racer3Grp.destroyEach();
      coin1Grp.destroyEach();
      coin2Grp.destroyEach();
      rock1Grp.destroyEach();
      rock2Grp.destroyEach();
      obstacle1Grp.destroyEach();
      boosterGrp.destroyEach();
      mainCyclist.addAnimation("Cycling",mainRacerImg2);
      gameState=END;
    }
    
    racer2Grp.collide(rock1Grp);
    racer2Grp.collide(rock2Grp);
    racer2Grp.collide(obstacle1Grp);
    racer3Grp.collide(rock1Grp);
    racer3Grp.collide(rock2Grp);
    racer3Grp.collide(obstacle1Grp);
    racer4Grp.collide(rock1Grp);
    racer4Grp.collide(rock2Grp);
    racer4Grp.collide(obstacle1Grp);
  
   if(rock1Grp.isTouching(mainCyclist)){
      gameOverSound.play();
      mainCyclist.addAnimation("Cycling",mainRacerImg2);
      racer2Grp.destroyEach();
      racer3Grp.destroyEach();
      racer4Grp.destroyEach();
      coin1Grp.destroyEach();
      coin2Grp.destroyEach();
      rock1Grp.destroyEach();
      rock2Grp.destroyEach();
      obstacle1Grp.destroyEach();
      boosterGrp.destroyEach();
      gameState=END;
   }
  if(rock2Grp.isTouching(mainCyclist)){
      gameOverSound.play();
      mainCyclist.addAnimation("Cycling",mainRacerImg2);
      racer2Grp.destroyEach();
      racer3Grp.destroyEach();
      racer4Grp.destroyEach();
      coin1Grp.destroyEach();
      coin2Grp.destroyEach();
      rock1Grp.destroyEach();
      rock2Grp.destroyEach();
      obstacle1Grp.destroyEach();
      boosterGrp.destroyEach();
      gameState=END;
  }
    
if(boosterGrp.isTouching(mainCyclist)){
  
  boostSound.play();
  boosterGrp.destroyEach();
  score = score+50;
  
  power = createSprite(width-1310,53,10,10);
  power.addImage("powerPic",powerImage);
  power.scale = 0.1;
  power.visible = true;
}

  }
    else if(gameState===END){
      bgSound.stop();
      path.velocityX =0;
      path.velocityy = 0;
      distance = distance+0;
      reset.visible = true;
      gameOver.visible = true; 
      
   if(mousePressedOver(reset)){
   restart();
    }
    
}
  

  drawSprites();

  textSize(25);
  fill("red");
  stroke("blue");
  textFont("Algeria");
  text("Press          to ring the Cycle Bell", (width/2)-275,45);
  
  textSize(25);
  fill("yellow");
  textFont("Algeria");
  text("Distance: "+ distance+" m",width-280,30);
  
  textSize(25);
  fill("pink");
  textFont("Algeria");
  text("Coins: "+ goldcoin,width-280,58);
  
  
  textSize(25);
  fill("lightgreen");
  stroke("green");
  textFont("Algeria");
  text("Energy: ",width-1410,55);
  
  textSize(25);
  fill("cyan");
  textFont("Algeria");
  text("Score: "+ score,width-1410,30);
  
  
  if(gameState===END){
  textSize(35);
  stroke("red");
  textFont("Algeria");
  text("Press ctrl+f5 to REPLAY",(width/2)-143,(height/2)+102);
  
  }
}

function  pinkCR(){
racer2 = createSprite(width-10,random(height-600,height-80),20,20);
racer2.addAnimation("racer2Anim",racer2Animation);
racer2.scale = 0.086;
racer2.lifetime = 800;
racer2.velocityX = -(3 + 2*distance/450);
racer2Grp.add(racer2);


}
function  yellowCR(){
  racer3 = createSprite(width-10,random(height-600,height-80),20,20);
  racer3.addAnimation("racer3Anim",racer3Animation);
  racer3.scale = 0.086;
  racer3.lifetime = 800;
  racer3.velocityX = -(3 + 2*distance/450);
 racer3Grp.add(racer3);

}
function  redCR(){
  racer4 = createSprite(width-10,random(height-600,height-80),20,20);
  racer4.addAnimation("racer4Anim",racer4Animation);
  racer4.scale = 0.086;
  racer4.lifetime = 800;
  racer4.velocityX = -(3+ 2*distance/450);
  racer4Grp.add(racer4);

}

function coins(){
  if(frameCount%475===0){
    coin1 = createSprite(width-10,(height/2)-150,10,10);
    coin1.addImage("coinPic",coin1Image);
    coin1.scale = 0.5;
    coin1.velocityX = -(3+distance*2/450);
    coin1.lifetime = 800;
    coin1.debug = false;
    coin1.setCollider("circle",0,0,52);
    coin1Grp.add(coin1);
  }
  
    if(frameCount%355===0){
    coin2 = createSprite(width-10,(height/2)+180,10,10);
    coin2.addImage("coinPic",coin2Image);
    coin2.scale = 0.5;
    coin2.velocityX = -(3+distance*2/450);
    coin2.lifetime = 800;
    coin2.debug = false;
    coin2.setCollider("circle",0,0,52);
    coin2Grp.add(coin2);
  }
}

function obstacles(){
  if(frameCount%190===0){
    obstacle1 = createSprite(width-10,(height/2)-30,20,20);
    obstacle1.addImage("obstaclePic",obstacle1Image);
    obstacle1.velocityX =  -(3+distance*2/450);
    obstacle1.scale = 0.18;
    obstacle1.lifetime = 800;
    obstacle1.debug = false;
    obstacle1.setCollider("rectangle",0,0,370,480);
    obstacle1Grp.add(obstacle1);
  }
}

function rocks(){
  var select_Rock = Math.round(random(1,2));
  if(frameCount%620===0){
    switch(select_Rock)
      {
        case 1: rock1 = createSprite(width-10,random(height-600,(height/2)),20,20);
                rock1.addImage("rockPic",rock1Image);
                rock1.velocityX =  -(3+distance*2/450);
                rock1.scale = 0.12;
                rock1.lifetime = 800;
                rock1Grp.add(rock1);
        break;
          
        case 2: rock2 = createSprite(width-10,random(height-600,(height/2)),20,20);
                rock2.addImage("rockPict",rock2Image);
                rock2.velocityX =  -(3+distance*2/450);
                rock2.scale = 0.12;
                rock2.lifetime = 800;
                rock2Grp.add(rock2);
        break;
        default: 
        break;
      }
   }
  if(frameCount%455===0){
  var select = Math.round(random(1,2));
  if(select===1){
    rock1 = createSprite(width-10,random(height-100,(height/2)),20,20);
    rock1.addImage("rockPic",rock1Image);
    rock1.velocityX =  -(3+distance*2/450);
    rock1.scale = 0.12;
    rock1.lifetime = 800;
    rock1Grp.add(rock1);
  }
  else if(select===2){
     rock2 = createSprite(width-10,random(height-100,(height/2)),20,20);
     rock2.addImage("rockPict",rock2Image);
     rock2.velocityX =  -(3+distance*2/450);
     rock2.scale = 0.12;
     rock2.lifetime = 800;
     rock2Grp.add(rock2);
    
    }
  }
}

function boosters(){
  if(frameCount%725===0){
    booster = createSprite(width-10,random(height-600,height-100),10,10);
    booster.addAnimation("boosterAnim",boosterImage);
    booster.scale = 0.175;
    booster.velocityX = -(3+distance*2/450);
    booster.lifetime = 800;
    boosterGrp.add(booster);
  }
}

function restart(){
    distance = 0;
    goldcoin = 0;
    score = 0;
  gameState = PLAY;
  bgSound.loop();
  racer2Grp.destroyEach();
  racer3Grp.destroyEach();
  racer4Grp.destroyEach();
  coin1Grp.destroyEach();
  coin2Grp.destroyEach();
  obstacle1Grp.destroyEach();
  boosterGrp.destroyEach();
  reset.visible = false;
  gameOver.visible = false;
  power.visible = false;
  mainCyclist.addAnimation("Cycling",mainRacerImg1);
}