const mongoose = require('mongoose')

const forestSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  tree_name: { type: String, required: true },
  tree_type: { type: String },
  tree_emotion: { type: String },
  start_at: { type: Date },
  end_at: { type: Date },
  emotion_counts: {
    Love: { type: Number, default: 0 },
    Happiness: { type: Number, default: 0 },
    Confusion: { type: Number, default: 0 },
    Sadness: { type: Number, default: 0 },
    Anger: { type: Number, default: 0 },
  },
})

module.exports = mongoose.model('Forest', forestSchema)
