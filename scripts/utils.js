// utils.js

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function getPastelColor() {
    const r = Math.floor(Math.random() * 100) + 155;
    const g = Math.floor(Math.random() * 100) + 155;
    const b = Math.floor(Math.random() * 100) + 155;
    return `rgb(${r},${g},${b})`;
}

export function getGrayscaleColor() {
    const val = Math.floor(Math.random() * 150) + 50;
    return `rgb(${val},${val},${val})`;
}

export function getColorForPalette(paletteType) {
    switch (paletteType) {
        case 'random': return getRandomColor();
        case 'pastel': return getPastelColor();
        case 'grayscale': return getGrayscaleColor();
        default: return getRandomColor();
    }
}