
const mongoose = require('mongoose');
const crypto = require('crypto'); 

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    
    default: () => crypto.randomBytes(32).toString('hex')
  },
  appName: { 
    type: String,
    required: true,
    trim: true
  },
  email: { 
    type: String,
    required: true,
    trim: true,
    unique: true 
  },
  usageCount: { 
    type: Number,
    default: 0
  },
  isActive: { 
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ApiKey', apiKeySchema);