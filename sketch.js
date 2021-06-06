var road, roadImg;
var runner, runnerImg, runnerImg1;
var cash, cashImg, cashG;
var diamonds, diamondsImg, diamondG;
var gameOver, gameOverImg;
var jwell, jwellImg, jwellG;
var sword, swordImg, swordG;

var play = 1;
var end = 0;
var gameState = play;
var score = 0;

function preload() {
  
  roadImg=loadImage("Road.png");
  runnerImg=loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg=loadImage("cash.png");
  diamondImg=loadImage("diamonds.png");
  gameOverImg=loadImage("gameOver.png");
  jwellImg=loadImage("jwell.png");
  swordImg=loadImage("sword.png");
  runnerImg1=loadAnimation("Runner-1.png");
  }

function setup() {
  createCanvas(400, 500);
  
  road=createSprite(200, 200, 15, 15);
  road.addImage(roadImg);
  road.scale=0.7;
    
  runner=createSprite(150, 430, 15, 15)
  runner.addAnimation("walking", runnerImg);
  runner.addAnimation("stopping",runnerImg1);
  runner.scale=0.07;
  runner.debug = false;
  runner.setCollider("rectangle", 10, 10, 1100, 1100);
  
  gameOver = createSprite(200,200,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7;
  gameOver.visible = false;
  
  cashG = new Group();
  diamondG = new Group();
  jwellG = new Group();
  swordG = new Group();  
  }

function draw() {
  
  background(210);  
  
  if(gameState === play){  
     
  runner.x=World.mouseX;  
  
  if (cashG.isTouching(runner)){
  score = score+1;
  cashG.destroyEach();
  }
  if (diamondG.isTouching(runner)){
  score = score+5;
  diamondG.destroyEach();
  }
  if (jwellG.isTouching(runner)){
  score = score+3;
  jwellG.destroyEach();
  }  
  if (swordG.isTouching(runner)){
  gameState = end;
  }    
    
  if(road.y>400){
  road.y=200;
  }
  
  road.velocityY=5;
  
  spawnsword();
  spawndiamond();
  spawnjwell();
  spawncash();    
  }
  
  if(gameState === end){
    
  road.velocityY=0;
  cashG.setVelocityYEach(0); 
  diamondG.setVelocityYEach(0); 
  jwellG.setVelocityYEach(0);
  swordG.setVelocityYEach(0); 
  gameOver.visible = true;
  runner.changeAnimation("stopping", runnerImg1);        
  }
  
  drawSprites();

  stroke("black");
  fill("red");
  textSize(18);
  text("SCORE : "+ score, 150, 30);  
  }

function spawncash(){
  if(frameCount % 250 === 0){
  cash=createSprite(random(10,280), -5, 10, 10);
  cash.addImage(cashImg);
  cash.scale=0.1;
  cash.velocityY=5; 
  cash.lifetime=400;    
  cashG.add(cash);
  }  
  }

function spawnjwell(){
  if(frameCount % 200 === 0){
  jwell=createSprite(200, -10, 10, 10);
  jwell.addImage(jwellImg);
  jwell.scale=0.1;
  jwell.velocityY=5;
  jwell.lifetime=-5;
  jwell.x=Math.round(random(20, 250));
  jwellG.add(jwell);
  }  
  }

function spawndiamond(){
  if(frameCount % 400 === 0){
  diamond=createSprite(250, -5, 10, 10);
  diamond.addImage(diamondImg);
  diamond.scale=0.03;  
  diamond.velocityY=5;
  diamond.lifetime=-5;
  diamond.x=Math.round(random(40, 280));
  diamondG.add(diamond);
  }    
  }

function spawnsword(){
  if(frameCount % 350 === 0){
  sword=createSprite(100, -5, 15, 15);
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY=5;
  sword.lifetime=400;
  sword.x=Math.round(random(30, 250));
  swordG.add(sword);
  }  
  }