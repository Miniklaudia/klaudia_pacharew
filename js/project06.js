document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".project06");
  if (!container) return;

  const R2 = "https://pub-e3bf6ce01e0948019faa273c5ebc10ba.r2.dev";

  const imgElement = container.querySelector("#gallery-image");
  const videoElement = container.querySelector("#gallery-video");
  const leftBtn = container.querySelector(".arrow.left");
  const rightBtn = container.querySelector(".arrow.right");

  if (!imgElement || !videoElement || !leftBtn || !rightBtn) {
    console.log("Gallery elements missing");
    return;
  }

  const reelItems = [
    { type: "image", src: `${R2}/images/Project06/project06-1.jpg` },
    { type: "image", src: `${R2}/images/Project06/project06-4.jpg` },
    { type: "image", src: `${R2}/images/Project06/project06-3.jpg` },
    { type: "video", src: `${R2}/images/Project06/project06-2.mp4` }
  ];

  let currentIndex = 0;

  function showItem(index) {
    const item = reelItems[index];

    if (item.type === "image") {
      videoElement.pause();
      videoElement.style.display = "none";
      videoElement.removeAttribute("src");

      imgElement.src = item.src;
      imgElement.style.display = "block";
    }

    if (item.type === "video") {
      imgElement.style.display = "none";
      imgElement.removeAttribute("src");

      videoElement.src = item.src;
      videoElement.style.display = "block";
      videoElement.controls = true;
      videoElement.play().catch(err => console.log("Video autoplay blocked:", err));
    }
  }

  leftBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + reelItems.length) % reelItems.length;
    showItem(currentIndex);
  });

  rightBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % reelItems.length;
    showItem(currentIndex);
  });

  showItem(currentIndex);

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
    circle.src = `${R2}/images/Project06/Circle.png`;
    circle.className = "circle";
    circle.isDying = false;

    const base = Math.random();
    const size = Math.pow(base, 2) * 320 + 80;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    circle.style.left = `${Math.random() * window.innerWidth}px`;
    circle.style.top = `${Math.random() * window.innerHeight}px`;
    circle.style.opacity = Math.random() * 0.7 + 0.2;

    circle.addEventListener("click", (e) => {
      e.stopPropagation();
      popCircle(circle);
    });

    layer.appendChild(circle);

    setTimeout(() => {
      popCircle(circle);
    }, 6000 + Math.random() * 4000);
  }

  setInterval(() => {
    if (Math.random() < 0.5) createCircle();
  }, 700);

  const gallery = document.querySelector(".gallery-container");

  if (gallery) {
    setInterval(() => {
      gallery.style.backgroundPosition =
        `${50 + (Math.random() - 0.5) * 10}% ${50 + (Math.random() - 0.5) * 10}%`;
    }, 200);
  }
});