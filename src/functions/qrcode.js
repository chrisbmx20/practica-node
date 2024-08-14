// src/functions/qrCode.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const qr = require('qrcode');

app.use(express.json());

app.post('/generate', async (req, res) => {
  try {
    const { text } = req.body;
    const qrCodeData = await qr.toDataURL(text);
    res.json({ qrCodeData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports.handler = serverless(app);
