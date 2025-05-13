const express = require('express')
const router = express.Router()
const Answer = require('../../models/Answer')

router.put('/', async (req, res) => {
  try {
    const { nickname, question_id, content, is_public } = req.body

    // 업데이트할 필드 설정
    const updateFields = {}
    if (content !== undefined) updateFields.content = content
    if (is_public !== undefined) updateFields.is_public = is_public

    // 답변 업데이트
    const updatedAnswer = await Answer.findOneAndUpdate({ nickname, question_id }, updateFields, {
      new: false,
    })

    if (!updatedAnswer) {
      return res.status(404).json({ error: '답변을 찾을 수 없습니다.' })
    }

    res.json({
      message: '답변이 성공적으로 수정되었습니다.',
      content: updatedAnswer.content,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '답변 수정 실패' })
  }
})

module.exports = router
