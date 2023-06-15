let currentValue = parseInt(document.getElementById("counter").innerText);
let counterElement = document.getElementById("counter").innerText;


function increment(){
    counterElement = currentValue + 1;
    console.log(currentValue);
}

function decrement(){
    counterElement = currentValue - 1;
}

function clear(){
    counterElement = 0;
}