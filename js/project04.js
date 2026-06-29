document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("project04")) return;

  const imgElement = document.getElementById("reel-image");
  const videoElement = document.getElementById("reel-video");
  const leftBtn = document.querySelector(".arrow.left");
  const rightBtn = document.querySelector(".arrow.right");
  const scrollBtn = document.getElementById("scrollTopBtn");

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

  let currentIndex = 0;

  function showItem(index) {
    const item = reelItems[index];

    if (item.type === "image") {
      videoElement.pause();
      videoElement.style.display = "none";
      videoElement.removeAttribute("src");

      imgElement.src = item.src;
      imgElement.style.objectPosition = item.position || "center";
      imgElement.style.display = "block";
    } else {
      imgElement.style.display = "none";
      imgElement.removeAttribute("src");

      videoElement.src = item.src;
      videoElement.style.objectPosition = item.position || "center";
      videoElement.style.display = "block";
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.play().catch(err => console.log("Video autoplay blocked:", err));
    }
  }

  leftBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + reelItems.length) % reelItems.length;
    showItem(currentIndex);
  });

  rightBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % reelItems.length;
    showItem(currentIndex);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  showItem(currentIndex);
});