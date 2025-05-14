const express = require('express')
const router = express.Router()
const Forest = require('../../models/Forest.js')

router.get('/', async (req, res) => {
  try {
    const { nickname } = req.query

    if (!nickname) {
      return res.status(400).json({ message: 'nickname이 필요합니다.' })
    }

    const forest = await Forest.findOne({ nickname }).exec()

    if (!forest) {
      return res.status(404).json({ message: '해당 닉네임의 나무가 없습니다.' })
    }

    res.status(200).json({
      tree_name: forest.tree_name,
      tree_type: forest.tree_type,
      tree_emotion: forest.tree_emotion,
      start_at: forest.start_at,
      end_at: forest.end_at,
      emotion_counts: forest.emotion_counts,
    })
  } catch (error) {
    console.error('리포트 조회 오류:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message })
  }
})

module.exports = router
