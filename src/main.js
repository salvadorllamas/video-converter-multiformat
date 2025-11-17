const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

// --- Configura FFmpeg local ---
let ffmpegPath;

function getFfmpegPath() {
  if (!app.isPackaged) {
    // Desarrollo: usa la ruta relativa
    ffmpegPath = path.join(__dirname, "..", "ffmpeg", "bin", "ffmpeg.exe");
  } else {
    // Producción: usa resourcesPath
    ffmpegPath = path.join(
      process.resourcesPath,
      "ffmpeg",
      "bin",
      "ffmpeg.exe"
    );

    // Verificar que el archivo existe
    if (!fs.existsSync(ffmpegPath)) {
      console.error("FFmpeg no encontrado en:", ffmpegPath);
      // Intentar rutas alternativas
      const altPath = path.join(__dirname, "..", "ffmpeg", "bin", "ffmpeg.exe");
      if (fs.existsSync(altPath)) {
        ffmpegPath = altPath;
      } else {
        throw new Error("FFmpeg no encontrado en ninguna ruta");
      }
    }
  }

  console.log("Usando FFmpeg en:", ffmpegPath);
  return ffmpegPath;
}

// Configurar FFmpeg
try {
  ffmpeg.setFfmpegPath(getFfmpegPath());
} catch (error) {
  console.error("Error configurando FFmpeg:", error);
}

// Variables para control de cancelación
let currentFFmpegProcess = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    resizable: false,
    maximizable: false,
    icon: path.join(__dirname, "..", "assets", "icons", "icon2.png"),
  });

  win.loadFile(path.join(__dirname, "index.html"));

  // Opcional: abrir DevTools en desarrollo
  // if (!app.isPackaged) {
  //   win.webContents.openDevTools();
  // }
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("get-ffmpeg-path", () => {
    return getFfmpegPath();
  });

  ipcMain.handle("select-folder", async () => {
    const res = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    return res.canceled ? null : res.filePaths[0];
  });

  ipcMain.handle(
    "convert-video",
    async (event, { input, outputDir, outputFormat, config }) => {
      try {
        if (!input) throw new Error("Ruta del archivo vacía");
        if (!outputDir) throw new Error("Carpeta destino vacía");

        const base = path.basename(input).replace(/\.[^/.]+$/, "");
        const outputFile = path.join(outputDir, `${base}.${config.extension}`);

        return await new Promise((resolve) => {
          let command = ffmpeg(input);

          // Configurar codecs según el formato
          if (config.videoCodec) {
            command = command.videoCodec(config.videoCodec);
          } else {
            // Si no hay video codec, deshabilitar video (solo audio)
            command = command.noVideo();
          }

          if (config.audioCodec) {
            command = command.audioCodec(config.audioCodec);
          } else {
            // Si no hay audio codec, deshabilitar audio
            command = command.noAudio();
          }

          // Configuraciones específicas para GIF
          if (outputFormat === "gif") {
            command = command.outputOptions([
              "-vf",
              "fps=10,scale=320:-1:flags=lanczos",
              "-loop",
              "0",
            ]);
          }

          // Configuración general para mejor calidad
          if (
            outputFormat === "mp4" ||
            outputFormat === "mov" ||
            outputFormat === "mkv"
          ) {
            command = command.outputOptions([
              "-preset",
              "medium",
              "-crf",
              "23",
            ]);
          }

          command
            .output(outputFile)
            .on("progress", (p) => {
              event.sender.send("convert-progress", {
                filename: base,
                percent: p.percent ? Math.min(p.percent, 100) : 0,
              });
            })
            .on("end", () => {
              currentFFmpegProcess = null;
              resolve({ ok: true, output: outputFile });
            })
            .on("error", (err) => {
              currentFFmpegProcess = null;
              resolve({ ok: false, error: err.message });
            })
            .on("start", (commandLine) => {
              currentFFmpegProcess = command;
              console.log(`FFmpeg command: ${commandLine}`);
            });

          command.run();
        });
      } catch (err) {
        currentFFmpegProcess = null;
        return { ok: false, error: err.message };
      }
    }
  );

  ipcMain.handle("cancel-conversion", async () => {
    if (currentFFmpegProcess) {
      try {
        currentFFmpegProcess.kill("SIGTERM");
        currentFFmpegProcess = null;
        return { success: true, message: "Conversión cancelada correctamente" };
      } catch (error) {
        return { success: false, message: error.message };
      }
    } else {
      return { success: true, message: "No hay proceso activo para cancelar" };
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
