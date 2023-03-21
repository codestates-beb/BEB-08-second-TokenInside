const Web3 = require('web3');
const erc20abi = require('../contracts/erc20abi');
const {User, Post} = require('../models');

exports.detail_get = async (req, res, next) => {
  try {
    res.status(200).send('hello world');
  } catch (e) {
    throw Error(e);
  }
};

// exports.register_post = async (req, res, next) => {
//   try {
//     // 1. session에서 로그인한 유저 정보, req.body에서 title, content 받아오기
//     const { id } = JSON.parse(req.session.user);
//     const { title, content } = req.body;
//     // 2.

//     // const nickname = req.session.user.nickname;

//     const user = await User.findOne({
//       where: {
//         id,
//       },
//     });
//     const incrementToken = await user.increment("eth_amount", { by: 10 });
//     // 4. 블록체인 상에서 토큰 전송
//     const web3 = new Web3(
//       new Web3.providers.HttpProvider("http://127.0.0.1:8555")
//     );

//     const contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
//     const result = await contract.methods
//       .transfer(user.address, 10)
//       .send({ from: process.env.SERVER_ADDRESS });
//     console.log("성공했습니다");

//     res.status(200).send(JSON.stringify(user));
//   } catch (e) {
//     throw Error(e);
//   }
// };

// 새 글 등록하기
exports.register_post = async (req, res, next) => {
  try {
    //1. 프론트에서 title , content 받아오기

    const title = req.body.title;
    const content = req.body.content;
    console.log('title, content :', title, content);

    //2. 세션을 이용해서 글쓴이 , 유저 알아내기
    const {id} = JSON.parse(req.session.user);
    console.log('user :', id);
    //3. DB에 저장하기
    const result = await Post.create({
      user_id: id,
      title: title,
      content: content,
    });

    // const post = await Post.findOne({
    //   where: {
    //     user_id: id,
    //   },
    // });
    console.log('result', result);
    //4. 프론트에 성공했다고 알려주기
    return res.status(200).send('글 등록 성공');

    // const post = new Post({
    //   title: req.body.title,
    //   content: req.body.content,
    //   author: req.body.author,
    //   date: new Date(),
    // });
    // const createdPost = await post.save();
    // res.status(201).json({
    //   message: 'Post added successfully',
    //   user_id: createdPost._id
    // });
  } catch (error) {
    res.status(500).json({
      message: 'Creating a post failed!',
    });
  }
};
