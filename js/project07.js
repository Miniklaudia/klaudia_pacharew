document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".project07");
  if (!container) return;

  // Set background image
  document.body.style.backgroundImage = `url("assets/images/Project07/project07-1.webp")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";

  // Overlay container for rectangles
  const rectContainer = document.createElement("div");
  rectContainer.style.position = "fixed";
  rectContainer.style.top = 0;
  rectContainer.style.left = 0;
  rectContainer.style.width = "100%";
  rectContainer.style.height = "100%";
  rectContainer.style.pointerEvents = "none"; 
  rectContainer.style.overflow = "hidden";
  rectContainer.style.zIndex = "0"; 
  document.body.appendChild(rectContainer);

  const RECT_COUNT = 50;
  const rectangles = [];

  for (let i = 0; i < RECT_COUNT; i++) {
    const rect = document.createElement("div");

    // Width: some wider, some normal
    const width = 30 + Math.random() * 250;
    // Height: allow some taller rectangles
    const height = 6 + Math.random() * 30; // up to 30px height now

    const top = Math.random() * window.innerHeight;
    const left = Math.random() * window.innerWidth;
    const opacity = 0.05 + Math.random() * 0.15;

    rect.style.position = "absolute";
    rect.style.left = left + "px";
    rect.style.top = top + "px";
    rect.style.width = width + "px";
    rect.style.height = height + "px";
    rect.style.backgroundColor = `rgba(255,255,255,${opacity})`;
    rect.style.borderRadius = "2px";
    rectContainer.appendChild(rect);

    // Speed: some faster, some slower
    const speed = 0.2 + Math.random() * 1;
    rectangles.push({ el: rect, speed });
  }

  function animateRectangles() {
    rectangles.forEach(rect => {
      let left = parseFloat(rect.el.style.left);
      left += rect.speed;
      if (left > window.innerWidth) {
        left = -parseFloat(rect.el.style.width);
        rect.el.style.top = Math.random() * window.innerHeight + "px";
      } else if (left < -parseFloat(rect.el.style.width)) {
        left = window.innerWidth;
        rect.el.style.top = Math.random() * window.innerHeight + "px";
      }
      rect.el.style.left = left + "px";
    });

    requestAnimationFrame(animateRectangles);
  }

  animateRectangles();

  // Adjust on window resize
  window.addEventListener("resize", () => {
    rectangles.forEach(rect => {
      rect.el.style.top = Math.random() * window.innerHeight + "px";
    });
  });
});

// ------------------------------
// GALLERY FUNCTIONALITY
// ------------------------------
const galleryImg = document.getElementById("gallery-image");
const galleryVid = document.getElementById("gallery-video");
const leftBtn = document.querySelector(".gallery .arrow.left");
const rightBtn = document.querySelector(".gallery .arrow.right");

// Project 07 assets
const galleryItems = [
  { type: "image", src: "assets/images/Project07/project07-1.webp" },
  { type: "image", src: "assets/images/Project07/project07-2.jpg" },
  { type: "video", src: "assets/images/Project07/project07-vid1.mp4" },
  { type: "video", src: "assets/images/Project07/project07-vid2.mp4" },
  { type: "video", src: "assets/images/Project07/project07-vid3.mp4" },
];

let currentIndex = 0;

function showGalleryItem(index) {
  const item = galleryItems[index];
  if (item.type === "image") {
    galleryImg.src = item.src;
    galleryImg.style.display = "block";
    galleryVid.style.display = "none";
    galleryVid.pause();
  } else if (item.type === "video") {
    galleryVid.src = item.src;
    galleryVid.style.display = "block";
    galleryVid.play();
    galleryImg.style.display = "none";
  }
}

leftBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showGalleryItem(currentIndex);
});

rightBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  showGalleryItem(currentIndex);
});

// Show the first item initially
showGalleryItem(currentIndex);