// backend/middleware/apiKeyAuth.js
const ApiKey = require('../models/ApiKey'); // Impor model ApiKey Anda

const apiKeyAuth = async (req, res, next) => {
  const clientApiKey = req.header('X-API-Key'); // Klien harus mengirim key di header ini

  if (!clientApiKey) {
    return res.status(401).json({ message: 'Akses Ditolak: API Key tidak ditemukan di header X-API-Key.' });
  }

  try {
    // Cari API Key di database
    const apiKeyDocument = await ApiKey.findOne({ key: clientApiKey });

    if (!apiKeyDocument) {
      return res.status(403).json({ message: 'Akses Ditolak: API Key tidak valid.' });
    }

    if (!apiKeyDocument.isActive) {
      return res.status(403).json({ message: 'Akses Ditolak: API Key tidak aktif.' });
    }

    // (Opsional) Increment usage count
    apiKeyDocument.usageCount += 1;
    await apiKeyDocument.save();

    // Jika semua valid, lanjutkan ke request handler berikutnya
    next();
  } catch (error) {
    console.error('Error saat validasi API Key:', error);
    res.status(500).json({ message: 'Terjadi kesalahan internal pada server.' });
  }
};

module.exports = apiKeyAuth;