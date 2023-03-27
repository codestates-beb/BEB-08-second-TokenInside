<picture>![header](https://capsule-render.vercel.app/api?type=waving&color=b9e0f0&height=200&animation=fadeIn&section=header&text=TokenInside&fontSize=90)</picture>
<br>

<hr/>

<h3>Stacks</h3>

<h4>Front-End :
 <a href="#"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"></a> 
 <a href="#"><img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/></a> 
  </h4>
 
<h4>Back-End : 
<a href="#"><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"></a>
 <a href="#"><img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"></a>
 <a href="#"><img src="https://img.shields.io/badge/Web3.js-F16822?style=for-the-badge&logo=Web3.js&logoColor=white"></a>
   </h4>
   
<h4>Smart Contracts : 
<a href="#"><img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=Solidity&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white"></a> 
 <a href="#"><img src="https://img.shields.io/badge/Remix-000000?style=for-the-badge&logo=Remix&logoColor=white"></a> 
</h4>
   
<hr/>

<h3>Team Notion</h3>
<a href="https://www.notion.so/2-75705eb4c03f4dcc91c497724cc5c3ca" target="_blank">
<img src="https://simpleicons.org/icons/notion.svg" width=100 height=100></a>



# Web3 Incentivized Community Project

Web3 커뮤니티 활동을 하면 토큰을 주는 형식으로 프로젝트.  

게시글을 작성하면 ERC-20 토큰 TKI를 받으며, 이 토큰을 활용해 NFT를 민팅 할 수 있고 토큰을 타인에게 전송도 가능합니다.


<h3> Team members </h3>
<table>
 <tr>
  <td align='center'>이름</td>
  <td align='center'>역할</td>
  <td align='center'>GitHub</td>

 </tr>
 
 <tr>
  <td align='center'>김영주</td>
  <td align='center'>Team Leader, Back-end , Smart Contract</td>
  <td align='center'><a href="https://github.com/DreamBoysYJ">DreamBoysYJ</a></td>

 </tr>   
 
 <tr>
  <td align='center'>김지환</td>
  <td align='center'>Design, Front-end, Smart Contract</td>
  <td align='center'><a href="https://github.com/jihwankim255">jihwankim255</a></td>

 </tr>

  <tr>
  <td align='center'>김상우</td>
  <td align='center'>Back-end</td>
  <td align='center'><a href="https://github.com/keepgoing2021">keepgoing2021</a></td>

 </tr>
 
  <tr>
  <td align='center'>서학용</td>
  <td align='center'>Front-end, Smart Contract</td>
  <td align='center'><a href="https://github.com/shypang">shypang</a></td>

 </tr>
  
 <tr>
  <td align='center'>이태훈</td>
  <td align='center'>Back-end, Smart Contract</td>
  <td align='center'><a href="https://github.com/bloud411">bloud411</a></td>

 </tr>
</table>

# Diagram
<h3>Flow chart</h3>

<img width="1392" alt="스크린샷 2023-03-24 오후 1 36 29" src="https://user-images.githubusercontent.com/89294486/227430385-d62165dc-26e8-4a9a-a78f-387419997441.png">

<h3>DB Schema</h3>

<img width="1392" alt="스크린샷 2023-03-24 오후 1 36 29" src="https://user-images.githubusercontent.com/89343745/227846942-693248d9-2978-42fb-b913-10f8b9b925d4.png">




#  Functions
<h3>Header</h3>

<img width="1392" alt="스크린샷 2023-03-24 오후 1 36 29" src="https://user-images.githubusercontent.com/89294486/227426246-b0add5fb-f15f-4e28-9304-ffb74237a773.png">

- Logo : 홈 페이지으로 이동합니다.
- Mint NFT : NFT 민팅 페이지로 이동합니다.
- Write : 게시글 작성 페이지로 이동합니다.
- ETH Faucet : 0.1ETH를 지급 받습니다.
- Mypage : 마이 페이지로 이동합니다.
- Logout : 로그아웃 됩니다.

<img width="80%" src="https://user-images.githubusercontent.com/89343745/227840820-a636e2f9-bae6-4fc4-a5e0-72e2fe8b4d36.png">

로그아웃 시
- Login : 로그인 페이지로 이동합니다.
- 회원가입 : 회원가입 페이지로 이동합니다.

<hr/>

<h3>Home Page</h3>

<img width="80%" src="https://user-images.githubusercontent.com/89343745/227840297-53681ae5-d4b3-4486-8998-8a9dca41c85a.gif">

- Infinite Scroll 구현
- 게시글을 위부터 생성된 시간이 빠른 순으로 확인할 수 있습니다.

<hr/>

<h3>Join Page</h3>

<img width="50%" src="https://user-images.githubusercontent.com/89343745/227841380-e83d3774-1eca-424b-aea4-30ebff38a655.gif">

- 비밀번호 : 8자 이상 대문자, 특수문자가 포함되어야만 합니다.
- DB에 동일한 닉네임이 없고, 비밀번호가 일치한다면 DB에 정보를 저장합니다.
- bcrypt: 원본이 아닌 해싱한 비밀번호를 DB에 저장합니다.
- 사용자의 비밀번호를 통해 web3로 지갑을 생성하고 DB에 저장합니다.
- 회원가입에 성공할시 알림 메시지를 띄우고, 로그인 페이지로 이동합니다.

<hr/>

<h3>Login Page</h3>

<img width="50%" src="https://user-images.githubusercontent.com/89343745/227842171-1d1e44fc-3c0a-4b18-b280-3739c227aafc.gif">

- DB에서 동일한 닉네임을 찾습니다.
- 입력한 비밀번호를 bcrypt를 이용해 DB의 해싱한 비밀번호와 비교합니다.
- 입력한 정보가 맞다면 로그인하고, 홈페이지로 이동합니다.

<hr/>

<h3>ETH Faucet</h3>

<img width="50%" src="https://user-images.githubusercontent.com/89343745/227842662-9083cb38-36f8-49a6-b8c7-9ae3c30a31f0.gif">

- 서버 계정인 가나슈 0번째 계정에서 0.1ETH를 로그인한 사용자에 전송합니다.
- DB에서 user 정보를 업데이트 합니다.(eth_amount 0.1 증가)

<hr/>

<h3>Write Page</h3>

<img width="50%" src="https://user-images.githubusercontent.com/89343745/227843046-fd72636f-1467-47fd-ac46-7026dcf4a7cb.gif">

- 게시글 작성시 ERC-20 토큰 1개를 사용자 주소로 지급합니다.
- DB에 post, user 정보를 업데이트 합니다. (post 생성 / user 토큰 증가)
- 작성에 성공하면 홈페이지에서 해당 글을 확인할 수 있습니다.

<hr/>

<h3>Detail Page</h3>

<img width="40%" src="https://user-images.githubusercontent.com/89343745/227843587-1fb24cb5-6ae4-4692-9b43-202ddd5050c5.png">

- 홈페이지에서 게시글들을 불러올 때 DB에서 post의 모든 정보를 불러옵니다.
- 그 중 post의 id를 props로 전달하고, 클릭시 params에 해당 id를 전달해 검색합니다.

<hr/>

<h3>NFT Mint Page</h3>

<img width="40%" src="https://user-images.githubusercontent.com/89343745/227844371-607a89d4-2c49-4757-85e1-a101e2398886.png">

- 로컬 컴퓨터에서 이미지를 불러옵니다.
- 해당 이미지는 ipfs에 업로드되고, ipfs url을 전달받아 서버에 전달합니다.
- 블록체인 네트워크(가나슈)에 트랜잭션을 실행하고, DB에서 nft를 저장합니다.

<hr/>

<h3>My Page</h3>

Top Section : 로그인한 user의 정보를 확인합니다.

<img width="40%" src="https://user-images.githubusercontent.com/89343745/227845004-a016f485-9e26-4917-a72f-5a4bd4d61643.png">

- 나의 nft : 내가 민팅한 nft들을 확인합니다.

<hr/>

Middle Section

- 나의 nft : 내가 민팅한 nft들을 확인합니다.

- 내가 쓴 글 : 내가 작성한 게시글들을 확인합니다.

<img width="40%" src="https://user-images.githubusercontent.com/89343745/227845382-bab2b5ac-3b83-43dc-91a3-04240136dbce.png">

<hr/>

- 송금 : 글쓰기 보상으로 획득한 ERC-20 토큰을 다른 주소로 송금할 수 있습니다.

<img width="40%" src="https://user-images.githubusercontent.com/89343745/227845706-7534c80a-e57f-469b-88b4-c4963630d709.gif">


