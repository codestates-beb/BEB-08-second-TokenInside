const Web3 = require('web3');
const {User} = require('../models');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const erc20abi = require('./erc20Abi');
const erc721abi = require('./erc721Abi');
const erc20Contract = new web3.eth.Contract(erc20abi, '0x719Da13eC5F3ABfbF827DeF26De519BF0ad6efAe');
const erc721Contract = new web3.eth.Contract(
  erc721abi,
  '0xE961F7B10f6ab0A78beaE6eF1cC272625BfD8a84',
);
const main_addr = '0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566';
const sub1_addr = '0x74F25D84178175e58a10E15B921658898041643b';
const sub2_addr = '0x922ffe88C3248b49dCe5d81Ff018Fd767c141c28';
const tokenURL = 'https://ipfs.io/ipfs/QmdZB1QnQyLMiq7fFvzV8ier9znr8n9XfQSyH6oVjc9UQn';

exports.minting_post = async (req, res, next) => {
  try {
    console.log('req', req);
    //프론트에서 받아오기
    const {name, description, tokenurl} = req.body;
    //세션 정보
    const userInfoBySession = JSON.parse(req.session.user);
    //setToken하고 mintNFT
    const setToken_In = await erc721Contract.methods
      .setToken('0x719Da13eC5F3ABfbF827DeF26De519BF0ad6efAe')
      .send({from: main_addr, gas: 100000});
    if (setToken_In) {
      const tokenNumber = await erc721Contract.methods
        .mintNFT(sub1_addr, tokenurl, 'hi2', '예외적으로')
        .send({from: main_addr, gas: '5000000'})
        .on('receipt', function (receipt) {
          console.log('receipt');
        });
      console.log('제대로 발행 되었습니다. : ', tokenNumber);
      if (tokenNumber) {
        await erc20Contract.methods
          .transfer(main_addr, 100)
          .send({from: sub1_addr})
          .on('receipt', function (recipt) {
            console.log('ERC20토큰 전송!!!!!!');
          });
        const token_id = await erc721Contract.methods.getTotalSupply().call();

        const result = Nft.create({
          user_id: userInfoBySession.id,
          token_id: token_id,
          name,
          description,
          tokenurl,
        });

        const token_amount = await erc20Contract.methods
          .balanceOf(userInfoBySession.address)
          .call();

        User.update(
          {
            token_amount: token_amount,
          },
          {
            where: {id: userInfoBySession.id},
          },
        );
      }
    }

    // const user = await User.findOne({
    //   where: {id: userInfoBySession.id},
    // });

    res.status(200).send('hello world');
  } catch (e) {
    throw Error(e);
  }
};

exports.market_get = async (req, res, next) => {
  try {
    // const accounts = await web3.eth.getAccounts();
    // const recipient = accounts[1];
    const main_P = await erc20Contract.methods.balanceOf(main_addr).call();
    const total = await erc20Contract.methods.balanceOf(sub1_addr).call();
    const total2 = await erc20Contract.methods.balanceOf(sub2_addr).call();

    // const setToken_In = await erc721Contract.methods.setToken('0x719Da13eC5F3ABfbF827DeF26De519BF0ad6efAe').send({from:main_addr,gas:100000});
    // if(setToken_In){
    // const tokenNumber = await erc721Contract.methods.mintNFT(sub1_addr,'https://ipfs.io/ipfs/QmdZB1QnQyLMiq7fFvzV8ier9znr8n9XfQSyH6oVjc9UQn','hi2','예외적으로')
    //   .send({from:'0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566',gas: '5000000'})
    //   .on('receipt', function(receipt){console.log('receipt')});
    //   console.log("제대로 발행 되었습니다. : ",tokenNumber);
    //   if(tokenNumber){
    //     await erc20Contract.methods.transfer(main_addr,100).send({from:sub1_addr}).on('receipt', function(recipt){
    //       console.log('ERC20토큰 전송!!!!!!')
    //     });
    //   }
    // }

    // const nonce = await web3.eth.getTransactionCount('0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566', 'latest');

    // console.log("nonce 값입니다!!!!!!!!!1 : ",nonce)

    // const tx = {
    //   from: '0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566',
    //   to: '0x0E84F25dAeAeC859bF519A78d4008913151797A4',
    //   nonce: nonce,
    //   gas: 500000,
    //   data: erc721Contract.methods.mintNFT('0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566',tokenURL).encodeABI(),
    // };

    // await web3.eth.sendTransaction(tx).then((trs)=>{
    //   console.log(trs.blockNumber);
    // })

    // const amount = web3.utils.toWei('1','ether');
    // const fromAddress = '0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566'
    // const toAddress = '0x74F25D84178175e58a10E15B921658898041643b'
    // const toAddress2 = '0x922ffe88C3248b49dCe5d81Ff018Fd767c141c28'
    // const setToken = await erc721Contract.methods.setToken('0x84B2d30019aF882410AA8C1Fb9F48022B9Bdc142');
    //   let tokenNumber = await erc721Contract.methods.mintNFT('0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566','https://ipfs.io/ipfs/QmdZB1QnQyLMiq7fFvzV8ier9znr8n9XfQSyH6oVjc9UQn')
    //   .send({from:'0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566',gas: '5000000'})
    //   .on('receipt', function(receipt){console.log('receipt')});
    //   console.log("제대로 발행 되었습니다. : ",tokenNumber);
    //   await erc20Contract.methods.transfer(toAddress,100).send({from:'0xa966996188a2259f4Fd0E413aa0082eEd2Ef3566'}).on('receipt', function(recipt){
    //   console.log('ERC20토큰 전송!!!!!!')
    // });

    // reErc20Contract.methods.approve(toAddress2,10000).send({from:fromAddress, gas: 100000}).on('receipt', function(recipt){
    //   console.log('ERC20토큰 권한 허용approve!!!!!')
    // })

    // if(result){
    //   erc20Contract.methods.transferFrom(toAddress,fromAddress,100).send({from:fromAddress, gas: 100000}).on('receipt', function(recipt){
    //     console.log('ERC20토큰 개인간의 전송!!!!')
    //   }).on('error',console.error);
    // }

    // console.log("계정이야!!!!!!!!",total);
    res
      .status(200)
      .send(
        `hello world re:${recipient}, 서버 주소 : ${main_P} 첫번째 주소 :${total} 두번째 주소 :${total2}`,
      );
  } catch (e) {
    throw Error(e);
  }
};
