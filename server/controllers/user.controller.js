const { User } = require("../models");
const Web3 = require("web3");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.join_post = async (req, res, next) => {
  try {
    // 1. front에서 데이터 받아오기
    const { nickname, password } = req.body;
    // 2. db에 같은 nickname 있는지 확인.없으면 계속 진행
    const exists = await User.findOne({
      attributes: ["nickname"],
      where: {
        nickname,
      },
    });
    console.log("여기요", exists);
    // 2-1.  있으면 종료
    if (exists) {
      return res.status(400).send("동일한 nickname이 이미 존재합니다.");
    }
    // 2-2. 없으면 계속 진행
    // 3. web3 사용해 가나슈 네트워크에 접속 후, 사용자의 비번을 이용한 지갑 생성
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8555")
    ); // 본인 가나슈 주소
    const address = await web3.eth.personal.newAccount(password);
    console.log(address);
    // 4. 비밀번호를 해싱
    const newpassword = await bcrypt.hash(password, saltRounds);
    console.log(newpassword);

    // 5. nickname, 해싱한 비번 newpassword, address db에 저장
    const result = await User.create({
      nickname,
      password: newpassword,
      address,
      eth_amount: 0,
    });
    // 6. 프론트에 성공적으로 회원가입이 완료되었음을 알림
    res
      .status(200)
      .send(
        `회원가입을 성공했습니다, nickname :${nickname}, password :${newpassword} address :${address}`
      );

    // const user = await User.findAll({
    //   attributes: ["nickname"],
    //   where: {
    //     nickname,
    //   },
    // });
  } catch (e) {
    throw Error(e);
  }
};

exports.login_post = async (req, res, next) => {
  try {
    // 1. front에서 데이터 받아오기
    const { nickname, password } = req.body;
    // 2-1. db에서 nickname이 일치하는 user가 있는지 확인
    const nicknameMatch = await User.findOne({
      where: {
        nickname,
      },
    });
    // 2-2. nickname이 일치하는 계정이 있다면, 사용자가 입력한 비번과 해싱한 비번이 매치하는지 확인
    if (nicknameMatch) {
      const match = await bcrypt.compare(
        password,
        nicknameMatch.dataValues.password
      );
      // 2-3. 비밀번호도 일치한다면, 로그인 성공을 프론트에 보내줌
      if (match) {
        req.session.loggedIn = true;
        req.session.user = JSON.stringify(nicknameMatch.dataValues);
        console.log(req.session);
        return res
          .status(200)
          .send(`로그인 성공 ! : ${JSON.stringify(nicknameMatch.dataValues)}`);
      } else {
        // 비밀번호만 일치하지 않는다면, "비밀번호를 확인하세요" 프론트에 보내줌
        return res.status(400).send("비밀번호를 확인하세요");
      }

      // 3. nickname이 일치하는 계정이 없다면 "닉네임을 확인하세요" 프론트에 보내줌
    } else {
      return res.status(400).send("닉네임을 확인하세요");
    }
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
