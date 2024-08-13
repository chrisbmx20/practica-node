const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');

// Ruta principal con el formulario para generar el código QR
router.get('/', (req, res) => {
  res.render('index', { qrCode: null });
});

// Ruta para manejar la generación del código QR
router.post('/generate', (req, res) => {
  const text = req.body.text;

  qrcode.toDataURL(text, (err, url) => {
    if (err) {
      res.send('Error al generar el código QR');
    } else {
      res.render('index', { qrCode: url });
    }
  });
});

module.exports = router;
