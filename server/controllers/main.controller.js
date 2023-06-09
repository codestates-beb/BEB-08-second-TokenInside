const {Post, User} = require('../models');
const data = require('../models/data');

// 홈페이지
exports.main_get = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    // 1. db에서 모든 post 가져오기
    const posts = await Post.findAll({
      order: [['id', 'DESC']],
      limit: limit,
      offset: offset,
    });

    // 2. 프론트에 보내주기
    res.status(200).send({message: '홈페이지', data: posts});
  } catch (e) {
    throw Error(e);
  }
};

// 더미 데이터 user 데이터 10개, post 데이터 200개를 생성하는 컨트롤러
exports.dummy_get = async (req, res, next) => {
  try {
    // 1. User 더미 데이터 10개 만들고 넣기

    for (let i = 0; i < 10; i++) {
      let created = await User.create({
        nickname: `user${i}`,
        password: '1234abcdA!',
        address: `xdf3234${i}`,
        eth_amount: 0,
        token_amount: 0,
      });
    }

    // 2. Post 더미 데이터 200개 넣고 만들기
    data.map(item => {
      const result = Post.create({
        user_id: Math.floor(Math.random() * 10 + 1),
        title: item.title,
        content: item.content,
      });
    });
    res.send({message: '성공'});
  } catch (e) {
    Error(e);
  }
};

exports.logout_get = async (req, res, next) => {
  req.session.user = null;
  req.session.loggedIn = false;

  return res.status(200).redirect('/hi');
};
