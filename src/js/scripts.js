document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton-bailarin');
    console.log(boton); // debe mostrar el <a> en la consola
    if (!boton) return; // si no existe, salimos

    let intentos = 0;
    const maxIntentos = 3;

    function moverBoton() {
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
    }

    boton.addEventListener('mouseover', moverBoton);
    boton.addEventListener('touchstart', moverBoton);
});
