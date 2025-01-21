# VSCode Extensions Downloader

Este proyecto es una utilidad para descargar extensiones de Visual Studio Code en formato `.vsix`. Puedes proporcionar una lista de extensiones en un archivo `extensions.txt`, y el script descargará automáticamente dichas extensiones, manejando posibles errores y generando un resumen del proceso.

## Características
- Descarga extensiones de Visual Studio Marketplace utilizando su identificador `publisher.name`.
- Crea una carpeta `extensions` en el directorio de trabajo para almacenar los archivos descargados.
- Genera un archivo `failedExtensions.txt` con las extensiones que fallaron durante el proceso de descarga.
- Muestra una barra de progreso para cada descarga en tiempo real.
- Resumen final con el estado de cada extensión descargada.

---

## Requisitos previos

1. **Node.js**:
   - Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu sistema.
   - Ejecuta `node -v` en la terminal para verificar tu instalación.
2. **npm** (incluido con Node.js):
   - Utilizado para instalar las dependencias requeridas.

---

## Instalación

1. Clona este repositorio o copia los archivos del proyecto.

   ```bash
   git clone https://github.com/tu-usuario/vscode-extensions-downloader.git
   cd vscode-extensions-downloader
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```
## Uso

1. Ejecuta el script principal:

   ```bash
   node downloader.js
   ```

2. El script realizará las siguientes acciones:
   - Leer el archivo `extensions.txt`.
   - Descargar las extensiones especificadas en formato `.vsix`.
   - Mostrar una barra de progreso en tiempo real para cada descarga.
   - Generar un resumen con los resultados de las descargas.
   - Crear un archivo `failedExtensions.txt` si alguna descarga falla.

3. Al finalizar, verás un resumen como este:

   ```plaintext
   📥 -> Descargando ms-python.python...
   ms-python.python [█████████████████-----] 75% | 1500/2000 KB
   ✅ -> ms-python.python descargada correctamente.

   📥 -> Descargando esbenp.prettier-vscode...
   esbenp.prettier-vscode [█████████████████████] 100% | 2000/2000 KB
   ✅ -> esbenp.prettier-vscode descargada correctamente.

   📥 -> Descargando dbaeumer.vscode-eslint...
   ❌ -> Error al descargar dbaeumer.vscode-eslint: Request failed with status code 404.
   ❌ -> 1 extensiones fallaron. Revisar "failedExtensions.txt".

   📊 Resumen de la descarga:
   ✅ ms-python.python
   ✅ esbenp.prettier-vscode
   ❌ dbaeumer.vscode-eslint

   Resultados totales: 2 descargadas correctamente, 1 fallida de un total de 3.
   ```

---

## Archivos generados

- **`extensions`**:
  Carpeta donde se almacenan las extensiones descargadas.

- **`failedExtensions.txt`**:
  Archivo con la lista de extensiones que no se pudieron descargar.

---

## Dependencias utilizadas

- [`axios`](https://www.npmjs.com/package/axios): Para manejar las solicitudes HTTP.
- [`cli-progress`](https://www.npmjs.com/package/cli-progress): Para mostrar barras de progreso en la consola.
- [`fs`](https://nodejs.org/api/fs.html): Para manejar el sistema de archivos.
- [`path`](https://nodejs.org/api/path.html): Para trabajar con rutas del sistema de archivos.

---

## Notas importantes

- Asegúrate de que las extensiones en `extensions.txt` sigan el formato `publisher.name`.
- Si no puedes descargar alguna extensión, verifica manualmente su nombre en el [Marketplace de Visual Studio Code](https://marketplace.visualstudio.com/vscode) y corrige el nombre en el archivo.
- El script requiere acceso a internet para descargar extensiones.

---

## Contribuciones

¡Contribuciones son bienvenidas! Si encuentras errores o quieres mejorar el proyecto, abre un _issue_ o envía un _pull request_.

---

## Licencia

Este proyecto está disponible bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
