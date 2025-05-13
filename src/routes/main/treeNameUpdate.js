const express = require('express')
const Tree = require('../../models/Tree.js')

const router = express.Router()

router.put('/', async (req, res) => {
  try {
    const { user_id, tree_name } = req.body

    if (!user_id || !tree_name) {
      return res.status(400).json({ error: 'user_id와 tree_name이 필요합니다.' })
    }

    console.log('요청된 user_id:', user_id)
    console.log('새로운 tree_name:', tree_name)

    const tree = await Tree.findOneAndUpdate({ user_id }, { tree_name })

    if (!tree) {
      return res.status(404).json({ error: '유저가 존재하지 않습니다.' })
    }

    res.json({
      message: '나무 이름이 성공적으로 수정되었습니다.',
      tree_name: tree.tree_name,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '서버 오류' })
  }
})

module.exports = router
