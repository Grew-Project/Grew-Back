const express = require('express')
const Tree = require('../../models/Tree.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query

    if (!user_id) {
      return res.status(400).json({ error: 'user_id가 필요합니다.' })
    }

    console.log('요청된 user_id:', user_id)

    const tree = await Tree.findOne({ user_id })

    if (!tree) {
      return res.status(404).json({ error: '유저가 존재하지 않습니다.' })
    }

    let tree_status
    if (tree.answer_count >= 0 && tree.answer_count <= 4) {
      tree_status = 1
    } else if (tree.answer_count >= 5 && tree.answer_count <= 8) {
      tree_status = 2
    } else if (tree.answer_count >= 9 && tree.answer_count <= 12) {
      tree_status = 3
    } else if (tree.answer_count >= 13 && tree.answer_count <= 16) {
      tree_status = 4
    } else {
      tree_status = '단계 없음'
    }

    res.json({
      tree_type: tree.tree_type,
      tree_status: tree_status,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '서버 오류' })
  }
})

module.exports = router
