document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".project08");
  if (!container) return;

  const imgElement = container.querySelector("#reel-image");
  const videoElement = container.querySelector("#reel-video");
  const leftBtn = container.querySelector(".arrow.left");
  const rightBtn = container.querySelector(".arrow.right");

  if (!imgElement || !videoElement || !leftBtn || !rightBtn) return;

  // Images 1-11 + 1 video
  const reelItems = [
    { type: "image", src: "assets/images/Project08/project08-1.jpg", position: "center" },
    { type: "image", src: "assets/images/Project08/project08-2.jpg", position: "center" },
    { type: "video", src: "assets/images/Project08/project08-vid.mp4", position: "center" },
    { type: "image", src: "assets/images/Project08/project08-3.jpg", position: "center" },
    { type: "image", src: "assets/images/Project08/project08-4.jpg", position: "center" },
    { type: "video", src: "assets/images/Project08/project08-vid.mp4", position: "center" },
    { type: "image", src: "assets/images/Project08/project08-5.jpg", position: "center" },
    { type: "image", src: "assets/images/Project08/project08-6.jpg", position: "center" },
    { type: "image", src: "assets/images/Project08/project08-9.jpg", position: "center" },
    { type: "video", src: "assets/images/Project08/project08-vid.mp4", position: "center" }
  ];

  let currentIndex = Math.floor(Math.random() * reelItems.length);

  function showItem(index) {
    const item = reelItems[index];

    if (item.type === "image") {
      imgElement.src = item.src;
      imgElement.style.display = "block";
      imgElement.style.objectPosition = item.position || "center";
      videoElement.pause();
      videoElement.style.display = "none";
    }

    if (item.type === "video") {
      videoElement.src = item.src;
      videoElement.style.display = "block";
      videoElement.play();
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

  leftBtn.addEventListener("click", e => {
    e.stopPropagation();
    prevItem();
  });

  rightBtn.addEventListener("click", e => {
    e.stopPropagation();
    nextItem();
  });

  // autoplay every 8s
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

// MINI REEL (images 10 & 11)
const miniImg = document.querySelector("#mini-reel-image");
const miniLeft = document.querySelector(".mini-arrow.left");
const miniRight = document.querySelector(".mini-arrow.right");

if (miniImg && miniLeft && miniRight) {
  const miniItems = [
    "assets/images/Project08/project08-10.jpg",
    "assets/images/Project08/project08-11.jpg"
  ];

  let miniIndex = 0;

  function showMini(index) {
    miniImg.src = miniItems[index];
  }

  miniLeft.addEventListener("click", () => {
    miniIndex = (miniIndex - 1 + miniItems.length) % miniItems.length;
    showMini(miniIndex);
  });

  miniRight.addEventListener("click", () => {
    miniIndex = (miniIndex + 1) % miniItems.length;
    showMini(miniIndex);
  });

  // optional autoplay (slow + subtle)
  setInterval(() => {
    miniIndex = (miniIndex + 1) % miniItems.length;
    showMini(miniIndex);
  }, 6000);

  showMini(miniIndex);
}
const miniReel = document.querySelector(".project08-mini-reel");

let startX = 0;
let endX = 0;

miniReel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

miniReel.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;

  // threshold so tiny taps don't trigger swipe
  if (Math.abs(diff) < 40) return;

  if (diff > 0) {
    // swipe left → next image
    currentIndex = (currentIndex + 1) % galleryItems.length;
  } else {
    // swipe right → previous image
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  }

  showImage(currentIndex);
}