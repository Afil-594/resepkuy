// backend/models/ApiKey.js
const mongoose = require('mongoose');
const crypto = require('crypto'); // Modul Node.js untuk fungsi kriptografi

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    // Fungsi default untuk generate API key unik saat dokumen baru dibuat
    default: () => crypto.randomBytes(32).toString('hex')
  },
  appName: { // Nama aplikasi atau pengguna yang akan menggunakan key ini
    type: String,
    required: true,
    trim: true
  },
  email: { // Email kontak pemilik key
    type: String,
    required: true,
    trim: true,
    unique: true // Pastikan email unik untuk setiap pemilik key
  },
  usageCount: { // Untuk melacak berapa kali key ini digunakan (opsional)
    type: Number,
    default: 0
  },
  isActive: { // Status key, bisa dinonaktifkan jika perlu
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ApiKey', apiKeySchema);