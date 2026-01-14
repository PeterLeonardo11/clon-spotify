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

// Escuchamos el audio para actualizar la barra de progreso
audio.addEventListener('timeupdate', () => {
    // Calculamos el porcentaje de progreso (tiempo actual / duración total)
    // Si la cancion dura 100s y va por 50s, el porcentaje es 50%
    const porcentaje = (audio.currentTime / audio.duration) * 100;

    // Actualizamos el ancho de la barra de progreso
    barraProgreso.style.width = porcentaje + '%';
});