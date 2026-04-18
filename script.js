/* Media */
const weightSound = new Audio('audio/weightSound.mp3');

/* Html Elements */
const leftSideWeightStat = document.querySelector("#leftSideWeight p");
const rightSideWeightStat = document.querySelector("#rightSideWeight p");
const nextWeightStat = document.querySelector("#nextWeight p");
const angleStat = document.querySelector("#angle p");
const seesaw = document.querySelector("#seesaw");
const beam = document.querySelector("#beam");
const resetBtn = document.querySelector("#resetBtn");
const muteBtn = document.querySelector("#muteBtn");
const actionsContainer = document.querySelector("#actionsContainer")

/* Variables */
let leftSideTorque = 0;
let rightSideTorque = 0;
let weightData = {};
let weights = [];
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

/* Button Activator */
function toggle(button,param){

    if(param === "active"){

        button.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 5px 15px";

    } else if(param === "deactive"){

        button.style.boxShadow = "none";

    }
}

/* Random Weight Selector */
function randomlyWeight(){

    nextWeight = Math.round(Math.random() * 9 + 1);

    nextWeightStat.textContent = `${nextWeight} kg`;

}

/* Display Stats */
function displayStats() {
    if(position < 0){
        leftSideWeight += nextWeight;
    } else if(position > 0) {
        rightSideWeight += nextWeight;
    }
    leftSideWeightStat.textContent = `${leftSideWeight} kg`;
    rightSideWeightStat.textContent = `${rightSideWeight} kg`;
}


/* Mouse Positioon */
beam.addEventListener("mousemove", (event) => {

    const beamLocation = beam.getBoundingClientRect();
    const width = beamLocation.width;
    let xAxis = event.clientX - beamLocation.left;

    position = ((xAxis / width) * 2 - 1).toFixed(2);

});

/* Put Weight */
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
    beamMovement();
    addAction(weights);

    requestAnimationFrame(() => {

        weight.style.transform = "translateY(134px) translateX(-50%)";

    });

    randomlyWeight();

});


/* Mute */
muteBtn.addEventListener("click", () => {

    mute = !mute;

    if(mute){

        toggle(muteBtn,"active");

    } else {

        toggle(muteBtn, "deactive");

    }

});

/* Reset Everything */
resetBtn.addEventListener("click", () => {

    leftSideWeight = 0;
    rightSideWeight = 0;
    leftSide = [];
    rightSide = [];
    weights = [];
    leftSideTorque = 0;
    rightSideTorque = 0;

    leftSideWeightStat.textContent = "0 kg";
    rightSideWeightStat.textContent = "0 kg";
    angleStat.textContent = "0°";

    beam.style.transform = "translateX(-50%)";

    localStorage.clear();

    document.querySelectorAll(".weight").forEach(item => {

        item.remove();

    });
    
    document.querySelectorAll(".action").forEach(item => {

        item.remove();

    });

    randomlyWeight();

});

/* Save To Local Storage */
function saveWeight(){

    weights.push(weightData);

    localStorage.setItem("weights", JSON.stringify(weights))

    if(weightData.position < 0){

        leftSide.push(weightData);

    } else if(weightData.position > 0){

        rightSide.push(weightData);

    }

}

/* Load From Local Storage */
function loadWeights(){

    weights = JSON.parse(localStorage.getItem("weights"));

    weights.forEach(item => {

        const weight = document.createElement("div");
        weight.textContent = item.kg;
        weight.className = "weight";
        weight.style.left = `calc(50% + (${item.position * 50}%))`;
        weight.style.bottom = "16px";
        weight.style.height = `${(item.kg*3)+50}px`;
        weight.style.width = `${(item.kg*3)+50}px`;
        weight.style.backgroundColor = weightColors[item.kg - 1];

        beam.appendChild(weight);

        if (item.position < 0) {

            leftSide.push(item);
            leftSideWeight += item.kg;
            
        } else if (item.position > 0) {
            
            rightSide.push(item);
            rightSideWeight += item.kg;
            
        }

        addAction(weights)
    });

    displayStats();
    calculateTorque();
    beamMovement();

}


/* Torque Calculation */
function calculateTorque(){

    leftSideTorque = 0;
    rightSideTorque = 0;

    leftSide.forEach(item => {

        leftSideTorque += item.kg * Math.abs(item.position);

    });

    rightSide.forEach(item => {

        rightSideTorque += item.kg * item.position;

    });
}

/* Beam Movement */
function beamMovement() {

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

/* Add Action */
function addAction(weights){

    const action = document.createElement("div");
    action.className = "action"

    const beamLocation = beam.getBoundingClientRect();
    const width = beamLocation.width;

    weights.forEach(item => {

        const weight = item.kg
        const position = item.position

        const distance = parseInt(Math.abs(position * (width / 2)))
    
        if(position < 0){
    
            action.textContent = `${weight} kg weight placed ${distance} px left of the pivot`;
    
        } else if (position > 0){
    
            action.textContent = `${weight} kg weight placed ${distance} px right of the pivot`;
            
        } else if (parseInt(position) === 0){
            
            action.textContent = `${weight} kg weight placed at the pivot`;
    
        }
    
        actionsContainer.prepend(action)
    });

}

randomlyWeight();

if (localStorage.getItem("weights") !== null) {

    loadWeights();

}