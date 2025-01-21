const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const extensionsDir = path.join(__dirname, "extensions");
const extensionsFilePath = path.join(__dirname, "extensions.txt");
const failedExtensionsPath = path.join(__dirname, "failedExtensions.txt");

// Crear carpeta para las extensiones si no existe
if (!fs.existsSync(extensionsDir)) {
  fs.mkdirSync(extensionsDir);
}

// Generar archivo extensions.txt si no existe
function ensureExtensionsFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(
      "🔍 Archivo extensions.txt no encontrado. Generando con las extensiones instaladas en VSCode..."
    );
    try {
      execSync("code --list-extensions > extensions.txt", { stdio: "ignore" });
      console.log("✅ extensions.txt generado exitosamente.");
    } catch (error) {
      console.error(
        "❌ Error al intentar generar extensions.txt. Asegúrate de tener VSCode instalado y el comando `code` disponible en PATH."
      );
      process.exit(1);
    }
  }
}

// Leer las extensiones del archivo
function readExtensionsFromFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const extensions = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  if (extensions.length === 0) {
    console.error(
      "❌ El archivo extensions.txt está vacío o no contiene extensiones válidas."
    );
    process.exit(1);
  }
  return extensions;
}

// Descargar las extensiones (función existente)

async function downloadExtensions(extensions) {
  const results = [];
  const failedExtensions = [];

  for (const ext of extensions) {
    const [publisher, name] = ext.split(".");
    if (!publisher || !name) {
      console.warn(`⚠️ Formato inválido: "${ext}". Debe ser "publisher.name".`);
      results.push({ extension: ext, success: false });
      failedExtensions.push(ext);
      continue;
    }

    const url = `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisher}/vsextensions/${name}/latest/vspackage`;
    const filename = path.join(extensionsDir, `${publisher}.${name}.vsix`);

    console.log(`📥 Descargando ${ext}...`);

    try {
      const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
      });

      const writer = fs.createWriteStream(filename);
      response.data.pipe(writer);

      // Esperar a que la descarga termine
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      console.log(`✅ ${ext} descargada correctamente.`);
      results.push({ extension: ext, success: true });
    } catch (error) {
      console.error(`❌ Error al descargar ${ext}: ${error.message}`);
      results.push({ extension: ext, success: false });
      failedExtensions.push(ext);
    }
  }

  if (failedExtensions.length > 0) {
    fs.writeFileSync(
      failedExtensionsPath,
      failedExtensions.join("\n"),
      "utf-8"
    );
    console.log(
      `❌ Se generó ${failedExtensionsPath} con las extensiones fallidas.`
    );
  }

  return results;
}

// Resumen (función existente)
function printSummary(results) {
  console.log("\n📊 Resumen de la descarga:");
  let successCount = 0;
  let failCount = 0;

  results.forEach((result) => {
    const symbol = result.success ? "✅" : "❌";
    console.log(`${symbol} ${result.extension}`);
    result.success ? successCount++ : failCount++;
  });

  console.log(
    `\nResultados totales: ${successCount} descargadas correctamente, ${failCount} fallidas de un total de ${results.length}.`
  );
}

// Script principal
(async () => {
  ensureExtensionsFileExists(extensionsFilePath);
  const extensions = readExtensionsFromFile(extensionsFilePath);
  console.log(
    `✅ Se encontraron ${extensions.length} extensiones para descargar.`
  );
  const results = await downloadExtensions(extensions);
  printSummary(results);
  console.log("✅ Proceso finalizado.");
  process.exit(0);
})();
