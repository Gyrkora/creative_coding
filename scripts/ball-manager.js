// ball-manager.js
import { canvas, balls, currentSpeedMultiplier, currentPaletteType, currentShapeType } from './config.js';
import { getColorForPalette } from './utils.js';
import { Ball } from './ball.js'; // <-- ¡Importación de Ball aquí!

export function createSingleBall() {
    const initialRadius = Math.random() * 10 + 20;

    const minCoord = initialRadius + 5;
    const maxX = canvas.width - initialRadius - 5;
    const maxY = canvas.height - initialRadius - 5;

    if (maxX <= minCoord || maxY <= minCoord) {
        console.warn("Canvas is too small to place a ball. Adjusting ball size or canvas size.");
        return new Ball(canvas.width / 2, canvas.height / 2, initialRadius, 0, 0, getColorForPalette(currentPaletteType), currentShapeType);
    }

    const x = Math.random() * (maxX - minCoord) + minCoord;
    const y = Math.random() * (maxY - minCoord) + minCoord;

    const baseSpeedMagnitude = Math.random() * 2 + 2;
    const angle = Math.random() * Math.PI * 2;
    const baseDx = Math.cos(angle) * baseSpeedMagnitude;
    const baseDy = Math.sin(angle) * baseSpeedMagnitude;

    const newBall = new Ball(x, y, initialRadius, baseDx, baseDy, getColorForPalette(currentPaletteType), currentShapeType);

    newBall.baseDx = baseDx;
    newBall.baseDy = baseDy;
    newBall.dx = newBall.baseDx * currentSpeedMultiplier;
    newBall.dy = newBall.baseDy * currentSpeedMultiplier;

    return newBall;
}

export function addBall() {
    const newBall = createSingleBall();
    balls.push(newBall);
}

export function initializeBalls(numBalls) {
    balls.length = 0;
    for (let i = 0; i < numBalls; i++) {
        addBall();
    }
}

export function handleWindowResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    balls.forEach(ball => {
        let halfSize = ball.radius;

        if (ball.x + halfSize > canvas.width) {
            ball.x = canvas.width - halfSize;
        } else if (ball.x - halfSize < 0) {
            ball.x = halfSize;
        }

        if (ball.y + halfSize > canvas.height) {
            ball.y = canvas.height - halfSize;
        } else if (ball.y - halfSize < 0) {
            ball.y = halfSize;
        }
    });
}