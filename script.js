const weightSound = new Audio('audio/weightSound.mp3');

const leftSideWeightStat = document.querySelector("#leftSideWeight p");
const rightSideWeightStat = document.querySelector("#rightSideWeight p");
const nextWeightStat = document.querySelector("#nextWeight p");
const angleStat = document.querySelector("#angle p");
const seesaw = document.querySelector("#seesaw");
const beam = document.querySelector("#beam");
const muteBtn = document.querySelector("#muteBtn");

let leftSideTorque = 0;
let rightSideTorque = 0;
let weightData = {};
let leftSide = [];
let rightSide = [];
let mute = false;
let rightSideWeight = 0;
let leftSideWeight = 0;
let angle = 0;
let position = 0;
let nextWeight = 0;
const weightColors = [
    "Crimson",
    "DarkOrange",
    "Gold",
    "LimeGreen",
    "DeepSkyBlue",
    "MediumSlateBlue",
    "HotPink",
    "Tomato",
    "Turquoise",
    "DarkViolet"
];

function toggle(button,param){

    if(param === "active"){

        button.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 5px 15px";

    } else if(param === "deactive"){

        button.style.boxShadow = "none";

    }
}

function randomlyWeight(){

    nextWeight = Math.round(Math.random() * 9 + 1);

    nextWeightStat.textContent = `${nextWeight} kg`;

}

function displayStats() {
    if(position < 0){
        leftSideWeight += nextWeight;
    } else if(position > 0) {
        rightSideWeight += nextWeight;
    }
    leftSideWeightStat.textContent = `${leftSideWeight} kg`;
    rightSideWeightStat.textContent = `${rightSideWeight} kg`;
}

randomlyWeight();

beam.addEventListener("mousemove", (event) => {

    let beamLocation = beam.getBoundingClientRect();
    let xAxis = event.clientX - beamLocation.left;
    const width = beamLocation.width;

    position = ((xAxis / width) * 2 - 1).toFixed(2);

});

beam.addEventListener("click", () => {

    const weight = document.createElement("div");
    weightData = {kg: nextWeight, position: position};

    saveWeight();

    weight.textContent = nextWeight;
    weight.className = "weight";
    weight.style.left = `calc(50% + (${position * 50}%))`;
    weight.style.height = `${(nextWeight*3)+50}px`;
    weight.style.width = `${(nextWeight*3)+50}px`;
    weight.style.backgroundColor = weightColors[nextWeight - 1];

    if(!mute){

        weightSound.play();

    }

    beam.appendChild(weight);
    displayStats();
    calculateTorque();
    bameMovement();

    requestAnimationFrame(() => {

        weight.style.transform = "translateY(134px) translateX(-50%)";

    });

    randomlyWeight();

});

muteBtn.addEventListener("click", () => {

    mute = !mute;

    if(mute){

        toggle(muteBtn,"active");

    } else {

        toggle(muteBtn, "deactive");

    }

});

function saveWeight(){

    if(weightData.position < 0){

        leftSide.push(weightData);

    } else if(weightData.position > 0){

        rightSide.push(weightData);

    }
}

function calculateTorque(){

    leftSideTorque = 0;
    rightSideTorque = 0;

    leftSide.forEach(item => {

        leftSideTorque += Object.values(item)[0] * Math.abs(Object.values(item)[1]);

    });

    rightSide.forEach(item => {

        rightSideTorque += Object.values(item)[0] * Object.values(item)[1];

    });
}

function bameMovement() {

    const torqueDiff = Math.abs(leftSideTorque - rightSideTorque);
    const rotationAngle = Math.min(torqueDiff, 30);

    if(leftSideTorque === rightSideTorque){

        beam.style.transform = "translateX(-50%)";
        angleStat.textContent = "0°";

    } else if(leftSideTorque < rightSideTorque){

        angleStat.textContent = `${parseInt(rotationAngle)}°`;
        beam.style.transform = `translateX(-50%) rotate(${rotationAngle}deg)`;

    } else if(leftSideTorque > rightSideTorque){

        angleStat.textContent = `-${parseInt(rotationAngle)}°`;
        beam.style.transform = `translateX(-50%) rotate(-${rotationAngle}deg)`;
        
    }
}