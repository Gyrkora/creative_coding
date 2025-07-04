// animation.js
import { ctx, balls, globalSnakeModeActive, collisionsEnabled, canvas } from './config.js';

export function animate() {
    requestAnimationFrame(animate);

    if (globalSnakeModeActive) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (collisionsEnabled) {
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                const ball1 = balls[i];
                const ball2 = balls[j];

                if (ball1.collidesWith(ball2)) {
                    const tempDx = ball1.dx;
                    const tempDy = ball1.dy;
                    ball1.dx = ball2.dx;
                    ball1.dy = ball2.dy;
                    ball2.dx = tempDx;
                    ball2.dy = tempDy;

                    const overlap = (ball1.radius + ball2.radius) - Math.sqrt((ball1.x - ball2.x) ** 2 + (ball1.y - ball2.y) ** 2);
                    const angle = Math.atan2(ball1.y - ball2.y, ball1.x - ball2.x);
                    const pushX = overlap * Math.cos(angle);
                    const pushY = overlap * Math.sin(angle);

                    ball1.x += pushX / 2;
                    ball1.y += pushY / 2;
                    ball2.x -= pushX / 2;
                    ball2.y -= pushY / 2;
                }
            }
        }
    }

    balls.forEach(ball => {
        ball.update(canvas.width, canvas.height);
        ball.draw(ctx);
    });
}