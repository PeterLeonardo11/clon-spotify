// ---- 1. SELECCIONAMOS ELEMENTOS DEL DOM -----
const audio = document.getElementById('miAudio');
const playBtn = document.querySelector('.play-circle');
const playIcon = playBtn.querySelector('i');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Elementos visuales a actualizar
const coverImg = document.querySelector('.player-left img');
const titleText = document.querySelector('.song-info h4');
const artistText = document.querySelector('.song-info p');
const barraProgreso = document.querySelector('.progress-fill');
const barraClicleable = document.querySelector('.progress-bar');
const tiempoActualEl = document.getElementById('tiempoActual');
const tiempoTotalEl = document.getElementById('tiempoTotal');

// ---- 2. NUESTRA PLAYLIST (ARRAY DE OBJETOS) -----
const songs = [
    {
        title: "Afterlife",
        artist: "Avenged Sevenfold",
        src: "audio/Avenged_Sevenfold_-_Afterlife_Album_Version_(mp3.pm).mp3",
        cover: "img/afterlife.jfif"
    },
    {
        title: "Nightmare",
        artist: "Avenged Sevenfold",
        src: "audio/Nightmare_-_Avenged_Sevenfold_(mp3.pm).mp3",
        cover: "img/nightmare.jfif"
    },
    {
        title: "Shepherd of Fire",
        artist: "Avenged Sevenfold",
        src: "audio/Aenged_Sevenfold_-_SHEPHERD_OF_FIRE_(mp3.pm).mp3",
        cover: "img/shepherdoffire.jfif"
    }
];

// Indice actual (Empieza en la primera canción)
let songIndex = 0;

// ---- 3. FUNCION PARA CARGAR LA CANCIÓN -----
function loadSong(song) {
    titleText.textContent = song.title;
    artistText.textContent = song.artist;
    audio.src = song.src;
    coverImg.src = song.cover;
}

// Cargar la primera canción al iniciar
loadSong(songs[songIndex]);

// ---- 4. CONTROL DE REPRODUCCIÓN  (PLAY/PAUSE) -----
function playSong() {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    audio.pause();
}

playBtn.addEventListener('click', () => {
    // Si tiene la clase 'fa-play', significa que está pausado
    const isPlaying = playIcon.classList.contains('fa-pause');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// ---- 5. FUNCIONES NEXT Y PREV -----
function nextSong() {
    songIndex++; // Incrementar el índice
    
    // Si el índice supera el tamaño del array, volver al inicio
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]); // Cargar la nueva canción
    playSong(); // Reproducirla automáticamente
}

function prevSong() {
    songIndex--; // Restamos uno

    // Si el índice es menor que 0, ir a la última canción
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]); // Cargar la nueva canción
    playSong(); // Reproducirla automáticamente
}

// Eventos para los botones
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
// Extra: Pasar a la siguiente canción cuando termine la actual
audio.addEventListener('ended', nextSong);

// ---- 6. BARRA DE PROGRESO Y TIEMPO -----
audio.addEventListener('timeupdate', () => {
    // Barra de progreso
    const porcentaje = (audio.currentTime / audio.duration) * 100;
    barraProgreso.style.width = porcentaje + '%';

    // Tiempos numéricos
    const minActual = Math.floor(audio.currentTime / 60);
    const segActual = Math.floor(audio.currentTime % 60);
    const minTotal = Math.floor(audio.duration / 60);
    const segTotal = Math.floor(audio.duration % 60);

    tiempoActualEl.textContent = `${minActual}:${segActual < 10 ? '0' + segActual : segActual}`;
    
    if (audio.duration) {
        tiempoTotalEl.textContent = `${minTotal}:${segTotal < 10 ? '0' + segTotal : segTotal}`;
    }
});

// Seek en la barra de progreso
barraClicleable.addEventListener('click', (e) => {
    const rect = barraClicleable.getBoundingClientRect();
    const anchoTotal = rect.width;
    const clickX = e.clientX - rect.left;
    const duracion = audio.duration;

    audio.currentTime = (clickX / anchoTotal) * duracion;
});