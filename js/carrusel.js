const diapositivas = document.querySelectorAll('.slideCarrusel');
const botonAnterior = document.querySelector('.botonCarrusel.anterior');
const botonSiguiente = document.querySelector('.botonCarrusel.siguiente');

let indiceActual = 0;

function mostrarDiapositiva(indice) {
    diapositivas.forEach((diapositiva, posicion) => {
        diapositiva.classList.toggle('activo', posicion === indice);
    });
}

if (diapositivas.length > 0) {
    botonAnterior?.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + diapositivas.length) % diapositivas.length;
        mostrarDiapositiva(indiceActual);
    });

    botonSiguiente?.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % diapositivas.length;
        mostrarDiapositiva(indiceActual);
    });

    mostrarDiapositiva(indiceActual);
}
