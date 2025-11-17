const btnFolder = document.getElementById("btnFolder");
const destEl = document.getElementById("dest");
const drop = document.getElementById("drop");
const log = document.getElementById("log");
let outputDir = null;
let currentConversion = null;
let isCancelled = false;

// Formatos soportados de entrada
const supportedInputFormats = [
  ".webm",
  ".mp4",
  ".avi",
  ".mkv",
  ".mov",
  ".wmv",
  ".flv",
  ".mpeg",
  ".mpg",
  ".3gp",
  ".ogv",
  ".mts",
  ".ts",
  ".m2ts",
  ".mp3",
  ".wav",
  ".aac",
  ".ogg",
  ".flac",
  ".wma",
  ".m4a",
];

// Configuración de codecs por formato de salida
const formatConfigs = {
  mp4: {
    videoCodec: "libx264",
    audioCodec: "aac",
    extension: "mp4",
  },
  avi: {
    videoCodec: "mpeg4",
    audioCodec: "mp3",
    extension: "avi",
  },
  mkv: {
    videoCodec: "libx264",
    audioCodec: "aac",
    extension: "mkv",
  },
  mov: {
    videoCodec: "libx264",
    audioCodec: "aac",
    extension: "mov",
  },
  wmv: {
    videoCodec: "wmv2",
    audioCodec: "wmav2",
    extension: "wmv",
  },
  webm: {
    videoCodec: "libvpx-vp9",
    audioCodec: "libopus",
    extension: "webm",
  },
  gif: {
    videoCodec: "gif",
    audioCodec: null,
    extension: "gif",
  },
  mp3: {
    videoCodec: null,
    audioCodec: "libmp3lame",
    extension: "mp3",
  },
  wav: {
    videoCodec: null,
    audioCodec: "pcm_s16le",
    extension: "wav",
  },
};

// Crear botones de control dinámicamente
document.addEventListener("DOMContentLoaded", () => {
  // Crear contenedor para botones de control
  const controlsContainer = document.createElement("div");
  controlsContainer.style.margin = "20px 0";
  controlsContainer.style.display = "flex";
  controlsContainer.style.gap = "15px";
  controlsContainer.style.justifyContent = "center";
  controlsContainer.style.flexWrap = "wrap";

  // Botón Cancelar
  const btnCancel = document.createElement("button");
  btnCancel.id = "btnCancel";
  btnCancel.innerHTML = "⏹️ Cancelar Conversión";
  btnCancel.style.background = "linear-gradient(45deg, #ff4444, #ff6b6b)";
  btnCancel.style.border = "2px solid #ff0000";
  btnCancel.style.boxShadow = "0 0 10px #ff0000";

  // Botón Limpiar Log
  const btnClear = document.createElement("button");
  btnClear.id = "btnClear";
  btnClear.innerHTML = "🗑️ Limpiar Logs";
  btnClear.style.background = "linear-gradient(45deg, #4444ff, #6b6bff)";
  btnClear.style.border = "2px solid #0000ff";
  btnClear.style.boxShadow = "0 0 10px #0000ff";

  // Insertar botones después del botón de carpeta
  controlsContainer.appendChild(btnCancel);
  controlsContainer.appendChild(btnClear);
  btnFolder.parentNode.insertBefore(controlsContainer, btnFolder.nextSibling);

  // Agregar event listeners
  btnCancel.addEventListener("click", cancelConversion);
  btnClear.addEventListener("click", clearLog);
});

function updateProgressBar(filename, progress, fullText = "") {
  // BUSCAR SOLO LAS LÍNEAS RECIENTES - usar :last-child
  const line = log.querySelector(`div[data-filename="${filename}"]:last-child`);
  if (line) {
    const filled = Math.round(10 * progress);
    const empty = 10 - filled;
    const displayText =
      fullText || line.textContent.split(" Convirtiendo: ")[1] || filename;
    line.textContent = `[${"█".repeat(filled)}${"-".repeat(
      empty
    )}] ${Math.round(progress * 100)}% Convirtiendo: ${displayText}`;
  }
}

// Escuchar progreso real
window.api.onConvertProgress((event, { filename, percent }) => {
  if (!isCancelled) {
    const progress = percent / 100;
    updateProgressBar(filename, progress);
  }
});

function addLogLine(text, progress = 0, filename = "") {
  const line = document.createElement("div");
  line.style.color = "#00ff6a";
  line.style.textShadow = "0 0 4px #00ff6a";

  if (filename) {
    // AGREGAR TIMESTAMP al data-filename para hacerlo único
    const uniqueId = `${filename}_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    line.setAttribute("data-filename", uniqueId);
    // También guardar el filename original como atributo separado
    line.setAttribute("data-original-filename", filename);
  }

  if (progress >= 0) {
    const barLength = 10;
    const filled = Math.round(barLength * progress);
    const empty = barLength - filled;
    line.textContent = `[${"█".repeat(filled)}${"-".repeat(
      empty
    )}] ${Math.round(progress * 100)}% ${text}`;
  } else {
    line.textContent = text;
  }

  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
  return line;
}

// NUEVA FUNCIÓN: Encontrar la línea más reciente por filename
function findMostRecentLine(filename) {
  const allLines = log.querySelectorAll(
    `div[data-original-filename="${filename}"]`
  );
  return allLines.length > 0 ? allLines[allLines.length - 1] : null;
}

// ACTUALIZAR updateProgressBar para usar la nueva función
function updateProgressBar(filename, progress, fullText = "") {
  const line = findMostRecentLine(filename);
  if (line) {
    const filled = Math.round(10 * progress);
    const empty = 10 - filled;
    const displayText =
      fullText || line.textContent.split(" Convirtiendo: ")[1] || filename;
    line.textContent = `[${"█".repeat(filled)}${"-".repeat(
      empty
    )}] ${Math.round(progress * 100)}% Convirtiendo: ${displayText}`;
  }
}

function clearLog() {
  log.innerHTML = "";
  addLogLine("🧹 Log limpiado. Listo para nuevas conversiones.", -1);
}

function cancelConversion() {
  if (currentConversion || isCancelled) {
    isCancelled = true;
    addLogLine("🛑 Cancelando conversión en curso...", -1);

    window.api.cancelConversion().then((result) => {
      if (result.success) {
        addLogLine("✅ " + result.message, -1);
      } else {
        addLogLine("❌ Error al cancelar: " + result.message, -1);
      }
      currentConversion = null;
    });
  } else {
    addLogLine("ℹ️ No hay conversión en curso para cancelar.", -1);
  }
}

btnFolder.addEventListener("click", async () => {
  const folder = await window.api.selectFolder();
  outputDir = folder || null;
  destEl.textContent = outputDir || "Ninguna carpeta seleccionada";
  addLogLine("📁 Carpeta destino: " + (outputDir || "ninguna"), -1);
});

drop.addEventListener("dragover", (e) => {
  e.preventDefault();
  drop.classList.add("dragover");
});

drop.addEventListener("dragleave", () => drop.classList.remove("dragover"));

drop.addEventListener("drop", async (e) => {
  e.preventDefault();
  drop.classList.remove("dragover");

  if (!outputDir) {
    addLogLine("❌ Selecciona primero una carpeta destino.", -1);
    return;
  }

  // Obtener formato seleccionado
  const formatSelect = document.getElementById("formatSelect");
  const selectedFormat = formatSelect.value;
  const config = formatConfigs[selectedFormat];

  if (isCancelled) {
    addLogLine("🔄 Reiniciando sistema después de cancelación...", -1);
    isCancelled = false;
  }

  const raw = Array.from(e.dataTransfer.files || []);
  if (!raw.length) {
    addLogLine("No se detectaron archivos.", -1);
    return;
  }

  const files = raw.map((f) => ({
    name: f.name.trim(),
    path: f.path,
    baseName: f.name.replace(/\.[^/.]+$/, ""),
    extension: f.name.split(".").pop().toLowerCase(),
  }));

  addLogLine(
    `🚀 Iniciando conversión a ${selectedFormat.toUpperCase()} de ${
      files.length
    } archivo(s)...`,
    -1
  );

  for (const f of files) {
    if (isCancelled) {
      addLogLine("⏹️ Conversión interrumpida por el usuario.", -1);
      break;
    }

    if (!f.path) {
      addLogLine(`❌ No se pudo leer: ${f.name}`, -1);
      continue;
    }

    // Validar formato de entrada
    if (!supportedInputFormats.includes("." + f.extension)) {
      addLogLine(`⛔ Formato no soportado: ${f.name}`, -1);
      continue;
    }

    const conversionText = `${f.name} → ${f.baseName}.${config.extension}`;
    addLogLine(`🔄 Convirtiendo: ${conversionText}`, 0, f.baseName);

    // SIMULACIÓN DE PROGRESO PARA AUDIO
    let progressInterval;
    const isAudioOnly = selectedFormat === "mp3" || selectedFormat === "wav";

    if (isAudioOnly) {
      // Mostrar progreso inmediato
      updateProgressBar(f.baseName, 0.3, conversionText);

      // Iniciar progreso continuo
      let progress = 0.3;
      progressInterval = setInterval(() => {
        progress += 0.2; // 20% cada vez
        if (progress < 0.95) {
          updateProgressBar(f.baseName, progress, conversionText);
        } else {
          clearInterval(progressInterval);
        }
      }, 100);
    }

    try {
      currentConversion = f.baseName;
      const res = await window.api.convertVideo({
        input: f.path,
        outputDir,
        outputFormat: selectedFormat,
        config: config,
      });

      if (isCancelled) {
        addLogLine(`⏹️ Cancelado: ${f.name}`, -1);
        if (progressInterval) clearInterval(progressInterval);
        continue;
      }

      if (res.ok) {
        // Para audio, completar la barra
        if (isAudioOnly) {
          if (progressInterval) clearInterval(progressInterval);
          updateProgressBar(f.baseName, 1, conversionText);
        }
        addLogLine(
          `✅ Convertido: ${f.name} → ${f.baseName}.${config.extension}`,
          -1
        );
      } else {
        addLogLine(`❌ Error en ${f.name}: ${res.error}`, -1);
        if (progressInterval) clearInterval(progressInterval);
      }
    } catch (error) {
      if (!isCancelled) {
        addLogLine(`💥 Error inesperado en ${f.name}: ${error.message}`, -1);
      }
      if (progressInterval) clearInterval(progressInterval);
    } finally {
      currentConversion = null;
    }
  }

  if (!isCancelled) {
    addLogLine("🎉 Todas las conversiones completadas.", -1);
  } else {
    addLogLine("⏹️ Proceso cancelado por el usuario.", -1);
    isCancelled = false;
  }
});
