const mongoose = require('mongoose')

const forestSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  tree_name: { type: String, required: true },
  tree_type: { type: String },
  tree_emotion: { type: String },
  start_at: { type: Date },
  end_at: { type: Date },
})

module.exports = mongoose.model('Forest', forestSchema)
