const express = require('express')
const Leaf = require('../../models/Leaf.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { receiver_nickname } = req.query

    if (!receiver_nickname) {
      return res.status(400).json({ error: '닉네임이 필요합니다.' })
    }

    console.log('요청된 receiver_nickname:', receiver_nickname)

    const leaves = await Leaf.find({ receiver_nickname })
      .select('-_id sender_nickname receiver_nickname leaf_content')
      .sort({ created_at: -1 }) // 최신순

    if (!leaves) {
      return res.status(404).json({ error: '유저가 존재하지 않습니다.' })
    }

    res.json(leaves)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '서버 오류' })
  }
})

module.exports = router
