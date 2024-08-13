const fs = require('fs');
const path = require('path');

const copyDirectory = (src, dest) => {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? copyDirectory(srcPath, destPath)
      : fs.copyFileSync(srcPath, destPath);
  }
};

const build = () => {
  const distPath = path.join(__dirname, 'dist');
  const publicPath = path.join(__dirname, 'public');
  const viewsPath = path.join(__dirname, 'views');

  // Eliminar el directorio dist si existe
  if (fs.existsSync(distPath)) {
    fs.rmdirSync(distPath, { recursive: true });
  }

  // Copiar directorios públicos y de vistas a dist
  copyDirectory(publicPath, path.join(distPath, 'public'));
  copyDirectory(viewsPath, path.join(distPath, 'views'));

  console.log('Build completado.');
};

build();
