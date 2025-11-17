// animation.js - Script para animaciones adicionales
document.addEventListener("DOMContentLoaded", function () {
  console.log("Animaciones cargadas correctamente");

  // Lista de videos - rutas relativas para el renderer process
  const videos = [
    "../assets/icons/icon2.png", // Imagen
    "../assets/icons/video1.mp4",
    "../assets/icons/video2.mp4",
    "../assets/icons/icon2.png", // Imagen
    "../assets/icons/video3.mp4",
    "../assets/icons/video1.mp4",
  ];

  let currentVideoIndex = 0;
  let videoInterval;

  // Función para cambiar el video
  function changeVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    const videoElement = document.getElementById("videoRotator");
    const currentSource = videos[currentVideoIndex];

    console.log("Cambiando a video:", currentSource);

    // Si es una imagen, usar poster y pausar el video
    if (currentSource.endsWith(".png") || currentSource.endsWith(".jpg")) {
      videoElement.poster = currentSource;
      videoElement.pause();
      // Ocultar el source para que no intente reproducir
      const sourceElement = videoElement.querySelector("source");
      if (sourceElement) {
        sourceElement.src = "";
      }
    } else {
      // Es un video, cambiar la fuente
      const sourceElement = videoElement.querySelector("source");
      if (sourceElement) {
        sourceElement.src = currentSource;
        videoElement.poster = ""; // Limpiar poster
        videoElement.load();

        // Esperar a que el video esté listo para reproducirse
        videoElement.oncanplay = () => {
          videoElement.play().catch((e) => {
            console.log("Error al reproducir:", e);
          });
        };

        videoElement.onerror = () => {
          console.log("Error cargando video:", currentSource);
          // Si hay error, saltar al siguiente
          setTimeout(changeVideo, 1000);
        };
      }
    }
  }

  // Iniciar el carrusel solo si el elemento existe
  const videoElement = document.getElementById("videoRotator");
  if (videoElement) {
    console.log("Iniciando carrusel de videos");

    // Limpiar intervalo anterior si existe
    if (videoInterval) {
      clearInterval(videoInterval);
    }

    // Cambiar de video cada 5 segundos (5000 ms)
    videoInterval = setInterval(changeVideo, 5000);

    // Cambiar inmediatamente al primer video
    setTimeout(changeVideo, 1000);
  }

  // Agregar variables CSS aleatorias para el efecto glitch
  document.documentElement.style.setProperty("--rand", Math.random());

  // Cambiar el valor aleatorio periódicamente para el efecto glitch
  setInterval(() => {
    document.documentElement.style.setProperty("--rand", Math.random());
  }, 200);
});
