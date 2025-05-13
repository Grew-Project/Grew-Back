const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },

  flower_count: { type: Number, default: 0 },  
  leaf_count: { type: Number, default: 0 },    
  created_at: { type: Date, default: Date.now }  
});

module.exports = mongoose.model('User', UserSchema);
