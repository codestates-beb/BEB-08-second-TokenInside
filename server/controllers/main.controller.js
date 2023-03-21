const {Post} = require('../models');

exports.main_get = async (req, res, next) => {
  try {
    // 1. db에서 모든 post 가져오기
    const posts = await Post.findAll({});

    // 2. 프론트에 보내주기
    res.status(200).send({message: 'HELLO WORLD!', data: posts});
  } catch (e) {
    throw Error(e);
  }
};

exports.test_get = async (req, res, next) => {
  try {
    res.status(200).send('hello world');
  } catch (e) {
    throw Error(e);
  }
};
