const gameboard = document.getElementById('gameboard');
const context = gameboard.getContext('2d');
const scoretext=document.getElementById('scoreval');

const WIDTH=gameboard.width;
const HEIGHT =gameboard.height;
const UNIT=25;
let foodx;
let foody;
let xVel= 25;
let yVel=0;
let score=0;
let active =true;
let started=false;
let paused=false;
let snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];
window.addEventListener('keydown',keypress);

startgame();

function startgame(){
    context.fillStyle ='#21221';
    // fillrect(xstart,ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayfood();
    // drawsnake();
    // movesnake();
    // clearboard();
    // drawsnake();
    drawsnake();
   
}
function clearboard(){
    context.fillStyle ='black';
    // fillrect(xstart,ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
}
function createFood(){
    foodx= Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foody= Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}
function displayfood(){
    context.fillStyle='red';
    context.fillRect(foodx,foody,UNIT,UNIT);

}
function drawsnake(){
    context.fillStyle='aqua';
    context.strokestyle='#212121';
    snake.forEach((snakepart) =>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT);
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT);


    })

}
function movesnake(){
    const head = {x:snake[0].x+xVel,y:snake[0].y+yVel}
    // want to add head in array starting so use unshit
    snake.unshift(head)
    if(snake[0].x==foodx && snake[0].y==foody ){
     score +=1;
     scoretext.textContent=score;
     createFood();
}
else
    snake.pop()
}
function nextTick(){
    if(active && !paused){
    setTimeout(() =>{
        clearboard();
        displayfood();
        movesnake();
        drawsnake();
        checkgameover();
        nextTick();
       
    },200);  
    // 200speed
}
else{
    clearboard();
    context.font="bold 50px serif"
    context.fillStyle="white";
    context.textAlign="center";
    context.fillText("Game Over!!",WIDTH/2,HEIGHT/2)
}
}
function keypress(event){
   if(!started){
    started=true;
    nextTick();
   }
    const left=37;
    const up=38;
    const right=39;
    const down =40;
    switch(true){
         //    left key pressend and not going right
        case(event.keyCode==left && xVel!=UNIT):
           xVel=-UNIT;
           yVel=0;
           break;
        //    right key pressend and not going left
        case(event.keyCode==right && xVel!=-UNIT ):
           xVel=UNIT;
           yVel=0;
           break;
        //    up key pressed and not going down
        case(event.keyCode==up && yVel!=UNIT):
           xVel=0;
           yVel=-UNIT;
           break;
        //    down key pressed not not doing up
        case(event.keyCode==down && yVel!=-UNIT):
           xVel=0;
           yVel=UNIT;
           break;    
            
    }


}
function checkgameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):

         active=false;
         break;
    }
}