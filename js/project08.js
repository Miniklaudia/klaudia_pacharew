document.addEventListener("DOMContentLoaded", () => {
  const R2_BASE =
    "https://pub-e3bf6ce01e0948019faa273c5ebc10ba.r2.dev/images/Project08/";

  /* ================================
     BACKGROUND REEL
  ================================ */

  const imgElement = document.getElementById("reel-image");
  const videoElement = document.getElementById("reel-video");
  const leftBtn = document.querySelector("body.project08 > .arrow.left");
  const rightBtn = document.querySelector("body.project08 > .arrow.right");

  const reelItems = [
    { type: "image", src: R2_BASE + "project08-1.jpg" },
    { type: "image", src: R2_BASE + "project08-2.jpg" },
    { type: "video", src: R2_BASE + "project08-vid.mp4" },
    { type: "image", src: R2_BASE + "project08-3.jpg" },
    { type: "image", src: R2_BASE + "project08-4.jpg" },
    { type: "image", src: R2_BASE + "project08-5.jpg" },
    { type: "image", src: R2_BASE + "project08-6.jpg" },
    { type: "image", src: R2_BASE + "project08-7.jpg" },
    { type: "image", src: R2_BASE + "project08-8.jpg" },
    { type: "image", src: R2_BASE + "project08-9.JPG" }
  ];

  let reelIndex = Math.floor(Math.random() * reelItems.length);

  function showReel(index) {
    const item = reelItems[index];

    if (!imgElement || !videoElement) return;

    if (item.type === "image") {
      videoElement.pause();
      videoElement.removeAttribute("src");
      videoElement.style.display = "none";

      imgElement.src = item.src;
      imgElement.style.display = "block";
    } else {
      imgElement.removeAttribute("src");
      imgElement.style.display = "none";

      videoElement.src = item.src;
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.style.display = "block";
      videoElement.play().catch(() => {});
    }
  }

  function nextReel() {
    reelIndex = (reelIndex + 1) % reelItems.length;
    showReel(reelIndex);
  }

  function prevReel() {
    reelIndex = (reelIndex - 1 + reelItems.length) % reelItems.length;
    showReel(reelIndex);
  }

  if (leftBtn) leftBtn.addEventListener("click", prevReel);
  if (rightBtn) rightBtn.addEventListener("click", nextReel);

  showReel(reelIndex);
  setInterval(nextReel, 8000);

  /* ================================
     MINI REEL
  ================================ */

  const miniImg = document.getElementById("mini-reel-image");
  const miniLeft = document.querySelector(
    ".project08-mini-reel .mini-arrow.left"
  );
  const miniRight = document.querySelector(
    ".project08-mini-reel .mini-arrow.right"
  );
  const miniReel = document.querySelector(".project08-mini-reel");

  const miniItems = [
    R2_BASE + "project08-10.JPG",
    R2_BASE + "project08-11.JPG"
  ];

  let miniIndex = 0;

  function showMini(index) {
    if (!miniImg) return;

    miniImg.src = miniItems[index];
    miniImg.style.display = "block";
    miniImg.style.opacity = "1";
    miniImg.style.visibility = "visible";
  }

  function nextMini() {
    miniIndex = (miniIndex + 1) % miniItems.length;
    showMini(miniIndex);
  }

  function prevMini() {
    miniIndex = (miniIndex - 1 + miniItems.length) % miniItems.length;
    showMini(miniIndex);
  }

  if (miniLeft) miniLeft.addEventListener("click", prevMini);
  if (miniRight) miniRight.addEventListener("click", nextMini);

  if (miniReel) {
    let startX = 0;

    miniReel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    miniReel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) < 40) return;

      if (diff > 0) nextMini();
      else prevMini();
    });
  }

  showMini(miniIndex);
  setInterval(nextMini, 6000);

  /* ================================
     SCROLL TO TOP
  ================================ */

  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});