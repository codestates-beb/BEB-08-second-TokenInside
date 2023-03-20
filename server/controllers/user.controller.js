const { User, Post, Nft } = require("../models");
const Web3 = require("web3");
const bcrypt = require("bcrypt");
const erc20abi = require("../contracts/erc20abi");
const erc721abi = require("../contracts/erc721abi");
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
    // server에게 erc20 토큰 사용권한 주기
    const contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
    const approve = await contract.methods.approve(
      process.env.SERVER_ADDRESS,
      10000
    );
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
    // 1. front에서 데이터 받아오기
    const { to, amount } = req.body;
    // 2. cookie에서 받은 session id로 db 에서 로그인한 유저의 정보 받아오기
    // (session에는 로그인 하는 과정의 db 정보만 저장하고 있기 때문에, 로그인 후 글을 써서 토큰이 늘어나 있을 가능성 있으므로
    // db에서 찾는게 정확하다.)
    const userInfoBySession = JSON.parse(req.session.user);
    const user = await User.findOne({
      where: { id: userInfoBySession.id },
    });

    // 3-1. 보내는 유저가 db 상에서 충분한 토큰이 있다면 계속 진행
    if (user.eth_amount >= amount) {
      // 4. 블록체인 상에서 토큰 전송
      const web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:8555")
      );

      const contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
      console.log(user.address);
      //

      web3.eth.getAccounts((err, accounts) => {
        if (err) {
          console.error(err);
        } else {
          console.log(accounts); // 이더리움 노드에 등록된 모든 계정 목록을 출력합니다
        }
      });

      const unlockAccount = await web3.eth.personal.unlockAccount(
        user.address,
        "1234",
        600
      );
      console.log("unlock :", unlockAccount);
      const result = await contract.methods
        .transferFrom(user.address, to, amount)
        .send({ from: process.env.SERVER_ADDRESS });
      console.log("성공했습니다");
    } else {
      // 3-2. db 상에 토큰 부족하면 프론트에 "잔액이 부족합니다" 전송
      return res.status(400).send("토큰이 부족합니다!");
    }
  } catch (e) {
    throw Error(e);
  }
};

exports.faucet_get = async (req, res, next) => {
  try {
    // 1. session에서 user 주소 받아오기
    const { address } = JSON.parse(req.session.user);
    console.log(address);
  } catch (e) {
    throw Error(e);
  }
};

exports.mypage_get = async (req, res, next) => {
  try {
    // 1. 세션으로부터 user id 정보 받아오기
    const { id } = JSON.parse(req.session.user);
    // 2. DB에서 user 정보, post,nft 정보(user가 만든) 다 받아오기
    const user = await User.findOne({
      where: {
        id,
      },
    });
    const posts = await Post.findAll({
      where: {
        user_id: id,
      },
    });
    const nfts = await Nft.findAll({
      where: {
        user_id: id,
      },
    });

    // 3. 프론트에 보내주기
    console.log("user", user);
    console.log("posts", posts);
    console.log("nfts", nfts);
    return res.status(200).send(user, posts, nfts);
  } catch (e) {
    throw Error(e);
  }
};
