const express = require('express')
const router = express.Router()
const Answer = require('../../models/Answer.js')
const Forest = require('../../models/Forest.js')

const EMOTION_PRIORITY = ['Love', 'Happiness', 'Confusion', 'Sadness', 'Anger']

function getEmotionAdjective(emotion) {
  switch (emotion) {
    case 'Happiness':
      return '행복한'
    case 'Sadness':
      return '슬픈'
    case 'Love':
      return '사랑스러운'
    case 'Anger':
      return '화난'
    case 'Confusion':
      return '혼란스러운'
    default:
      return '행복한'
  }
}

router.get('/', async (req, res) => {
  try {
    const { nickname } = req.query
    if (!nickname) return res.status(400).json({ message: 'nickname이 필요합니다.' })

    const forest = await Forest.findOne({ nickname }).exec()
    if (!forest) return res.status(404).json({ message: 'Forest 정보가 없습니다.' })

    const answers = await Answer.find({ nickname })
      .select('emotion_type created_at')
      .sort({ created_at: -1 })
      .limit(16)
      .exec()

    if (answers.length === 0) return res.status(404).json({ message: '감정 답변이 없습니다.' })

    const emotionCounts = {}
    EMOTION_PRIORITY.forEach(emotion => (emotionCounts[emotion] = 0))
    answers.forEach(({ emotion_type }) => {
      if (EMOTION_PRIORITY.includes(emotion_type)) {
        emotionCounts[emotion_type]++
      }
    })

    const dominantEmotion = EMOTION_PRIORITY.reduce((selected, emotion) => {
      if (
        emotionCounts[emotion] > (emotionCounts[selected] || 0) ||
        (emotionCounts[emotion] === emotionCounts[selected] && !selected)
      ) {
        return emotion
      }
      return selected
    }, null)

    let baseTreeName = forest.tree_name
    EMOTION_PRIORITY.forEach(emotion => {
      const adj = getEmotionAdjective(emotion)
      if (baseTreeName.startsWith(adj + ' ')) {
        baseTreeName = baseTreeName.slice((adj + ' ').length)
      }
    })

    const resultTreeName = `${getEmotionAdjective(dominantEmotion)} ${baseTreeName}`

    forest.tree_name = resultTreeName
    forest.tree_emotion = dominantEmotion
    forest.start_at = answers[answers.length - 1].created_at
    forest.end_at = answers[0].created_at
    forest.emotion_counts = emotionCounts
    await forest.save()

    res.status(200).json({
      tree_type: forest.tree_type,
      tree_name: forest.tree_name,
      tree_emotion: forest.tree_emotion,
      start_at: forest.start_at,
      end_at: forest.end_at,
      emotion_counts: forest.emotion_counts,
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: '서버 오류 발생', error: error.message })
  }
})

module.exports = router
