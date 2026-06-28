// ========================================
// PROJECT 02 — FLOATING ERROR ENVIRONMENT
// ========================================

if (document.body.classList.contains("project02")) {

const errorLayer = document.getElementById("error-layer");
const ghostLayer = document.getElementById("ghost-errors");

// ================================
// CONFIG
// ================================

const ERROR_IMAGE_PATH = "assets/errors/";

const ERROR_IMAGES = [
"error (1).gif","error (1).jpg","error (1).png",
"error (2).gif","error (2).JPG","error (2).png",
"error (3).gif","error (3).jpg","error (3).png",
"error (4).gif","error (4).jpg","error (4).png",
"error (5).gif","error (5).JPG","error (5).png",
"error (6).gif","error (6).jpg","error (6).png",
"error (7).gif","error (7).jpg","error (7).png",
"error (8).gif","error (8).jpg","error (8).png",
"error (9).gif","error (9).JPG","error (9).png",
"error (10).gif","error (10).png",
"error (11).jpg","error (11).png",
"error (12).jpg","error (12).png",
"error (13).JPG","error (13).png",
"error (14).jpg","error (14).png",
"error (15).jpg","error (15).png",
"error (16).JPG","error (16).png",
"error (17).png","error (18).png","error (19).png",
"error (20).png","error (21).png","error (22).png",
"error (23).png","error (24).png"
];

const MAX_ERRORS = 6;
const SPAWN_INTERVAL = 6000;

const rand = (min,max)=>Math.random()*(max-min)+min;

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove",e=>{
mouseX = e.clientX;
mouseY = e.clientY;
});

// ========================================
// GHOST ERRORS (BACKGROUND)
// ========================================

function spawnGhost(){

const src = ERROR_IMAGES[Math.floor(Math.random()*ERROR_IMAGES.length)];

const ghost = document.createElement("div");
ghost.className = "ghost-error";

const img = document.createElement("img");

img.src = ERROR_IMAGE_PATH + src;

const size = rand(600,900);

img.style.width = size + "px";

ghost.appendChild(img);
ghostLayer.appendChild(ghost);

let x = rand(-300,window.innerWidth);
let y = rand(-300,window.innerHeight);

let vx = rand(-0.05,0.05);
let vy = rand(-0.05,0.05);

ghost.style.left = x+"px";
ghost.style.top = y+"px";

function float(){

x += vx;
y += vy;

if(x<-400 || x>window.innerWidth+400) vx*=-1;
if(y<-400 || y>window.innerHeight+400) vy*=-1;

ghost.style.left = x+"px";
ghost.style.top = y+"px";

requestAnimationFrame(float);

}

float();

}

// ========================================
// INTERACTIVE ERROR WINDOWS
// ========================================

function spawnError(){

if(errorLayer.children.length >= MAX_ERRORS) return;

const src = ERROR_IMAGES[Math.floor(Math.random()*ERROR_IMAGES.length)];

const wrapper = document.createElement("div");
wrapper.className = "error-window";

const img = document.createElement("img");
img.src = ERROR_IMAGE_PATH + src;

// size variation

let size;

if (Math.random() < 0.30) {
  size = rand(420, 650);
} else {
  size = rand(200, 360);
}

img.style.width = size+"px";

wrapper.appendChild(img);
errorLayer.appendChild(wrapper);

// ================================
// INITIAL POSITION
// ================================

let x = rand(-100,window.innerWidth);
let y = rand(-100,window.innerHeight);

let driftX = rand(-0.1,0.1);
let driftY = rand(-0.1,0.1);

let vx = 0;
let vy = 0;

wrapper.style.left = x+"px";
wrapper.style.top = y+"px";

// ================================
// DRAGGING
// ================================

let dragging=false;
let offsetX=0;
let offsetY=0;

let lastMouseX=0;
let lastMouseY=0;

wrapper.addEventListener("mousedown",e=>{

dragging=true;

wrapper.style.zIndex=10;

offsetX=e.clientX-x;
offsetY=e.clientY-y;

lastMouseX=e.clientX;
lastMouseY=e.clientY;

});

document.addEventListener("mousemove",e=>{

if(!dragging) return;

x=e.clientX-offsetX;
y=e.clientY-offsetY;

vx=(e.clientX-lastMouseX)*0.2;
vy=(e.clientY-lastMouseY)*0.2;

lastMouseX=e.clientX;
lastMouseY=e.clientY;

wrapper.style.left=x+"px";
wrapper.style.top=y+"px";

});

document.addEventListener("mouseup",()=>{

if(dragging){
dragging=false;
wrapper.style.zIndex=2;
}

});

// ================================
// FLOAT LOOP
// ================================

function float(){

if(!dragging){

x += driftX + vx;
y += driftY + vy;

vx *= 0.97;
vy *= 0.97;

// ================================
// CURSOR REPEL
// ================================

const dx = x - mouseX;
const dy = y - mouseY;

const distance = Math.sqrt(dx*dx + dy*dy);

const repelRadius = 180;

if(distance < repelRadius){

const force = (repelRadius-distance)/repelRadius;

x += (dx/distance)*force*6;
y += (dy/distance)*force*6;

}

// ================================
// SOFT BOUNDS
// ================================

if(x<-200 || x>window.innerWidth+200) driftX *= -1;
if(y<-200 || y>window.innerHeight+200) driftY *= -1;

wrapper.style.left=x+"px";
wrapper.style.top=y+"px";

}

requestAnimationFrame(float);

}

float();

// ================================
// RANDOM DISAPPEAR
// ================================

setTimeout(()=>{

wrapper.style.opacity=0;

setTimeout(()=>{
wrapper.remove();
},600);

}, rand(15000,35000));

}

// ========================================
// INITIAL GHOST ERRORS
// ========================================

for(let i=0;i<3;i++){
spawnGhost();
}

// ========================================
// INITIAL INTERACTIVE ERRORS
// ========================================

for(let i=0;i<MAX_ERRORS;i++){
spawnError();
}

// ========================================
// SPAWN LOOP
// ========================================

setInterval(()=>{

if(Math.random()<0.6){
spawnError();
}

},SPAWN_INTERVAL);

}