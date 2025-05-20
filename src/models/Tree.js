const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  tree_name: { type: String, default: '행복나무' },
  tree_type: String,
  answer_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  nickname: { type: String, required: true },
})

const Tree = mongoose.model('Tree', treeSchema)
module.exports = Tree
