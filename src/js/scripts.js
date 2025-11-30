document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-bailarin');
    if (!boton) return;

    let intentos = 0;
    const maxIntentos = 3;
    const urlDestino = 'index.html'; // Página a la que vamos

    const moverBoton = (e) => {
        // Solo mover mientras queden intentos
        if (intentos < maxIntentos) {
            e.preventDefault(); // bloquea el enlace mientras baila
            const main = boton.closest('main');
            const maxX = main.offsetWidth - boton.offsetWidth;
            const maxY = main.offsetHeight - boton.offsetHeight;

            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            boton.style.left = x + 'px';
            boton.style.top = y + 'px';
            intentos++;
        }
    };

    // Movimiento: pointer cubre mouse y touch
    boton.addEventListener('pointerdown', moverBoton);

    // Redirección: click controlado por JS
    boton.addEventListener('click', (e) => {
        e.preventDefault(); // bloqueamos navegación por defecto
        if (intentos >= maxIntentos) {
            window.location.href = urlDestino; // redirige manualmente
        }
        // si aún baila, no hace nada
    });

    // Extra: soporte táctil en móviles que no disparan click tras preventDefault
    boton.addEventListener('touchend', (e) => {
        if (intentos >= maxIntentos) {
            window.location.href = urlDestino;
        }
    });
});