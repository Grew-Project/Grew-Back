const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  tree_name: String,
  tree_type: String,
  answer_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
})

const Tree = mongoose.model('Tree', treeSchema)
module.exports = Tree
