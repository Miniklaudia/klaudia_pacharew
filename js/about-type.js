document.addEventListener("DOMContentLoaded", () => {

const lines = document.querySelectorAll(".type-line");

lines.forEach((line, index) => {

const text = line.innerText;
line.innerText = "";

setTimeout(() => {

let i = 0;

function type(){

if(i < text.length){

line.innerText += text.charAt(i);
i++;

setTimeout(type, 15);

}

}

type();

}, index * 700);

});

});