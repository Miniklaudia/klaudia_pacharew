document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("body.project04");
  if (!container) return;

  const imgElement = document.querySelector("#reel-image");
  const videoElement = document.querySelector("#reel-video");
  const leftBtn = document.querySelector(".arrow.left");
  const rightBtn = document.querySelector(".arrow.right");

  if (!imgElement || !videoElement || !leftBtn || !rightBtn) {
    console.log("Project 04 elements missing");
    return;
  }

  const R2 = "https://pub-e3bf6ce01e0948019faa273c5ebc10ba.r2.dev";

  const reelItems = [
    { type: "image", src: `${R2}/reels/arcade/ar-1.jpg`, position: "center" },
    { type: "video", src: `${R2}/reels/arcade/ar-2.mp4`, position: "center" },
    { type: "image", src: `${R2}/reels/arcade/ar-3.jpg`, position: "center" },
    { type: "video", src: `${R2}/reels/arcade/ar-4.mp4`, position: "center" },
    { type: "image", src: `${R2}/reels/arcade/ar-5.jpg`, position: "center" },
    { type: "video", src: `${R2}/reels/arcade/ar-6.mp4`, position: "center" },
    { type: "image", src: `${R2}/reels/arcade/ar-7.jpg`, position: "center" },
    { type: "video", src: `${R2}/reels/arcade/ar-8.mp4`, position: "center" },
    { type: "image", src: `${R2}/reels/arcade/ar-9.jpg`, position: "center" },
    { type: "video", src: `${R2}/reels/arcade/ar-10.mp4`, position: "center 20%" },
    { type: "image", src: `${R2}/reels/arcade/ar-11.jpg`, position: "center 75%" },
    { type: "video", src: `${R2}/reels/arcade/ar-12.mp4`, position: "center 30%" },
    { type: "image", src: `${R2}/reels/arcade/ar-13.jpg`, position: "center" },
    { type: "image", src: `${R2}/reels/arcade/ar-14.jpg`, position: "center" },
    { type: "image", src: `${R2}/reels/arcade/ar-15.jpg`, position: "center" },
    { type: "image", src: `${R2}/reels/arcade/ar-16.jpg`, position: "center" }
  ];

  let currentIndex = Math.floor(Math.random() * reelItems.length);

  function showItem(index) {
    const item = reelItems[index];

    if (item.type === "image") {
      videoElement.pause();
      videoElement.removeAttribute("src");
      videoElement.style.display = "none";

      imgElement.src = item.src;
      imgElement.style.objectPosition = item.position || "center";
      imgElement.style.display = "block";
    }

    if (item.type === "video") {
      imgElement.style.display = "none";
      imgElement.removeAttribute("src");

      videoElement.src = item.src;
      videoElement.style.objectPosition = item.position || "center";
      videoElement.style.display = "block";
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.playsInline = true;
      videoElement.play().catch(err => console.log("Video autoplay blocked:", err));
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

  leftBtn.addEventListener("click", e => {
    e.stopPropagation();
    prevItem();
  });

  rightBtn.addEventListener("click", e => {
    e.stopPropagation();
    nextItem();
  });

  setInterval(() => {
    let next;
    do {
      next = Math.floor(Math.random() * reelItems.length);
    } while (next === currentIndex);

    currentIndex = next;
    showItem(currentIndex);
  }, 8000);

  showItem(currentIndex);
});