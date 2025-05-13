const express = require('express')
const User = require('../../models/User.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { user_id } = req.query

    if (!user_id) {
      return res.status(400).json({ error: 'user_id가 필요합니다.' })
    }

    console.log('요청된 user_id:', user_id)

    const user = await User.findOne({ user_id })

    if (!user) {
      return res.status(404).json({ error: '유저를 찾을 수 없습니다.' })
    }

    res.json({ leaf_count: user.leaf_count })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '서버 오류' })
  }
})

module.exports = router
