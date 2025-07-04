// ui-handlers.js
import {
    canvas, customizationModal, balls, hideButtonTimeout,
    globalSnakeModeActive, collisionsEnabled, currentSpeedMultiplier,
    currentPaletteType, currentShapeType,
    setGlobalSnakeModeActive, setCollisionsEnabled, setCurrentSpeedMultiplier,
    setCurrentPaletteType, setCurrentShapeType, setHideButtonTimeout,
    // Importaciones de elementos DOM directamente desde config.js
    menuButton, closeButton, toggleSnakeModeBtn, toggleCollisionsBtn,

    colorPaletteBtns, speedRange, speedValueSpan, addBallBtn,
    resetBallsBtn, toggleShapeBtn,

    deleteBallBtn, growBallBtn, speedUpBallBtn, slowDownBallBtn, INITIAL_NUMBER_OF_BALLS,

} from './config.js';
import { addBall, initializeBalls, handleWindowResize } from './ball-manager.js';
import { getColorForPalette } from './utils.js';

let pendingBallAction = null;


// --- Menu Button Show/Hide Logic ---
function hideButton() {
    menuButton.classList.add('hidden');
}

function showButton() {
    menuButton.classList.remove('hidden');
}

export function showButtonAndResetTimer() {
    showButton();
    clearTimeout(hideButtonTimeout);
    setHideButtonTimeout(setTimeout(hideButton, 3000));
}

// Función para aplicar la paleta de color a las pelotas existentes
function applyColorPalette(paletteType) {
    balls.forEach(ball => {
        ball.color = getColorForPalette(paletteType);
    });
}

function applyActionToBall(ball) {
    switch (pendingBallAction) {
        case 'delete':
            const index = balls.indexOf(ball);
            if (index !== -1) {
                balls.splice(index, 1);
            }
            break;
        case 'grow':
            ball.sizeState = 'growing';
            break;
        case 'faster':
            ball.baseDx *= 1.5;
            ball.baseDy *= 1.5;
            ball.dx = ball.baseDx * currentSpeedMultiplier;
            ball.dy = ball.baseDy * currentSpeedMultiplier;
            break;
        case 'slower':
            ball.baseDx *= 0.75;
            ball.baseDy *= 0.75;
            ball.dx = ball.baseDx * currentSpeedMultiplier;
            ball.dy = ball.baseDy * currentSpeedMultiplier;
            break;
    }
}


// --- Event Listeners ---

canvas.addEventListener('click', (event) => {
    if (customizationModal.classList.contains('open')) {
        return;
    }
    showButtonAndResetTimer();

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    let clickedBall = null;

    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const distance = Math.sqrt((clickX - ball.x) ** 2 + (clickY - ball.y) ** 2);

        if (distance < ball.radius) {
            clickedBall = ball;

            break;
        }
    }


    if (clickedBall) {
        if (pendingBallAction) {
            applyActionToBall(clickedBall);
            // keep action active for subsequent clicks
            return;
        }

        if (clickedBall.sizeState === 'normal' && clickedBall.radius === clickedBall.minRadius) {
            clickedBall.sizeState = 'growing';
        } else {
            clickedBall.sizeState = 'shrinking';
        }

    }
});

window.addEventListener('mousemove', showButtonAndResetTimer);
window.addEventListener('touchstart', showButtonAndResetTimer);

menuButton.addEventListener('click', () => {
    customizationModal.classList.add('open');
    showButton();
    clearTimeout(hideButtonTimeout);
    setHideButtonTimeout(null); // Detener el temporizador mientras el modal está abierto
    hideBallOptions();
});

closeButton.addEventListener('click', () => {
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
    hideBallOptions();
});

window.addEventListener('click', (event) => {
    if (event.target === customizationModal) {
        customizationModal.classList.remove('open');
        showButtonAndResetTimer();
    }

    if (!ballOptionsDiv.contains(event.target) && event.target !== canvas) {
        hideBallOptions();
    }
});


// --- Modal Option Handlers ---

toggleSnakeModeBtn.addEventListener('click', () => {
    setGlobalSnakeModeActive(!globalSnakeModeActive);
    balls.forEach(ball => {
        if (ball.sizeState !== 'shrinking') {
            ball.sizeState = 'shrinking';
        }
    });
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

toggleCollisionsBtn.addEventListener('click', () => {
    setCollisionsEnabled(!collisionsEnabled);
    toggleCollisionsBtn.textContent = `Colisiones entre Pelotas: ${collisionsEnabled ? 'Activadas' : 'Desactivadas'}`;
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

colorPaletteBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        setCurrentPaletteType(event.target.dataset.palette);
        applyColorPalette(currentPaletteType);
        customizationModal.classList.remove('open');
        showButtonAndResetTimer();
    });
});

speedRange.addEventListener('input', (event) => {
    setCurrentSpeedMultiplier(parseFloat(event.target.value));
    speedValueSpan.textContent = currentSpeedMultiplier;
    balls.forEach(ball => {
        ball.dx = ball.baseDx * currentSpeedMultiplier;
        ball.dy = ball.baseDy * currentSpeedMultiplier;
    });
});

addBallBtn.addEventListener('click', () => {
    addBall();
});

resetBallsBtn.addEventListener('click', () => {
    initializeBalls(INITIAL_NUMBER_OF_BALLS);
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

toggleShapeBtn.addEventListener('click', () => {
    setCurrentShapeType((currentShapeType === 'circle') ? 'rectangle' : 'circle');
    balls.forEach(ball => {
        ball.shape = currentShapeType;
    });
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

deleteBallBtn.addEventListener('click', () => {

    pendingBallAction = 'delete';
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

growBallBtn.addEventListener('click', () => {
    pendingBallAction = 'grow';
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

speedUpBallBtn.addEventListener('click', () => {
    pendingBallAction = 'faster';
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

slowDownBallBtn.addEventListener('click', () => {
    pendingBallAction = 'slower';
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

window.addEventListener("resize", handleWindowResize);
