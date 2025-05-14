const express = require('express')
const router = express.Router()
const LeafMessage = require('../../models/Leaf.js')
const User = require('../../models/User.js')

router.post('/', async (req, res) => {
  try {
    const { sender_nickname, receiver_nickname, leaf_content } = req.body

    if (!sender_nickname || !receiver_nickname || !leaf_content) {
      return res.status(400).json({ message: '보낸 사람, 받은 사람, 내용을 모두 입력해야 합니다.' })
    }

    const recipient = await User.findOne({ nickname: receiver_nickname })
    if (!recipient) {
      return res.status(404).json({ message: '받는 사람을 찾을 수 없습니다.' })
    }

    const newLeafMessage = new LeafMessage({
      sender_nickname,
      receiver_nickname,
      leaf_content,
    })

    await newLeafMessage.save()

    recipient.leaf_count += 1
    await recipient.save()

    res
      .status(200)
      .json({ message: '마음잎사귀가 성공적으로 전송되었고, leaf_count가 증가했습니다.' })
  } catch (error) {
    console.error('Error in sending leaf message:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message })
  }
})

module.exports = router
