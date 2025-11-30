document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-bailarin');
    if (!boton) return;

    let intentos = 0;
    const maxIntentos = 3;

    const moverBoton = (e) => {
        if (intentos < maxIntentos) {
            e.preventDefault(); // evita abrir el enlace mientras baila
            const main = boton.closest('main');
            const maxX = main.offsetWidth - boton.offsetWidth;
            const maxY = main.offsetHeight - boton.offsetHeight;

            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            boton.style.left = x + 'px';
            boton.style.top = y + 'px';
            intentos++;
        }
        // Si intentos >= maxIntentos, no hacemos preventDefault
    };

    // Evento para mover el botón (mouse + touch)
    boton.addEventListener('pointerdown', moverBoton);

    // Evento click separado para asegurar que el enlace funcione después
    boton.addEventListener('click', (e) => {
        if (intentos < maxIntentos) {
            e.preventDefault(); // bloquea el click mientras baila
        }
        // después de los movimientos, el click funciona normalmente
    });
});
