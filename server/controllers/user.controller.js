const { User } = require("../models");

exports.join_post = async (req, res, next) => {
  try {
    const { nickname, password } = req.body;
    // web3와 연결해서 지갑생성
    const result = await User.create({
      nickname,
      password,
      address: 1853,
      eth_amount: 0,
    });
    console.log("회원가입 완료");

    const user = await User.findAll({
      attributes: ["nickname"],
      where: {
        nickname,
      },
    });

    res.status(200).send(user);
  } catch (e) {
    throw Error(e);
  }
};

exports.login_post = async (req, res, next) => {
  try {
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};

exports.transfer_post = async (req, res, next) => {
  try {
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};

exports.faucet_get = async (req, res, next) => {
  try {
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};

exports.mypage_get = async (req, res, next) => {
  try {
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};
