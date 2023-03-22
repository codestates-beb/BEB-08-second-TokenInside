const {Post} = require('../models');

// 홈페이지
exports.main_get = async (req, res, next) => {
  try {
    // 1. db에서 모든 post 가져오기
    const posts = await Post.findAll({});

    // 2. 프론트에 보내주기
    res.status(200).send({message: '홈페이지', data: posts});
  } catch (e) {
    throw Error(e);
  }
};
