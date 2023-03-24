const Web3 = require('web3');
const erc20Abi = require('../abis/erc20Abi');
const erc721Abi = require('../abis/erc721Abi');
const {User, Nft} = require('../models');
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20Abi, process.env.ERC20_CA);
const erc721Contract = new web3.eth.Contract(erc721Abi, process.env.ERC721_CA);

exports.minting_post = async (req, res, next) => {
  try {
    // 1. 프론트에서 nft 데이터 받아오기
    const {name, description, tokenurl} = req.body;
    // 2. 프론트의 쿠키를 받아 session에서 user 정보 받아오기기
    const userInfoBySession = JSON.parse(req.session.user);
    console.log('NFT NAME: ', name);

    // 3. web3를 이용하여 nft 민팅 함수 실행

    const setToken_In = await erc721Contract.methods
      .setToken(process.env.ERC20_CA)
      .send({from: process.env.SERVER_ADDRESS, gas: 100000});
    console.log('setToken_In: ', setToken_In);
    if (setToken_In) {
      const tokenNumber = await erc721Contract.methods
        .mintNFT(userInfoBySession.address, tokenurl, name, description)
        .send({from: process.env.SERVER_ADDRESS, gas: '5000000'})
        .on('receipt', function (receipt) {
          console.log('receipt');
        });
      console.log('제대로 발행 되었습니다. : ', tokenNumber);
      if (tokenNumber) {
        console.log(userInfoBySession.address);
        console.log(userInfoBySession.nickname);

        const token_id = await erc721Contract.methods.getTotalSupply().call();

        // 4. DB의 nft 테이블에 저장

        const result = await Nft.create({
          user_id: userInfoBySession.id,
          token_id: token_id,
          name,
          description,
          tokenurl,
        });

        res.status(200).send({message: 'nft 발행 성공', data: result});
      }
    }
  } catch (e) {
    throw Error(e);
  }
};
