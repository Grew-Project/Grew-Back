const mongoose = require('mongoose')

const leafSchema = new mongoose.Schema({
  receiver_nickname: { type: String, required: true },
  sender_nickname: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  read_or_not: { type: Boolean, default: false },
})

const Leaf = mongoose.model('Leaf', leafSchema)
module.exports = Leaf
