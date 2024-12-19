import {
    imageUri,
    screenshot,
    canvas,
    ctx,
    resetButton,
    savedColorsButton,
    saveButton,
    magnifier,
    magnifierImage,
    colorValues,
    clearSavedColorsButton,
    returnButton
} from "./elements.js";
import {
    mouseMoveListener,
    mouseClickedListener,
    resetButtonListener,
    savedColorsButtonListener,
    saveButtonListener,
    clearSavedColors,
    returnButtonListener
} from "./listeners.js";
import { copyToClipboard } from "./copyToClipboard.js";

let isColorLocked = false;

screenshot.src = imageUri ? imageUri : "../beckup_image.jpg";

magnifierImage.src = imageUri
    ? imageUri
    : "../beckup_image.jpg";

screenshot.onload = () => {
    canvas.width = screenshot.naturalWidth;
    canvas.height = screenshot.naturalHeight;
    ctx.drawImage(screenshot, 0, 0);
};

function getCursorPosition(event) {
    const rect = screenshot.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;

    return { x: Math.floor(x), y: Math.floor(y) };
}

function moveMagnifier(event) {
    magnifier.style.left = `${event.clientX - magnifier.offsetWidth / 2}px`;
    magnifier.style.top = `${event.clientY - magnifier.offsetHeight / 2}px`;
    magnifier.style.display = "block";

    handleMagnifierImage(event);
}

function handleMagnifierImage(event) {
    const { x, y } = getCursorPosition(event);
    const magnifierSize = magnifier.offsetWidth;
    const zoomLevel = 10;
    magnifierImage.style.width = `${screenshot.naturalWidth * zoomLevel}px`;
    magnifierImage.style.left = `-${x * zoomLevel - magnifierSize / 2}px`;
    magnifierImage.style.top = `-${y * zoomLevel - magnifierSize / 2}px`;
}

function extractCanvasColor(event) {
    const { x, y } = getCursorPosition(event);

    const clampedX = Math.min(Math.max(0, x), canvas.width - 1);
    const clampedY = Math.min(Math.max(0, y), canvas.height - 1);

    const pixel = ctx.getImageData(clampedX, clampedY, 1, 1).data;

    return {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
    };
}

colorValues.forEach((colorValue) => {
    colorValue.addEventListener("click", () => {
        copyToClipboard(colorValue.textContent);
    });
});

screenshot.addEventListener("mousemove", (event) => {
    if (isColorLocked) return;
    mouseMoveListener(event, moveMagnifier, extractCanvasColor);
});

screenshot.addEventListener("click", (event) => {
    if (isColorLocked) return;
    isColorLocked = true;
    mouseClickedListener(event, extractCanvasColor);
});

resetButton.addEventListener("click", () => {
    isColorLocked = false;
    resetButtonListener();
});

saveButton.addEventListener("click", () => {
    saveButtonListener();
});

savedColorsButton.addEventListener("click", () => {
    isColorLocked = true;
    savedColorsButtonListener();
});

clearSavedColorsButton.addEventListener("click", () => {
    clearSavedColors();
});

returnButton.addEventListener("click", () => {
    isColorLocked = false;
    returnButtonListener();
});
