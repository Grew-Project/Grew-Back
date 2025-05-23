const express = require('express')
const Answer = require('../../models/Answer.js')
const Tree = require('../../models/Tree.js')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { nickname, question_id, answer_content, emotion_type, is_public } = req.body

    const newAnswer = new Answer({
      nickname,
      question_id,
      answer_content,
      emotion_type,
      is_public,
    })

    try {
      await newAnswer.save()
    } catch (err) {
      console.error('Answer 저장 중 에러 발생:', err) // 에러 출력
      return res.status(500).json({ error: '답변 저장 중 오류 발생' })
    }

    const tree = await Tree.findOne({ nickname })
    if (tree) {
      tree.answer_count += 1
      await tree.save()
    } else {
      return res.status(404).json({ error: '해당 nickname에 대한 Tree 데이터가 없습니다.' })
    }
    res.status(201).json({ message: '답변 저장 완료' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '답변 저장 중 오류 발생' })
  }
})

module.exports = router
