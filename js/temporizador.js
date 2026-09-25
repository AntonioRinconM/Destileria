const contenedorTemporizador = document.querySelector('.temporizador');

if (contenedorTemporizador) {
    const fechaObjetivo = new Date(contenedorTemporizador.dataset.target);
    const valorDias = document.querySelector('[data-unit="days"]');
    const valorHoras = document.querySelector('[data-unit="hours"]');
    const valorMinutos = document.querySelector('[data-unit="minutes"]');
    const valorSegundos = document.querySelector('[data-unit="seconds"]');

    function actualizarTemporizador() {
        const ahora = new Date();
        const diferencia = fechaObjetivo - ahora;

        if (diferencia <= 0) {
            valorDias.textContent = '00';
            valorHoras.textContent = '00';
            valorMinutos.textContent = '00';
            valorSegundos.textContent = '00';
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        valorDias.textContent = String(dias).padStart(2, '0');
        valorHoras.textContent = String(horas).padStart(2, '0');
        valorMinutos.textContent = String(minutos).padStart(2, '0');
        valorSegundos.textContent = String(segundos).padStart(2, '0');
    }

    actualizarTemporizador();
    setInterval(actualizarTemporizador, 1000);
}
