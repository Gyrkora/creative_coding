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
    resetBallsBtn, toggleShapeBtn
} from './config.js';
import { addBall, initializeBalls, handleWindowResize } from './ball-manager.js';
import { getColorForPalette } from './utils.js';


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


// --- Event Listeners ---

canvas.addEventListener('click', (event) => {
    if (customizationModal.classList.contains('open')) {
        return;
    }
    showButtonAndResetTimer();

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const distance = Math.sqrt((clickX - ball.x) ** 2 + (clickY - ball.y) ** 2);

        if (distance < ball.radius) {
            if (ball.sizeState === 'normal' && ball.radius === ball.minRadius) {
                ball.sizeState = 'growing';
            } else {
                ball.sizeState = 'shrinking';
            }
            break;
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
});

closeButton.addEventListener('click', () => {
    customizationModal.classList.remove('open');
    showButtonAndResetTimer();
});

window.addEventListener('click', (event) => {
    if (event.target === customizationModal) {
        customizationModal.classList.remove('open');
        showButtonAndResetTimer();
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

window.addEventListener("resize", handleWindowResize);