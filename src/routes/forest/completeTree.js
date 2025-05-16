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

    const forest = await Forest.find({ nickname }).exec()
    if (!forest) return res.status(404).json({ message: 'Forest 정보가 없습니다.' })

    const allAnswers = await Answer.find({ nickname })
      .select('emotion_type created_at')
      .sort({ created_at: 1 })
      .exec()

    if (allAnswers.length === 0) {
      return res.status(404).json({ message: '공개된 답변이 없습니다.' })
    }

    const groupSize = 16
    const groups = []

    for (let i = 0; i < allAnswers.length; i += groupSize) {
      const groupAnswers = allAnswers.slice(i, i + groupSize)
      const groupIndex = Math.floor(i / groupSize)
      const currentForest = forest[groupIndex] || forest[0]

      let baseTreeName = currentForest.tree_name
      EMOTION_PRIORITY.forEach(emotion => {
        const adj = getEmotionAdjective(emotion)
        if (baseTreeName.startsWith(adj + ' ')) {
          baseTreeName = baseTreeName.slice((adj + ' ').length)
        }
      })

      const emotionCounts = {}
      EMOTION_PRIORITY.forEach(emotion => (emotionCounts[emotion] = 0))
      groupAnswers.forEach(({ emotion_type }) => {
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

      const resultTreeName = `${getEmotionAdjective(dominantEmotion)} ${baseTreeName}`

      groups.push({
        index: groups.length + 1,
        start_at: groupAnswers[0].created_at,
        end_at: groupAnswers[groupAnswers.length - 1].created_at,
        emotion_counts: emotionCounts,
        dominant_emotion: dominantEmotion,
        tree_name: resultTreeName,
        tree_type: currentForest.tree_type,
      })
    }

    res.status(200).json({ total: groups.length, groups })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: '서버 오류 발생', error: error.message })
  }
})

module.exports = router
