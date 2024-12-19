import {
    screenshot,
    colorBox,
    hexColorValue,
    rgbColorValue,
    hslColorValue,
    hwbColorValue,
    savedColorsPanel,
    magnifier,
    actionsButtons,
    savedColorsList,
    copyMessage
} from "./elements.js";
import { rgbToHex, rgbToHsl, rgbToHwb } from "./colorsUtils.js";
import { generateColorSuggestions } from "./suggestionsUtils.js";
import {
    setItmInLocalStorage,
    getItmFromLocalStorage,
    clearLocalStorage
} from "./localStorage.js";

function mouseMoveListener(event, moveMagnifier, extractCanvasColor) {
    moveMagnifier(event);

    const { r, g, b } = extractCanvasColor(event);

    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    const hexColor = rgbToHex(r, g, b);
    const { h, s, l } = rgbToHsl(r, g, b);
    const hslColor = `hsl(${h}, ${s}%, ${l}%)`;
    const { h: hwbH, w: hwbW, b: hwbB } = rgbToHwb(r, g, b);
    const hwbColor = `hwb(${hwbH}, ${hwbW}%, ${hwbB}%)`;

    colorBox.style.backgroundColor = rgbColor;
    hexColorValue.textContent = hexColor;
    rgbColorValue.textContent = rgbColor;
    hslColorValue.textContent = hslColor;
    hwbColorValue.textContent = hwbColor;
}

function mouseClickedListener(event, extractCanvasColor) {
    magnifier.style.display = "none";
    screenshot.style.cursor = "default";

    const { r, g, b } = extractCanvasColor(event);

    generateColorSuggestions(r, g, b);
    actionsButtons.style.display = "block";
}

function resetButtonListener() {
    actionsButtons.style.display = "none";
    document.getElementById("shade-complement-section").style.display = "none";
    screenshot.style.cursor = "crosshair";
}

function restoreSelectedColor(color) {
    colorBox.style.backgroundColor = color.hex;
    hexColorValue.textContent = color.hex;
    rgbColorValue.textContent = color.rgb;
    hslColorValue.textContent = color.hsl;
    hwbColorValue.textContent = color.hwb;

    document.getElementById("side-panel").style.display = "block";
    savedColorsPanel.style.display = "none";
}

function saveButtonListener() {
    const currentColor = {
        hex: hexColorValue.textContent,
        rgb: rgbColorValue.textContent,
        hsl: hslColorValue.textContent,
        hwb: hwbColorValue.textContent,
    };

    const savedColors = getItmFromLocalStorage() || [];
    if (savedColors.length >= 39) {
        // remove the first color and add the new one
        savedColors.shift();
    }
    savedColors.push(currentColor);

    setItmInLocalStorage(savedColors);
    copyMessage.style.display = "block";
    copyMessage.textContent = "Color saved!";
    setTimeout(() => {
        copyMessage.style.display = "none";
    }, 1000);
}

function trashIconListener(index) {
    const savedColors = getItmFromLocalStorage();
    savedColors.splice(index, 1);
    setItmInLocalStorage(savedColors);
}


function savedColorsButtonListener() {
    savedColorsPanel.style.display = "block";
    savedColorsList.innerHTML = "";

    const savedColors = getItmFromLocalStorage() || [];

    savedColors.forEach((color, index) => {
        const colorBox = document.createElement("div");
        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "bi bi-trash");
        colorBox.appendChild(trashIcon);
        colorBox.setAttribute("class", "saved-color");
        colorBox.style.backgroundColor = color.hex;
        colorBox.title = color.hex;

        colorBox.addEventListener("click", () => {
            restoreSelectedColor(color);
        });

        trashIcon.addEventListener("click", (event) => {
            event.stopPropagation();
            trashIconListener(index);
            savedColorsList.removeChild(colorBox);
        });

        savedColorsList.appendChild(colorBox);
    });

    document.getElementById("side-panel").style.display = "none";
}

function clearSavedColors() {
    clearLocalStorage();
    savedColorsList.innerHTML = "";
    document.getElementById("side-panel").style.display = "block";
    savedColorsPanel.style.display = "none";
}

function returnButtonListener() {
    document.getElementById("side-panel").style.display = "block";
    savedColorsPanel.style.display = "none";
}

export {
    mouseMoveListener,
    mouseClickedListener,
    resetButtonListener,
    savedColorsButtonListener,
    saveButtonListener,
    clearSavedColors,
    returnButtonListener
};
