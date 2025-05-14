const express = require('express')
const router = express.Router()
const Answer = require('../../models/Answer.js')
const Tree = require('../../models/Tree.js')
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

    if (!nickname) {
      return res.status(400).json({ message: 'nickname이 필요합니다.' })
    }

    // 최신 16개만 가져옴
    const answers = await Answer.find({ nickname })
      .select('emotion_type created_at')
      .sort({ created_at: -1 })
      .limit(16)
      .exec()

    if (answers.length === 0) {
      return res.status(404).json({ message: '답변이 없습니다.' })
    }

    // 감정 카운트
    const emotionCounts = {}
    EMOTION_PRIORITY.forEach(emotion => (emotionCounts[emotion] = 0))
    answers.forEach(answer => {
      if (EMOTION_PRIORITY.includes(answer.emotion_type)) {
        emotionCounts[answer.emotion_type]++
      }
    })

    // 대표 감정 선정
    const dominantEmotion = EMOTION_PRIORITY.reduce((selected, emotion) => {
      if (
        emotionCounts[emotion] > (emotionCounts[selected] || 0) ||
        (emotionCounts[emotion] === emotionCounts[selected] && !selected)
      ) {
        return emotion
      }
      return selected
    }, null)

    const start_at = answers[answers.length - 1].created_at
    const end_at = answers[0].created_at

    // 트리 이름과 타입 (Tree 테이블에서 둘 다 가져옴)
    const tree = await Tree.findOne({ nickname }).select('tree_name tree_type').exec()
    if (!tree) {
      return res.status(404).json({ message: '트리 정보가 없습니다.' })
    }

    const resultTreeName = `${getEmotionAdjective(dominantEmotion)} ${tree.tree_name}`

    await Forest.findOneAndUpdate(
      { nickname },
      {
        tree_type: tree.tree_type,
        tree_name: resultTreeName,
        tree_emotion: dominantEmotion,
        start_at,
        end_at,
        emotion_counts: emotionCounts,
      },
      { upsert: true, new: true }
    )

    return res.status(200).json({
      tree_type: tree.tree_type,
      tree_name: resultTreeName,
      tree_emotion: dominantEmotion,
      start_at,
      end_at,
      emotion_counts: emotionCounts,
    })
  } catch (error) {
    console.error('Error generating forest summary:', error)
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message })
  }
})

module.exports = router
