document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("project07")) return;

  const R2 = "https://pub-e3bf6ce01e0948019faa273c5ebc10ba.r2.dev";

  const rectContainer = document.createElement("div");
  rectContainer.style.position = "fixed";
  rectContainer.style.top = 0;
  rectContainer.style.left = 0;
  rectContainer.style.width = "100%";
  rectContainer.style.height = "100%";
  rectContainer.style.pointerEvents = "none";
  rectContainer.style.overflow = "hidden";
  rectContainer.style.zIndex = "1";
  document.body.appendChild(rectContainer);

  const RECT_COUNT = 50;
  const rectangles = [];

  for (let i = 0; i < RECT_COUNT; i++) {
    const rect = document.createElement("div");

    const width = 30 + Math.random() * 250;
    const height = 6 + Math.random() * 30;

    rect.style.position = "absolute";
    rect.style.left = Math.random() * window.innerWidth + "px";
    rect.style.top = Math.random() * window.innerHeight + "px";
    rect.style.width = width + "px";
    rect.style.height = height + "px";
    rect.style.backgroundColor = `rgba(255,255,255,${0.05 + Math.random() * 0.15})`;
    rect.style.borderRadius = "2px";

    rectContainer.appendChild(rect);

    rectangles.push({
      el: rect,
      speed: 0.2 + Math.random()
    });
  }

  function animateRectangles() {
    rectangles.forEach(rect => {
      let left = parseFloat(rect.el.style.left);
      left += rect.speed;

      if (left > window.innerWidth) {
        left = -parseFloat(rect.el.style.width);
        rect.el.style.top = Math.random() * window.innerHeight + "px";
      }

      rect.el.style.left = left + "px";
    });

    requestAnimationFrame(animateRectangles);
  }

  animateRectangles();

  const galleryImg = document.getElementById("gallery-image");
  const galleryVid = document.getElementById("gallery-video");
  const leftBtn = document.querySelector(".gallery .arrow.left");
  const rightBtn = document.querySelector(".gallery .arrow.right");
  const scrollBtn = document.getElementById("scrollTopBtn");

  const galleryItems = [
    { type: "image", src: `${R2}/images/Project07/project07-1.webp` },
    { type: "image", src: `${R2}/images/Project07/project07-2.JPG` },
    { type: "video", src: `${R2}/images/Project07/project07-vid1.mp4` },
    { type: "video", src: `${R2}/images/Project07/project07-vid2.mp4` },
    { type: "video", src: `${R2}/images/Project07/project07-vid3.mp4` }
  ];

  let currentIndex = 0;

  function showGalleryItem(index) {
    const item = galleryItems[index];

    if (item.type === "image") {
      galleryVid.pause();
      galleryVid.style.display = "none";
      galleryVid.removeAttribute("src");

      galleryImg.src = item.src;
      galleryImg.style.display = "block";
    } else {
      galleryImg.style.display = "none";
      galleryImg.removeAttribute("src");

      galleryVid.src = item.src;
      galleryVid.style.display = "block";
      galleryVid.controls = true;
      galleryVid.play().catch(err => console.log("Video autoplay blocked:", err));
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

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  showGalleryItem(currentIndex);
});