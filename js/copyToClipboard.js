import { copyMessage } from './elements.js';

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);

    copyMessage.style.display = 'block';
    copyMessage.textContent = `Copied ${text} to clipboard!`;
    setTimeout(() => {
        copyMessage.style.display = 'none';
    }, 1000);
}

export { copyToClipboard };