const Web3 = require('web3');
const erc20abi = require('../contracts/erc20abi');
const {User, Post} = require('../models');

exports.detail_get = async (req, res, next) => {
  try {
    //1. URL params에서 post_id 가져오기
    console.log(req.params);
    const post_id = req.params.post_id;
    console.log(post_id);
    //2. DB에서 해당 포스트 불러오기
    const post = await Post.findOne({
      where: {
        id: post_id,
      },
    });
    if (!post) {
      return res.status(404).json({
        message: '게시물을 찾을 수 없음',
      });
    }
    //3. 프론트로 post 데이터 보내주기
    res.status(200).json({
      message: '게시물을 성공적으로 가져왔습니다.',
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      message: '게시물 가져오기에 실패했습니다!',
    });
  }
};

// 새 글 등록
exports.register_post = async (req, res, next) => {
  try {
    //1. 프론트에서 title , content 받아오기
    console.log('req', req);

    const title = req.body.title;
    const content = req.body.content;
    console.log('title, content :', title, content);

    //2. 세션을 이용해서 글쓴이 , 유저 알아내기
    const {id} = JSON.parse(req.session.user);
    const user = await User.findOne({
      where: {
        id,
      },
    });
    console.log('user :', user);
    //3. DB에 post 저장하기
    const result = await Post.create({
      user_id: id,
      title: title,
      content: content,
    });
    // 4. 잘 저장 되었다면 블록체인 네트워크를 연결하고, 보상 토큰 1개 주기
    if (result) {
      const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

      const contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
      const giveToken = await contract.methods
        .transfer(user.address, 10)
        .send({from: process.env.SERVER_ADDRESS});
      if (giveToken) {
        //5. 블록체인에서 토큰을 주었다면, db의 token_amount도 1 올려주기
        const incrementToken = await user.increment('token_amount', {by: 1});
      }
    }
    //6. 프론트에 성공했다고 알려주기
    return res.status(200).send({message: '글 등록 성공!', data: result});
  } catch (error) {
    res.status(500).json({
      message: 'Creating a post failed!',
    });
  }
};
