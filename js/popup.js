const ctaButton = document.getElementById('cta-button');

function onClick() {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (imageUri) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }
        const screenshotPage = chrome.runtime.getURL('html/index.html');
        chrome.tabs.create({ url: `${screenshotPage}?image=${encodeURIComponent(imageUri)}` });
    });
}

ctaButton.addEventListener('click', onClick);