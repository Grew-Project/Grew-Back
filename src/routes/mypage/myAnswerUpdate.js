const express = require('express')
const router = express.Router()
const Answer = require('../../models/Answer')

router.put('/', async (req, res) => {
  try {
    const { nickname, answer_id, content, is_public } = req.body

    if (!nickname || !answer_id) {
      return res.status(400).json({ error: 'nickname과 answer_id가 필요합니다.' })
    }

    const updateFields = {}
    if (content !== undefined) updateFields.answer_content = content
    if (is_public !== undefined) updateFields.is_public = is_public

    const updatedAnswer = await Answer.findOneAndUpdate({ nickname, answer_id }, updateFields, {
      new: true,
    })

    if (!updatedAnswer) {
      return res.status(404).json({ error: '답변을 찾을 수 없습니다.' })
    }

    res.json({
      message: '답변이 성공적으로 수정되었습니다.',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '답변 수정 실패' })
  }
})

module.exports = router
