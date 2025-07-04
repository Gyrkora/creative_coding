// main.js
import { INITIAL_NUMBER_OF_BALLS } from './config.js';
import { initializeBalls } from './ball-manager.js';
import { animate } from './animation.js';
import { showButtonAndResetTimer } from './ui-handlers.js'; // Importa la función para iniciar el temporizador del botón

// Inicializa las pelotas al cargar
initializeBalls(INITIAL_NUMBER_OF_BALLS);

// Comienza el bucle de animación
animate();

// Inicia el temporizador para ocultar el botón del menú
showButtonAndResetTimer();