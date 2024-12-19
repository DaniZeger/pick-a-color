import { rgbToHex, rgbToHsl, hslToRgb } from "./colorsUtils.js";
import { copyToClipboard } from "./copyToClipboard.js";

function generateLighterShades(r, g, b) {
    const shades = [];
    for (let i = 1; i <= 3; i++) {
        const increment = i * 30;
        shades.push(
            rgbToHex(
                Math.min(255, r + increment),
                Math.min(255, g + increment),
                Math.min(255, b + increment)
            )
        );
    }
    return shades;
}

function generateDarkerShades(r, g, b) {
    const shades = [];
    for (let i = 1; i <= 3; i++) {
        const factor = 1 - i * 0.2;
        shades.push(
            rgbToHex(
                Math.max(0, Math.floor(r * factor)),
                Math.max(0, Math.floor(g * factor)),
                Math.max(0, Math.floor(b * factor))
            )
        );
    }
    return shades;
}

function generateComplementaryColors(r, g, b) {
    const hsl = rgbToHsl(r, g, b);

    const complementaryHues = [
        (hsl.h + 180) % 360,
        (hsl.h + 165) % 360,
        (hsl.h + 195) % 360,
    ];

    return complementaryHues.map((hue) => {
        let adjustedLightness;

        if (hsl.l < 50) {
            adjustedLightness = Math.min(90, hsl.l + 30);
        } else {
            adjustedLightness = Math.max(10, hsl.l - 30);
        }

        const complementaryHSL = {
            h: hue,
            s: hsl.s,
            l: adjustedLightness,
        };

        const complementaryRGB = hslToRgb(
            complementaryHSL.h,
            complementaryHSL.s,
            complementaryHSL.l
        );
        return rgbToHex(complementaryRGB.r, complementaryRGB.g, complementaryRGB.b);
    });
}

function updateShadeRow(sectionId, colors) {
    const section = document
        .getElementById(sectionId)
        .querySelector(".shade-row");
    section.innerHTML = "";

    colors.forEach((color) => {
        const colorBox = document.createElement("div");
        colorBox.setAttribute('class', 'suggest-color');
        colorBox.style.backgroundColor = color;
        colorBox.title = color;
        section.appendChild(colorBox);
        colorBox.addEventListener("click", () => {
            copyToClipboard(color);
        });
    });
}

function generateColorSuggestions(r, g, b) {
    const lighterShades = generateLighterShades(r, g, b);
    updateShadeRow("lighter-shades", lighterShades);

    const darkerShades = generateDarkerShades(r, g, b);
    updateShadeRow("darker-shades", darkerShades);

    const complementaryColors = generateComplementaryColors(r, g, b);
    updateShadeRow("complementary-colors", complementaryColors);

    document.getElementById("shade-complement-section").style.display = "block";
}

export { generateColorSuggestions };
