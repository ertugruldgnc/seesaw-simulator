const weightSound = new Audio('audio/weightSound.mp3')

const leftSideWeightStat = document.querySelector("#leftSideWeight p");
const rightSideWeightStat = document.querySelector("#rightSideWeight p");
const nextWeightStat = document.querySelector("#nextWeight p");
const angleStat = document.querySelector("#angle p");
const seesaw = document.querySelector("#seesaw");
const beam = document.querySelector("#beam");
const muteBtn = document.querySelector("#muteBtn");

let mute = false;
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

        button.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 5px 15px"

    } else if(param === "deactive"){

        button.style.boxShadow = "none"

    }
}

function randomlyWeight(){

    nextWeight = Math.round(Math.random() * 9 + 1);

    nextWeightStat.textContent = `${nextWeight} kg`;

};

randomlyWeight();

beam.addEventListener("mousemove", (event) => {

    let beamLocation = beam.getBoundingClientRect();
    let xAxis = event.clientX - beamLocation.left;
    const width = beamLocation.width;

    position = ((xAxis / width) * 2 - 1).toFixed(2);

});

beam.addEventListener("click", () => {

    const weight = document.createElement("div");

    weight.className = "weight";
    weight.style.left = `calc(50% + (${position * 50}%))`;
    weight.style.height = `${(nextWeight*3)+50}px`;
    weight.style.width = `${(nextWeight*3)+50}px`;
    weight.style.backgroundColor = weightColors[nextWeight - 1];

    if(!mute){

        weightSound.play()

    }

    beam.appendChild(weight);

    requestAnimationFrame(() => {

        weight.style.transform = "translateY(134px) translateX(-50%)";

    });

    randomlyWeight();

});

muteBtn.addEventListener("click", () => {

    mute = !mute;

    if(mute){

        toggle(muteBtn,"active")

    } else {

        toggle(muteBtn, "deactive")

    }

})