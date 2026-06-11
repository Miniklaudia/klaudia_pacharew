// ============================
// TERMINAL NAVIGATION
// ============================

if (document.body.classList.contains("archive")) {

const terminal = document.querySelector(".terminal");
const files = document.querySelectorAll(".file");

let current = 0;

// set initial selection
function updateSelection() {
  files.forEach(f => f.classList.remove("active"));
  files[current].classList.add("active");

  // keep in view
  files[current].scrollIntoView({
    block: "nearest"
  });
}

updateSelection();

// focus so keys work
terminal.focus();

// ============================
// KEY CONTROLS
// ============================

window.addEventListener("keydown", (e) => {

  if (e.key === "ArrowDown") {
    current = (current + 1) % files.length;
    updateSelection();
  }

  if (e.key === "ArrowUp") {
    current = (current - 1 + files.length) % files.length;
    updateSelection();
  }

  if (e.key === "Enter") {
    const link = files[current].getAttribute("href");
    if (link) {
      window.location.href = link;
    }
  }

});

// ============================
// MOUSE SUPPORT (sync cursor)
// ============================

files.forEach((file, index) => {
  file.addEventListener("mouseenter", () => {
    current = index;
    updateSelection();
  });
});

}