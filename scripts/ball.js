// ball.js (Ahora es un módulo)

// Constructor de la pelota
function Ball(x, y, radius, dx, dy, color, shape) {
    this.x = x;
    this.y = y;
    this.initialRadius = radius;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.shape = shape || 'circle'; // Añadido soporte para formas, por defecto 'circle'

    this.maxRadius = radius * 2;
    this.minRadius = radius;

    this.sizeState = 'normal';

    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        if (this.shape === 'circle') {
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        } else if (this.shape === 'rectangle') {
            // Para un rectángulo, x e y son el centro, así que dibujamos desde x - radio a x + radio
            ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
        ctx.closePath();
    };

    this.update = function (canvasWidth, canvasHeight) {
        let halfSize = this.radius; // Representa la mitad del ancho/alto para la colisión

        // --- Paso 1: Actualizar la posición basada en la velocidad actual ---
        this.x += this.dx;
        this.y += this.dy;

        // --- Paso 2: Detección y Respuesta a Colisiones en los Límites ---

        // Límites horizontales
        if (this.x + halfSize > canvasWidth) {
            this.x = canvasWidth - halfSize; // Ajustar a la frontera
            this.dx = -Math.abs(this.dx);    // Invertir dirección y asegurar que sea negativo
        } else if (this.x - halfSize < 0) {
            this.x = halfSize;               // Ajustar a la frontera
            this.dx = Math.abs(this.dx);     // Invertir dirección y asegurar que sea positivo
        }

        // Límites verticales
        if (this.y + halfSize > canvasHeight) {
            this.y = canvasHeight - halfSize; // Ajustar a la frontera
            this.dy = -Math.abs(this.dy);    // Invertir dirección y asegurar que sea negativo
        } else if (this.y - halfSize < 0) {
            this.y = halfSize;               // Ajustar a la frontera
            this.dy = Math.abs(this.dy);     // Invertir dirección y asegurar que sea positivo
        }

        // Salvaguarda adicional: Si la velocidad es muy baja, aumentarla ligeramente
        const minMovementSpeed = 0.5; // Un valor pequeño para evitar movimientos cercanos a cero
        if (Math.abs(this.dx) < minMovementSpeed && this.dx !== 0) {
            this.dx = (this.dx > 0 ? 1 : -1) * minMovementSpeed;
        }
        if (Math.abs(this.dy) < minMovementSpeed && this.dy !== 0) {
            this.dy = (this.dy > 0 ? 1 : -1) * minMovementSpeed;
        }

        // Lógica de crecimiento/encogimiento
        if (this.sizeState === 'growing') {
            if (this.radius < this.maxRadius) {
                this.radius += 0.5;
            } else {
                this.radius = this.maxRadius;
                this.sizeState = 'normal';
            }
        } else if (this.sizeState === 'shrinking') {
            if (this.radius > this.minRadius) {
                this.radius -= 0.5;
            } else {
                this.radius = this.minRadius;
                this.sizeState = 'normal';
            }
        }
    };

    // --- Método para detectar colisiones con otra pelota ---
    this.collidesWith = function (otherBall) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + otherBall.radius;
    };
}

// Exporta la clase Ball para que otros módulos puedan importarla
export { Ball };