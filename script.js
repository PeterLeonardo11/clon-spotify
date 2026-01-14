// 1. Seleccionamos el circulo del reproductor
const botonPlay = document.querySelector('.play-circle');

// 2. Seleccionamos el icono que esta dentro del circulo
const icono = botonPlay.querySelector('i');

// Seleccionamos el elemento de audio
const audio = document.getElementById('miAudio');

// .3. Agregamos un evento de click al circulo
botonPlay.addEventListener('click', () => {
    
    // 4. Verificamos si el icono tiene la clase 'fa-play'
    if (icono.classList.contains('fa-play')) {
        // 5. Si tiene 'fa-play', cambiamos a 'fa-pause'
        icono.classList.remove('fa-play');
        icono.classList.add('fa-pause');

        audio.play(); // Reproducir el audio
        console.log('Reproduciendo música');
    } else {
        // 6. No es play (es pause), cambiamos a 'fa-play'
        icono.classList.remove('fa-pause');
        icono.classList.add('fa-play');

        audio.pause(); // Pausar el audio
        console.log('Música en pausa');
    }
});





// Seleccionamos la barra de progreso
const barraProgreso = document.querySelector('.progress-fill');

const tiempoActualEl = document.getElementById('tiempoActual');
const tiempoTotalEl = document.getElementById('tiempoTotal');

// Actualizamos el tiempo actual y el tiempo total del audio
audio.addEventListener('timeupdate', () => {

    // 1. Barra de progreso
    const porcentaje = (audio.currentTime / audio.duration) * 100;
    barraProgreso.style.width = porcentaje + '%';

    // 2. Tiempos numericos
    // Calcular minutos y segundos actuales
    // Math.floor quita los decimales
    const minActual = Math.floor(audio.currentTime / 60);
    const segActual = Math.floor(audio.currentTime % 60);

    // Calcular minutos y segundos totales
    const minTotal = Math.floor(audio.duration / 60);
    const segTotal = Math.floor(audio.duration % 60);

    // Formatear segundos para que siempre tengan dos digitos
    const segActualFormat = segActual < 10 ? `0${segActual}` : segActual;
    const segTotalFormat = segTotal < 10 ? `0${segTotal}` : segTotal;

    // Pintar los tiempos en el HTML
    tiempoActualEl.textContent = `${minActual}:${segActualFormat}`;

    // Solo pintamos el total si ya cargo la duracion
    if (audio.duration) {
        tiempoTotalEl.textContent = `${minTotal}:${segTotalFormat}`;
    }
});




// 1. Seleccionamos Especificamente la barra de progreso completa
const BarraClickeable = document.querySelector('.progress-bar');

// 2. Agregamos un evento de click a la barra completa
BarraClickeable.addEventListener('click', (e) => {

    // --- LA MAGIA DE LA PRECISION ---
    // getBoundingClientRect() nos da las medidas del elemento y su posicion en la pantalla
    const rect = BarraClickeable.getBoundingClientRect();

    // Ancho exacto de la barra
    const anchoBarra = rect.width;

    // Calcular la posicion del click dentro de la barra
    // e.clientX nos da la posicion del click en la pantalla
    // rect.left nos da la posicion izquierda de la barra en la pantalla
    // La resta nos da la posicion exacta del click dentro de la barra
    const clickX = e.clientX - rect.left;

    // Duracion total del audio
    const duracion = audio.duration;

    // Calcular el nuevo tiempo del audio basado en la posicion del click
    audio.currentTime = (clickX / anchoBarra) * duracion;
});