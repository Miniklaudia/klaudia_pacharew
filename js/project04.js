document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".project04");
  if (!container) return;

  const imgElement = container.querySelector('#reel-image');
  const videoElement = container.querySelector('#reel-video');
  const leftBtn = container.querySelector('.arrow.left');
  const rightBtn = container.querySelector('.arrow.right');

  if (!imgElement || !videoElement || !leftBtn || !rightBtn) {
    console.log("Project 4 elements missing");
    return;
  }

  const reelItems = [
    { type: "image", src: "assets/reels/arcade/ar-1.jpg", position: "center" },
    { type: "video", src: "assets/reels/arcade/ar-2.mp4", position: "center" },
    { type: "image", src: "assets/reels/arcade/ar-3.jpg", position: "center" },
    { type: "video", src: "assets/reels/arcade/ar-4.mp4", position: "center" },
    { type: "image", src: "assets/reels/arcade/ar-5.jpg", position: "center" },
    { type: "video", src: "assets/reels/arcade/ar-6.mp4", position: "center" },
    { type: "image", src: "assets/reels/arcade/ar-7.jpg", position: "center" },
    { type: "video", src: "assets/reels/arcade/ar-8.mp4", position: "center" },
    { type: "image", src: "assets/reels/arcade/ar-9.jpg", position: "center" },
    { type: "video", src: "assets/reels/arcade/ar-10.mp4", position: "center 20%" },
    { type: "image", src: "assets/reels/arcade/ar-11.jpg", position: "center 75%" },
    { type: "video", src: "assets/reels/arcade/ar-12.mp4", position: "center 30%" },
    { type: "image", src: "assets/reels/arcade/ar-13.jpg", position: "center" },
    { type: "image", src: "assets/reels/arcade/ar-14.jpg", position: "center" },
    { type: "image", src: "assets/reels/arcade/ar-15.jpg", position: "center" },
    { type: "image", src: "assets/reels/arcade/ar-16.jpg", position: "center" }
  ];

  let currentIndex = Math.floor(Math.random() * reelItems.length);

  function showItem(index) {
  const item = reelItems[index];

  if (item.type === "image") {
    imgElement.src = item.src;
    imgElement.style.display = "block";

    // APPLY POSITION
    imgElement.style.objectPosition = item.position || "center";

    videoElement.pause();
    videoElement.style.display = "none";
  }

  if (item.type === "video") {
    videoElement.src = item.src;
    videoElement.style.display = "block";
    videoElement.play();

    // APPLY POSITION
    videoElement.style.objectPosition = item.position || "center";

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

  // 🔥 IMPORTANT: stop event conflicts
  leftBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    prevItem();
  });

  rightBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nextItem();
  });

  // autoplay
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