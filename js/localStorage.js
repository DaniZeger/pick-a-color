const savedColorsKey = "savedColors";

function setItmInLocalStorage(value) {
    localStorage.setItem(savedColorsKey, JSON.stringify(value));
}

function getItmFromLocalStorage() {
    return JSON.parse(localStorage.getItem(savedColorsKey));
}

function clearLocalStorage() {
    localStorage.removeItem(savedColorsKey);
}

export { setItmInLocalStorage, getItmFromLocalStorage, clearLocalStorage };