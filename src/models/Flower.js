const mongoose = require('mongoose')

const FlowerSchema = new mongoose.Schema(
  {
    receiver_nickname: { type: String, required: true },
    sender_nickname: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('FlowerSendLog', FlowerSchema)
