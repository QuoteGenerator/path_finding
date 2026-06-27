const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;

let boxesArray = [];

class Box {
    constructor(givenXPos, givenYPos){
        this.xPos = givenXPos;
        this.yPos = givenYPos;
    }
}

for(let i = 0; i < 30; i++){
    for(let j = 0; j < 30; j++){
        let box = new Box(i*10,j*10);
        boxesArray.push(box);
    }
}

for(let i = 0; i < boxesArray.length; i++){
    ctx.beginPath();
    ctx.rect(boxesArray[i].xPos, boxesArray[i].yPos, 30, 30);
    ctx.stroke();
}