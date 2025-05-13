const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { user_id, password, nickname } = req.body;

  try {
    // 아이디 중복 체크
    const existingUser = await User.findOne({ user_id });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
    }

    // 닉네임 중복 체크
    const existingNickname = await User.findOne({ nickname });
    if (existingNickname) {
      return res.status(400).json({ message: '이미 사용 중인 닉네임입니다.' });
    }

    // 비밀번호 암호화
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 새 유저 생성
    const newUser = new User({
      user_id,
      password: hashedPassword,
      nickname,
    });

    await newUser.save();

    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    res.status(500).json({ message: '서버 에러', error: error.message });
  }
};
