
# 🎮 CONVERTIDOR VIDEO MULTIFORMATO - CYBERPUNK EDITION

<p align="center">
  <img src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9" />
  <img src="https://img.shields.io/badge/FFmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white" />
  <img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-2.0.0-00ff6a?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-00ff6a?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Active-00ff6a?style=for-the-badge" />
</p>

<p align="center" style="color:#00ff6a; font-family:'Courier New', monospace;">
  <strong>✨ APLICACIÓN DE ESCRITORIO CYBERPUNK PARA CONVERSIÓN DE VIDEO MULTIFORMATO ✨</strong>
</p>

---

## 📖 TABLA DE CONTENIDOS

- [🚀 Características](#-características)
- [📦 Instalación](#-instalación)
- [🎯 Uso Rápido](#-uso-rápido)
- [📁 Estructura](#-estructura-del-proyecto)
- [🔨 Build](#-construcción)
- [🔐 Certificación](#-certificación)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [📋 Requisitos](#-requisitos-técnicos)
- [🤝 Soporte](#-soporte)

---

## 🚀 CARACTERÍSTICAS

### 🎯 **Funcionalidades Principales**

| Icono | Función | Descripción |
|-------|---------|-------------|
| 🔄 | **Conversión Multiformato** | Soporta WEBM, MP4, AVI, MKV, GIF y más |
| 🎨 | **Interfaz Cyberpunk** | Diseño futurista con efectos neón y animaciones |
| 📊 | **Progreso en Tiempo Real** | Barras animadas con porcentaje y ETA |
| ⚡ | **Conversión Masiva** | Procesa múltiples archivos simultáneamente |
| 🖱️ | **Drag & Drop** | Arrastra y suelta archivos fácilmente |
| ⏹️ | **Cancelación Inteligente** | Detiene conversiones en curso |
| 📝 | **Log Detallado** | Registro completo de operaciones |

### 🔧 **Características Técnicas**

- **⚡ Rendimiento Optimizado**: Usa FFmpeg nativo
- **🛡️ Seguro**: Funciona completamente offline
- **📦 Portable**: No requiere instalación compleja
- **🎯 Preciso**: Mantiene calidad original
- **🔧 Modular**: Fácilmente extensible

---

## 📦 INSTALACIÓN

### **Prerrequisitos**
- **Node.js** (versión 16 o superior)
- **npm** (gestor de paquetes)
- **Windows 10/11** (recomendado)

### ⚠️ FFmpeg requerido

Este proyecto **no incluye FFmpeg** porque sus ejecutables superan los 100MB.

Descárgalo aquí:
latest git master branch build 
🔗 https://www.gyan.dev/ffmpeg/builds/
 
 

Luego descomprímelo y coloca la carpeta **ffmpeg/** en la raíz del proyecto:

/video-converter-multiformat  
    /ffmpeg  
        /bin  
            ffmpeg.exe  
            ffprobe.exe  
            ffplay.exe  



### **🚀 Ejecución Local (Desarrollo)**

```bash
# 1. Clonar el proyecto
git clone <tu-repositorio>
cd convertidor-video-multiformato

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm start

🔨 CONSTRUCCIÓN Y DISTRIBUCIÓN


# Build para Windows (sin firma - desarrollo)

npm run build-win

# Build con certificado de desarrollo

npm run build-win-dev

# Build para distribución

npm run dist

# Construir instalador final

npm run build
📁 ESTRUCTURA DEL PROYECTO
text
convertidor-video-multiformato/
├── 🎨 src/
│ ├── main.js # Proceso principal de Electron
│ ├── preload.js # Script de seguridad
│ ├── background.js # Lógica de la interfaz
│ └── index.html # Interfaz cyberpunk
├── ⚙️ ffmpeg/
│ └── bin/
│ └── ffmpeg.exe # Motor de conversión incluido
├── 🖼️ assets/
│ ├── icons/ # Iconos de la aplicación
│ └── styles/ # Estilos CSS cyberpunk
├── 📦 dist/ # Archivos construidos
│ ├── Convertidor Video Multiformato Setup 2.0.0.exe
│ └── win-unpacked/
├── 🔐 certificates/ # Certificados de firma
└── 📄 package.json # Configuración del proyecto
```
🎮 GUÍA DE USO RÁPIDA

# 🎯 USO RÁPIDO

## 1. 🗂️ CONFIGURACIÓN INICIAL
- **Selecciona carpeta destino** para los archivos convertidos
- **Arrastra archivos** al área designada (soporta múltiples formatos)
- **Ajusta parámetros** de conversión si es necesario

## 2. 🎯 CONVERSIÓN
- **Monitorea progreso** en barras animadas en tiempo real
- **Revisa logs detallados** de cada operación
- **Controla múltiples** conversiones simultáneamente

## 3. ⚡ CONTROLES AVANZADOS
- **⏹️ Cancelar Todo**: Detiene todas las conversiones
- **🗑️ Limpiar Lista**: Remueve archivos completados
- **📊 Ver Estadísticas**: Tiempos y tamaños de conversión

---

# 🔐 CERTIFICACIÓN Y SEGURIDAD

## 📜 CERTIFICADO ACTUAL
```json
"win": {
  "target": "nsis",
  "forceCodeSigning": false,
  "signAndEditExecutable": false,
  "requestedExecutionLevel": "asInvoker"
}
```
⚠️ ESTADO DE FIRMA
🔒 Certificado: Autofirmado (Desarrollo)

🛡️ Nivel Ejecución: Usuario estándar

📦 Distribución: Testing interno

🎯 PARA PRODUCCIÓN


```bash
# Generar certificado de desarrollo
npm run create-cert

# Build con firma básica
npm run build-win-signed

```
## 🎨 ESTILO CYBERPUNK AVANZADO
## 🎨 PALETA DE COLORES
```css
--neon-green: #00ff6a;
--cyber-blue: #0ff;
--matrix-yellow: #ff0;
--dark-bg: #0a0a12;
--glow-effect: 0 0 10px currentColor;
```

# ✨ EFECTOS VISUALES
🌌 Fondos animados con gradientes radiales  
🔮 Efectos de partículas en tiempo real  
💫 Animaciones CSS suaves y fluidas  
📱 Interfaz responsive adaptable  
🎮 Temática cyberpunk cohesiva  

## 🔊 ANIMACIONES INCLUIDAS
Pulsos neón en botones  
Efectos glitch en hover  
Barras de progreso animadas  
Transiciones suaves entre estados

# ⚠️ SOLUCIÓN DE PROBLEMAS

## 🔍 PROBLEMAS COMUNES Y SOLUCIONES

| ❌ PROBLEMA              | ✅ SOLUCIÓN                                                |
|--------------------------|------------------------------------------------------------|
| FFmpeg no encontrado     | Verificar que `ffmpeg/bin/ffmpeg.exe` existe              |
| Archivos no se convierten| Verificar formatos soportados y codecs                    |
| Error de permisos        | Ejecutar como administrador o verificar rutas             |
| Aplicación no inicia     | Reinstalar dependencias: `npm clean-install`             |
| Certificado bloqueado    | Usar **Ejecutar de todas formas** en Windows              |

# 🔧 COMANDOS DE DIAGNÓSTICO

```bash
# Verificar Node.js
node --version

# Reinstalar dependencias
npm clean-install

# Limpiar cache
npm cache clean --force

# Verificar estructura
dir ffmpeg\bin\ffmpeg.exe
```
# 📋 REQUISITOS TÉCNICOS

## 💻 SISTEMA OPERATIVO
- ✅ Windows 10/11 (recomendado)  
- ⚠️ Linux (con configuración adicional)  
- ⚠️ macOS (con configuración adicional)  

## ⚙️ ESPECIFICACIONES MÍNIMAS
- RAM: 4GB (8GB recomendado)  
- Almacenamiento: 500MB libres  
- Procesador: Dual-core 2.0GHz  
- GPU: Cualquier aceleración gráfica  

# 🎥 FORMATOS SOPORTADOS

## 🎥 ENTRADA
.webm, .mp4, .avi, .mkv, .mov, .flv

## 🎥 SALIDA
.mp4, .webm, .avi, .mkv, .gif

## 🔊 AUDIO
.mp3, .wav, .aac, .ogg

# 🚀 CARACTERÍSTICAS TÉCNICAS
- ⚡ Rendimiento Optimizado: Conversiones rápidas usando FFmpeg nativo  
- 🛡️ Seguro: Funciona completamente offline, sin conexión requerida  
- 📦 Portable: No requiere instalación compleja de codecs  
- 🎯 Preciso: Mantiene calidad original con compresión inteligente  
- 🔧 Modular: Fácilmente extensible para nuevos formatos  



<div align="center">

## 🚀 ¡EXPERIMENTA LA POTENCIA CYBERPUNK!

<br>

<div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 20px 0;">

<img src="https://img.shields.io/badge/🔄_MULTIFORMATO-00ff6a?style=for-the-badge&logo=ffmpeg&logoColor=white&labelColor=0a0a12" />
<img src="https://img.shields.io/badge/⚡_ALTO_RENDIMIENTO-007808?style=for-the-badge&logo=speedtest&logoColor=white&labelColor=0a0a12" />
<img src="https://img.shields.io/badge/🎨_INTERFAZ_CYBERPUNK-ff00ff?style=for-the-badge&logo=atom&logoColor=white&labelColor=0a0a12" />

</div>

<div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin: 20px 0;">

<img src="https://img.shields.io/badge/🔒_OFFLINE_SEGURO-00ffff?style=for-the-badge&logo=shield&logoColor=white&labelColor=0a0a12" />
<img src="https://img.shields.io/badge/🖱️_DRAG_&_DROP-ffff00?style=for-the-badge&logo=cursor&logoColor=black&labelColor=0a0a12" />
<img src="https://img.shields.io/badge/📊_PROGRESO_EN_TIEMPO_REAL-ff6b6b?style=for-the-badge&logo=chart&logoColor=white&labelColor=0a0a12" />

</div>

<br>

<div style="background: linear-gradient(45deg, #00ff6a, #00ffff, #ff00ff); padding: 3px; border-radius: 10px; display: inline-block;">
<div style="background: #0a0a12; padding: 20px 40px; border-radius: 8px; text-align: center;">
<h3 style="color: #00ff6a; margin: 0; text-shadow: 0 0 10px #00ff6a;">
✨ ¿LISTO PARA LA CONVERSIÓN DEFINITIVA? ✨
</h3>
<p style="color: #00ffff; margin: 10px 0 0 0; font-size: 14px;">
¡EL FUTURO DEL VIDEO ESTÁ AQUÍ!
</p>
</div>
</div>

<br>

<div style="border: 1px solid #00ff6a; border-radius: 10px; padding: 15px 25px; display: inline-block; background: rgba(0, 255, 106, 0.1);">
<p style="color: #0ff; margin: 0; font-family: 'Courier New', monospace; font-size: 12px;">
🔥 <strong>Desarrollado con 💚 por</strong> 
<a href="https://llamaswebs.com" style="color: #ff0; text-decoration: none; font-weight: bold;">llamaswebs</a> 
<strong>| ¡Convierte con estilo cyberpunk! 🎮</strong>
</p>
</div>

<br>

<div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
<div style="width: 20px; height: 20px; background: #00ff6a; border-radius: 50%; animation: pulse 2s infinite;"></div>
<div style="width: 20px; height: 20px; background: #00ffff; border-radius: 50%; animation: pulse 2s infinite 0.5s;"></div>
<div style="width: 20px; height: 20px; background: #ff00ff; border-radius: 50%; animation: pulse 2s infinite 1s;"></div>
</div>

</div>

<<<<<<< HEAD
=======

>>>>>>> 85bc1d875bcbd2ec5395678271fc3da10cf47980
