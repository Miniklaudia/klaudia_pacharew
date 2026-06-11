// ===== ASCII GLITCH CHARACTERS =====
const glitchChars = "!@#$%^&*()_+-=<>[]{}";

// ===== ASCII GLITCH FUNCTION =====
function glitchText(element) {
  const originalText = element.innerText;
  let glitchedText = "";

  for (let char of originalText) {
    if (Math.random() < 0.12 && char !== " ") {
      glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
    } else {
      glitchedText += char;
    }
  }

  element.innerText = glitchedText;

  setTimeout(() => {
    element.innerText = originalText;
  }, 200);
}

// ===== MAIN DOCUMENT READY =====
document.addEventListener("DOMContentLoaded", () => {

  // ===== GLITCH ON HOVER =====
  document.querySelectorAll("h1, p, nav a, .file").forEach(el => {
    el.addEventListener("mouseenter", () => glitchText(el));
  });

  // ===== ARCHIVE / PROJECT DROPDOWN TOGGLE =====
  document.querySelectorAll(".file").forEach(file => {
    file.addEventListener("click", () => {
      const content = file.nextElementSibling;
      if (!content) return;
      content.classList.toggle("show");
      if (content.classList.contains("show")) {
        file.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ===== SCROLL TO TOP BUTTON =====
  const scrollBtn = document.getElementById("scrollTopBtn");
  scrollBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ===== CURSOR-BASED GLITCH =====
  document.addEventListener("mousemove", () => {
    document.querySelectorAll("h1.glitch, p, .file, .archive-image").forEach(el => {
      if (Math.random() < 0.005) {
        const offsetX = (Math.random() - 0.5) * 6;
        const offsetY = (Math.random() - 0.5) * 6;
        el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        setTimeout(() => el.style.transform = "", 100 + Math.random() * 100);
      }
    });
  });

  // ===== TEMPORAL GLITCH =====
  function randomGlitch() {
    const elements = document.querySelectorAll("h1.glitch, p, .file, .archive-image");
    const element = elements[Math.floor(Math.random() * elements.length)];
    if (!element) return;

    const originalTransform = element.style.transform;
    const originalColor = element.style.color;

    if (element.tagName === "IMG") {
      element.style.transform = `translate(${Math.random() * 12 - 6}px, ${Math.random() * 12 - 6}px) rotate(${Math.random() * 10 - 5}deg)`;
      element.style.filter = `contrast(${1 + Math.random() * 0.7}) hue-rotate(${Math.random() * 80 - 40}deg) blur(${Math.random() * 2}px)`;
    } else {
      element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
      element.style.color = "#ff00cc";
    }

    setTimeout(() => {
      element.style.transform = originalTransform;
      element.style.color = originalColor;
      if (element.tagName === "IMG") element.style.filter = "";
    }, 150);
  }
  setInterval(randomGlitch, 1500);

  // ===== RANDOM BACKGROUND GLITCH =====
  function randomBackgroundGlitch() {
    const body = document.body;
    if (body.classList.contains("project02")) return;

    if (body.classList.contains("home") || body.classList.contains("archive")) {
      if (Math.random() < 0.1) {
        body.style.filter = `brightness(${1 + Math.random() * 0.3}) contrast(${1 + Math.random() * 0.5})`;
        setTimeout(() => body.style.filter = "", 200);
      }
    }

    if (body.classList.contains("research")) {
      body.style.filter = `brightness(${1 + Math.random() * 0.5}) contrast(${1 + Math.random() * 0.7})`;
      setTimeout(() => body.style.filter = "", 150);
    }
  }
  setInterval(randomBackgroundGlitch, 1000);

  // ===== GLITCH OVERLAY FOR HOME =====
  const homeFlicker = document.createElement("div");
  homeFlicker.style.position = "fixed";
  homeFlicker.style.top = "0";
  homeFlicker.style.left = "0";
  homeFlicker.style.width = "100%";
  homeFlicker.style.height = "100%";
  homeFlicker.style.pointerEvents = "none";
  homeFlicker.style.zIndex = "0";
  homeFlicker.style.background = "repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0 1px, transparent 1px 3px)";
  homeFlicker.style.opacity = "0";
  document.body.appendChild(homeFlicker);

  function occasionalHomeFlicker() {
    if (Math.random() < 0.07) {
      homeFlicker.style.opacity = "0.3";
      setTimeout(() => { homeFlicker.style.opacity = "0"; }, 100 + Math.random() * 200);
    }
  }
  setInterval(occasionalHomeFlicker, 300);

  // ===== UNIVERSAL VIDEO SOUND TOGGLE =====
  document.querySelectorAll("video").forEach(video => {
    const container = video.closest("main") || document;
    const audioBtn = container.querySelector("#play-sound, .play-sound");

    if (audioBtn) {
      audioBtn.addEventListener("click", async () => {
        try {
          video.muted = !video.muted;
          if (!video.muted && video.paused) await video.play();
          audioBtn.innerText = video.muted ? "🔊 Play Sound" : "🔇 Mute Sound";
        } catch (err) {
          console.log("Playback blocked:", err);
          alert("Click the video itself to enable sound if autoplay blocked.");
        }
      });
    }
  });

  // ===== UNIVERSAL GALLERY INITIALIZER =====
  function initGallery(containerSelector, imageId, numImages, folderPath, prefix) {
    const galleryContainer = document.querySelector(containerSelector);
    const galleryImage = document.getElementById(imageId);
    if (!galleryContainer || !galleryImage) return;

    const leftArrow = galleryContainer.querySelector(".arrow.left");
    const rightArrow = galleryContainer.querySelector(".arrow.right");
    if (!leftArrow || !rightArrow) return;

    const images = Array.from({ length: numImages }, (_, i) => `${folderPath}/${prefix}-${i + 1}.jpg`);
    let index = 0;

    function showImage(i) {
      galleryImage.src = images[i];
      galleryImage.alt = `Project image ${i + 1}`;
    }

    leftArrow.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    });

    rightArrow.addEventListener("click", () => {
      index = (index + 1) % images.length;
      showImage(index);
    });

    showImage(index);
  }

  // ===== INITIALIZE ALL PROJECT GALLERIES =====
  initGallery(".project-gallery.project01", "gallery-image-01", 13, "assets/images/Project01", "project01");
  initGallery(".project-gallery.project02", "gallery-image", 21, "assets/images/Project02", "project02");
  initGallery(".project-gallery.project05", "gallery-image-05", 20, "assets/images/Project05", "project05");

});