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
    res.json({
      tree_name: tree.tree_name,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '서버 오류' })
  }
})

module.exports = router
