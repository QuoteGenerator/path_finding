const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startDFS());

let boxesArray = [];

let rowAmount = 10;
let columnAmount = 10;

let boxWidth = 30;
let boxHeight = 30;

let startingPoint = 0;
let endPoint = 0;

canvas.width = boxWidth * columnAmount;
canvas.height = boxHeight * rowAmount;

canvas.style.height = `${boxHeight*rowAmount}px`;
canvas.style.width = `${boxWidth*columnAmount}px`;

class Box {
    constructor(givenXPos, givenYPos){
        this.xPos = givenXPos;
        this.yPos = givenYPos;
    }
}

for(let i = 0; i < columnAmount; i++){
    for(let j = 0; j < rowAmount; j++){
        let box = new Box(i*boxWidth,j*boxHeight);
        boxesArray.push(box);
    }
}

for(let i = 0; i < boxesArray.length; i++){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.rect(boxesArray[i].xPos, boxesArray[i].yPos, boxWidth, boxHeight);
    
    ctx.stroke();
}

drawStartingPoint();
function drawStartingPoint(){
    startingPoint = boxesArray[Math.floor(Math.random() * boxesArray.length)];
    ctx.fillStyle = "black";
    ctx.fillRect(startingPoint.xPos, startingPoint.yPos, boxWidth, boxHeight);
}

drawEndPoint();
function drawEndPoint(){
    endPoint = boxesArray[Math.floor(Math.random() * boxesArray.length)];
    ctx.fillStyle = "red";
    while(startingPoint == endPoint){
        endPoint = boxesArray[Math.floor(Math.random() * boxesArray.length)];
    }
    ctx.fillRect(endPoint.xPos, endPoint.yPos, boxWidth, boxHeight);
}

function startDFS(){
    
}