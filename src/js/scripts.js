document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-bailarin');
    if (!boton) return;

    let intentos = 0;
    const maxIntentos = 3;

    const moverBoton = () => {
        if (intentos < maxIntentos) {
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

    // Desktop
    boton.addEventListener('mouseover', moverBoton);

    // Móvil
    boton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // evita abrir el enlace antes de moverse
        moverBoton();
    });
});
