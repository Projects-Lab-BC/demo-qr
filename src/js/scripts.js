document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-bailarin');
    if (!boton) return;

    let intentos = 0;
    const maxIntentos = 3;
    const urlDestino = 'index.html';

    const moverBoton = (e) => {
        if (intentos < maxIntentos) {
            e.preventDefault(); // evita la navegación mientras baila
            const main = boton.closest('main');
            const maxX = main.offsetWidth - boton.offsetWidth;
            const maxY = main.offsetHeight - boton.offsetHeight;

            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            boton.style.left = x + 'px';
            boton.style.top = y + 'px';
            intentos++;
        }
        // después de maxIntentos, no se previene nada
    };

    // Mover el botón en desktop y móvil
    boton.addEventListener('pointerdown', moverBoton);

    // Navegación solo después de que termine de bailar
    boton.addEventListener('click', (e) => {
        if (intentos >= maxIntentos) {
            window.location.href = urlDestino;
        } else {
            e.preventDefault(); // bloquea clicks mientras baila
        }
    });
});