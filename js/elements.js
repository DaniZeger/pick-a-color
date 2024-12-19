
const params = new URLSearchParams(window.location.search);
const imageUri = params.get('image');
const screenshot = document.getElementById('screenshot');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const colorBox = document.getElementById('color-box');
const colorValues = document.querySelectorAll('.color-value');
const hexColorValue = document.getElementById('hex-color-value');
const rgbColorValue = document.getElementById('rgb-color-value');
const hslColorValue = document.getElementById('hsl-color-value');
const hwbColorValue = document.getElementById('hwb-color-value');

const actionsButtons = document.getElementById('action-button-group');
const resetButton = document.getElementById('reset-button');
const savedColorsButton = document.getElementById('show-saved-colors-button');
const saveButton = document.getElementById('save-button');

const copyMessage = document.getElementById('copy-message');

const savedColorsPanel = document.getElementById('saved-colors-panel');
const savedColorsList = document.getElementById('saved-colors-list');
const clearSavedColorsButton = document.getElementById('clear-saved-button');
const returnButton = document.getElementById('return-button');

const magnifier = document.getElementById('magnifier');
const magnifierImage = document.getElementById('magnifier-image');

export {
    imageUri,
    screenshot,
    canvas,
    ctx,
    colorBox,
    hexColorValue,
    rgbColorValue,
    hslColorValue,
    hwbColorValue,
    resetButton,
    savedColorsButton,
    saveButton,
    savedColorsPanel,
    magnifier,
    magnifierImage,
    actionsButtons,
    colorValues,
    savedColorsList,
    clearSavedColorsButton,
    returnButton,
    copyMessage
}
