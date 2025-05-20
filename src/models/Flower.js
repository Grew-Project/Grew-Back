const mongoose = require('mongoose')

const FlowerSchema = new mongoose.Schema(
  {
    receiver_nickname: { type: String, required: true },
    sender_nickname: { type: String, required: true },
    flower_ok: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Flower', FlowerSchema)
