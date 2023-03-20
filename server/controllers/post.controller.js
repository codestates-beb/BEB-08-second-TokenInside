const Web3 = require("web3");
const erc20abi = require("../contracts/erc20abi");
const { User } = require("../models");

exports.detail_get = async (req, res, next) => {
  try {
    res.status(200).send("hello world");
  } catch (e) {
    throw Error(e);
  }
};

exports.register_post = async (req, res, next) => {
  try {
    // 1. session에서 로그인한 유저 정보, req.body에서 title, content 받아오기
    const { id } = JSON.parse(req.session.user);
    const { title, content } = req.body;
    // 2.

    // const nickname = req.session.user.nickname;

    const user = await User.findOne({
      where: {
        id,
      },
    });
    const incrementToken = await user.increment("eth_amount", { by: 10 });
    // 4. 블록체인 상에서 토큰 전송
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8555")
    );

    const contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
    const result = await contract.methods
      .transfer(user.address, 10)
      .send({ from: process.env.SERVER_ADDRESS });
    console.log("성공했습니다");

    res.status(200).send(JSON.stringify(user));
  } catch (e) {
    throw Error(e);
  }
};
