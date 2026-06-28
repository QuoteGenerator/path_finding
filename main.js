
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");

let boxesArray = [];


let rowAmount = 10;
let columnAmount = 10;

let boxWidth = 30;
let boxHeight = 30;

let startingPoint = 0;
let endPoint = 0;

startButton.addEventListener("click", () => {
        startDFS(startingPoint, []);
        startButton.remove();   
    }
);


canvas.width = boxWidth * columnAmount;
canvas.height = boxHeight * rowAmount;
canvas.style.height = `${boxHeight*rowAmount}px`;
canvas.style.width = `${boxWidth*columnAmount}px`;

class Box {
    constructor(givenXPos, givenYPos, givenExists, givenColor){
        this.xPos = givenXPos;
        this.yPos = givenYPos;
        this.alreadyLooked = false;
        this.exists = givenExists;
        this.color = givenColor;
    }
}

createBoxes();
function createBoxes() {
    let box;
    for(let i = 0; i < columnAmount; i++){
        for(let j = 0; j < rowAmount; j++){
            if(Math.random() * 10 > 5){
                box = new Box(i*boxWidth,j*boxHeight, true, "blue");
            } else {
                box = new Box(i*boxWidth,j*boxHeight, false, "black");
            }
            boxesArray.push(box);
        }
    }
}

drawBoxes();
function drawBoxes(){
    for(let i = 0; i < boxesArray.length; i++){
        ctx.beginPath();
        if(boxesArray[i].exists == true){
            ctx.strokeStyle = "black";
            ctx.rect(boxesArray[i].xPos, boxesArray[i].yPos, boxWidth, boxHeight);
            ctx.stroke();
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(boxesArray[i].xPos, boxesArray[i].yPos, boxWidth, boxHeight);
        }
        
    }
}

drawStartingPoint();
function drawStartingPoint(){
    startingPoint = boxesArray[Math.floor(Math.random() * boxesArray.length)];
    ctx.fillStyle = "blue";
    ctx.fillRect(startingPoint.xPos, startingPoint.yPos, boxWidth, boxHeight);
    startingPoint.color = "blue";
    startingPoint.exists = true;
}

drawEndPoint();
function drawEndPoint(){
    endPoint = boxesArray[Math.floor(Math.random() * boxesArray.length)];
    ctx.fillStyle = "red";
    endPoint.exists = true;
    endPoint.color = "red";

    while(startingPoint == endPoint){
        endPoint = boxesArray[Math.floor(Math.random() * boxesArray.length)];
    }

    ctx.fillRect(endPoint.xPos, endPoint.yPos, boxWidth, boxHeight);
}

let foundAllRedBoxes = false;

function startDFS(givenBox, pathArray){
    
    console.log(foundAllRedBoxes);
    if(foundAllRedBoxes == true){return;}
    if(givenBox.exists == false){return;}
    if(givenBox.alreadyLooked == true){return;}
    pathArray.push(givenBox);
    if(givenBox.color == "red"){foundAllRedBoxes = true; drawPath(pathArray); return}

    

    if(!(givenBox.xPos == endPoint.xPos && givenBox.yPos == endPoint.yPos)){
        ctx.fillStyle = givenBox.color;
        ctx.fillRect(givenBox.xPos, givenBox.yPos, boxWidth, boxHeight);
        let neighbor1 = boxesArray.find((box) => box.xPos == (givenBox.xPos-boxWidth) && box.yPos == givenBox.yPos);
        let neighbor2 = boxesArray.find((box) => box.xPos == (givenBox.xPos+boxWidth) && box.yPos == givenBox.yPos);
        let neighbor3 = boxesArray.find((box) => box.xPos == givenBox.xPos && box.yPos == (givenBox.yPos-boxHeight));
        let neighbor4 = boxesArray.find((box) => box.xPos == givenBox.xPos && box.yPos == (givenBox.yPos+boxHeight));
        let neighbor5 = boxesArray.find((box) => box.xPos == (givenBox.xPos+boxWidth) && box.yPos == (givenBox.yPos+boxHeight));
        let neighbor6 = boxesArray.find((box) => box.xPos == (givenBox.xPos-boxWidth) && box.yPos == (givenBox.yPos-boxHeight));
        let neighbor7 = boxesArray.find((box) => box.xPos == (givenBox.xPos+boxWidth) && box.yPos == (givenBox.yPos-boxHeight));
        let neighbor8 = boxesArray.find((box) => box.xPos == (givenBox.xPos-boxWidth) && box.yPos == (givenBox.yPos+boxHeight));
        givenBox.alreadyLooked = true;

        setTimeout( () => {
            if(neighbor1 != undefined){startDFS(neighbor1, [...pathArray]);}
            if(neighbor2 != undefined){startDFS(neighbor2, [...pathArray]);}
            if(neighbor3 != undefined){startDFS(neighbor3, [...pathArray]);}
            if(neighbor4 != undefined){startDFS(neighbor4, [...pathArray]);}
            if(neighbor5 != undefined){startDFS(neighbor5, [...pathArray]);}
            if(neighbor6 != undefined){startDFS(neighbor6, [...pathArray]);}
            if(neighbor7 != undefined){startDFS(neighbor7, [...pathArray]);}
            if(neighbor8 != undefined){startDFS(neighbor8, [...pathArray]);}
        }, 500);
    }
}

let pathIndex = 0;
function drawPath(path){
    if(path[pathIndex] == undefined){return;}
    setTimeout(()=>{
            ctx.fillStyle="green";
            ctx.fillRect(path[pathIndex].xPos, path[pathIndex].yPos, boxWidth, boxHeight);
            pathIndex++;
            drawPath(path);
    }, 100);
}