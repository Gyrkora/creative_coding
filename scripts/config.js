// config.js

// Exportamos los elementos DOM directamente, ya que son constantes y se obtienen una vez
export const canvas = document.getElementById('myCanvas');
export const ctx = canvas.getContext('2d');
export const menuButton = document.getElementById('menuButton');
export const customizationModal = document.getElementById('customizationModal');
export const closeButton = customizationModal.querySelector('.close-button');

// Exportamos los botones del modal que se usan en ui-handlers
export const toggleSnakeModeBtn = document.getElementById('toggleSnakeModeBtn');
export const toggleCollisionsBtn = document.getElementById('toggleCollisionsBtn');
export const colorPaletteBtns = document.querySelectorAll('.color-palette-btn');
export const speedRange = document.getElementById('speedRange');
export const speedValueSpan = document.getElementById('speedValue');
export const addBallBtn = document.getElementById('addBallBtn');
export const resetBallsBtn = document.getElementById('resetBallsBtn');
export const toggleShapeBtn = document.getElementById('toggleShapeBtn');
export const deleteBallBtn = document.getElementById('deleteBallBtn');
export const growBallBtn = document.getElementById('growBallBtn');
export const speedUpBallBtn = document.getElementById('speedUpBallBtn');
export const slowDownBallBtn = document.getElementById('slowDownBallBtn');

export const deleteBallBtn = document.getElementById('deleteBallBtn');
export const growBallBtn = document.getElementById('growBallBtn');
export const speedUpBallBtn = document.getElementById('speedUpBallBtn');
export const slowDownBallBtn = document.getElementById('slowDownBallBtn');

// Ajustar canvas size to window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables de estado global (ahora exportadas con setters para modificarlas)
export let globalSnakeModeActive = false;
export let collisionsEnabled = false;
export let currentSpeedMultiplier = parseFloat(speedRange.value); // Usa speedRange directamente
export const INITIAL_NUMBER_OF_BALLS = 10;

export let currentPaletteType = 'random';
export let currentShapeType = 'circle';

// El arreglo de pelotas (exportado)
export const balls = [];

// Temporizador para ocultar el botón del menú (exportado)
export let hideButtonTimeout;

// Funciones para actualizar variables de estado que necesitan ser modificadas desde fuera
export function setGlobalSnakeModeActive(value) {
    globalSnakeModeActive = value;
}

export function setCollisionsEnabled(value) {
    collisionsEnabled = value;
}

export function setCurrentSpeedMultiplier(value) {
    currentSpeedMultiplier = value;
}

export function setCurrentPaletteType(value) {
    currentPaletteType = value;
}

export function setCurrentShapeType(value) {
    currentShapeType = value;
}

export function setHideButtonTimeout(timeoutId) {
    hideButtonTimeout = timeoutId;
}