document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // GALLERY
  // =========================
  const container = document.querySelector(".project06");
  if (!container) return;

  const imgElement = container.querySelector('#gallery-image');
  const videoElement = container.querySelector('#gallery-video');
  const leftBtn = container.querySelector('.arrow.left');
  const rightBtn = container.querySelector('.arrow.right');

  if (!imgElement || !videoElement || !leftBtn || !rightBtn) {
    console.log("Gallery elements missing");
    return;
  }

  const reelItems = [
    { type: "image", src: "assets/images/Project06/project06-1.jpg" },
    { type: "image", src: "assets/images/Project06/project06-4.jpg" },
    { type: "image", src: "assets/images/Project06/project06-3.jpg" },
    { type: "video", src: "assets/images/Project06/project06-2.mp4" }
  ];

  let currentIndex = 0;

  function showItem(index) {
    const item = reelItems[index];

    if (item.type === "image") {
      imgElement.src = item.src;
      imgElement.style.display = "block";

      videoElement.pause();
      videoElement.style.display = "none";
      videoElement.src = "";
    }

    if (item.type === "video") {
      videoElement.src = item.src;
      videoElement.style.display = "block";
      videoElement.play();

      imgElement.style.display = "none";
    }
  }

  function nextItem() {
    currentIndex = (currentIndex + 1) % reelItems.length;
    showItem(currentIndex);
  }

  function prevItem() {
    currentIndex = (currentIndex - 1 + reelItems.length) % reelItems.length;
    showItem(currentIndex);
  }

  leftBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    prevItem();
  });

  rightBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nextItem();
  });

  showItem(currentIndex);


  // =========================
  // CIRCLES (CLEAN + FIXED)
  // =========================
  const layer = document.getElementById("circle-layer");
  if (!layer) {
    console.warn("circle-layer missing from HTML");
    return;
  }

  function popCircle(circle) {
    if (!circle || circle.isDying) return;

    circle.isDying = true;
    circle.classList.add("pop");

    setTimeout(() => {
      circle.remove();
    }, 300);
  }

  function createCircle() {
    const circle = document.createElement("img");
    circle.src = "assets/images/Project06/Circle.png";
    circle.className = "circle";

    // prevent double-trigger issues
    circle.isDying = false;

    // BIGGER + nicer distribution
    const base = Math.random();
    const size = Math.pow(base, 2) * 320 + 80;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    // viewport-safe positioning
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    circle.style.opacity = Math.random() * 0.7 + 0.2;

    // CLICK POP (fixed)
    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      popCircle(circle);
    });

    layer.appendChild(circle);

    // AUTO POP (uses same system → no conflict)
    setTimeout(() => {
      popCircle(circle);
    }, 6000 + Math.random() * 4000);
  }

  // spawn loop
  setInterval(() => {
    if (Math.random() < 0.5) createCircle();
  }, 700);


  // =========================
  // GLITCH BACKGROUND SHIFT
  // =========================
  const gallery = document.querySelector('.gallery-container');

  if (gallery) {
    setInterval(() => {
      gallery.style.backgroundPosition =
        `${50 + (Math.random() - 0.5) * 10}% ${50 + (Math.random() - 0.5) * 10}%`;
    }, 200);
  }

});