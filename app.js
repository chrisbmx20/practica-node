const express = require('express');
const path = require('path');
const bodyParser = require('express').urlencoded({ extended: false });
const qrcode = require('qrcode');
const indexRouter = require('./routes/index');

const app = express();
const port = 3000;

// Configuración para servir HTML directamente desde la carpeta views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);  // Utiliza ejs para renderizar archivos .html

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar formularios
app.use(bodyParser);

// Middleware para manejar las rutas
app.use('/', indexRouter);

// Manejo de errores
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
