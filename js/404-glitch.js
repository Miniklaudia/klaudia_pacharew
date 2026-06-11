// ================================
// 404 TEXT CORRUPTION SYSTEM
// ================================

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function glitchText(element) {

    const original = element.innerText;

    let iteration = 0;

    const interval = setInterval(() => {

        element.innerText = original
            .split("")
            .map((char, index) => {

                if (index < iteration) {
                    return original[index];
                }

                return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

            })
            .join("");

        if (iteration >= original.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;

    }, 30);
}

// ================================
// RANDOM CORRUPTION LOOP
// ================================

setInterval(() => {

    const elements = document.querySelectorAll(".corrupt");

    const el = elements[Math.floor(Math.random() * elements.length)];

    glitchText(el);

}, 2000);