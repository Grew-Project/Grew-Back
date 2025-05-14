const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../../models/User')

router.put('/', async (req, res) => {
  try {
    const { user_id, password } = req.body

    if (!user_id || !password) {
      return res.status(400).json({ error: 'user_id과 password가 필요합니다.' })
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || 10)
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const updatedUser = await User.findOneAndUpdate(
      { user_id },
      { password: hashedPassword },
      { new: false }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' })
    }

    res.json({
      message: '비밀번호가 성공적으로 수정되었습니다.',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '비밀번호 수정 실패' })
  }
})

module.exports = router
