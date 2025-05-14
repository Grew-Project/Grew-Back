const express = require('express')
const router = express.Router()
const Answer = require('../../models/Answer.js')
const Tree = require('../../models/Tree.js')

// 감정 우선순위 (높을수록 앞쪽에 배치)
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

    if (!nickname) {
      return res.status(400).json({ message: 'nickname 쿼리 파라미터가 필요합니다.' })
    }

    const allAnswers = await Answer.find({ nickname })
      .select('emotion_type created_at')
      .sort({ created_at: -1 })
      .exec()

    if (allAnswers.length === 0) {
      return res.status(404).json({ message: '공개된 답변이 없습니다.' })
    }

    const tree = await Tree.findOne({ nickname }).select('tree_name').exec()
    if (!tree) {
      return res.status(404).json({ message: '트리 정보가 없습니다.' })
    }

    const groupSize = 16
    const groups = []

    for (let i = 0; i < allAnswers.length; i += groupSize) {
      const group = allAnswers.slice(i, i + groupSize)

      const emotionCounts = {}
      EMOTION_PRIORITY.forEach(emotion => (emotionCounts[emotion] = 0))

      group.forEach(answer => {
        if (EMOTION_PRIORITY.includes(answer.emotion_type)) {
          emotionCounts[answer.emotion_type]++
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

      const emotionAdjective = getEmotionAdjective(dominantEmotion)
      const resultTreeName = `${emotionAdjective} ${tree.tree_name}`

      groups.push({
        group_index: groups.length,
        dominant_emotion: dominantEmotion,
        emotion_counts: emotionCounts,
        result_tree_name: resultTreeName,
      })
    }

    res.status(200).json({ groups })
  } catch (error) {
    console.error('Error in emotion summary:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message })
  }
})

module.exports = router
