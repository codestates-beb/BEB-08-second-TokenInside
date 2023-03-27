import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Post} from './MainPage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  width: 100%;
  padding: 30px;
  height: 300px;
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 25px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 20px;
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: ${props => (props.active ? '#0070f3' : '#666')};
  border-bottom: ${props => (props.active ? '2px solid #0070f3' : '2px solid transparent')};
  font-size: 40px;
  font-weight: 600;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200%;
  padding: 30px;
`;

const PostMypage = styled(Post)`
  font-size: 30px;
  font-weight: 600;
  border: 1px solid black;
`;

const NftContainer = styled.div`
  display: flex;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 600px;
  width: 800px;
`;

const DepositContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  margin: 20px 20px;
  border: 3px solid black;
  border-radius: 5px;
  padding: 30px 30px;
`;

const CardContainer = styled.div`
  display: flex;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: row;

  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Input = styled.input`
  margin-top: 20px;
  width: 600px;
  height: 50px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: white;
  border: 3px solid black;
`;

const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  height: 50px;
  font-size: 25px;
`;

function App() {
  const [activeTab, setActiveTab] = useState('nft');
  const [isLoading, setIsLoading] = useState(false);
  const [myToken, setMyToken] = useState(0);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');

  const [nftInfo, setNftInfo] = useState([]);
  const handleTabClick = tabName => {
    setActiveTab(tabName);
  };
  useEffect(() => {
    axios
      .get('http://localhost:5500/user/mypage', {withCredentials: true})
      .then(response => {
        console.log('data: ', response.data);
        console.log('myToken amount: ', response.data.data.user.token_amount);
        setMyToken(response.data.data.user.token_amount);
        console.log('posts: ', response.data.data.posts);
        setPosts([...response.data.data.posts]);
        setNftInfo([...response.data.data.nfts]);
        setUser(response.data.data.user);
        console.log(response.data.data.user);
      })
      .then(() => console.log('NFT', user))
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:5500/user/transfer',
        {account, amount},
        {
          withCredentials: true,
        },
      )
      .then(response => {
        setMyToken(response.data.data);
        setAmount('');
        setAccount('');

        alert('계좌에 토큰 전송이 성공했습니다.');
      });
  };

  return (
    <Container>
      <TopSection>
        {isLoading ? (
          <div>loading....</div>
        ) : (
          <TopInfo>
            <InfoItem>
              <div style={{marginBottom: '30px', fontSize: '40px'}}>닉네임</div>
              <div>{user.nickname}</div>
            </InfoItem>
            <InfoItem>
              <div style={{marginBottom: '30px', fontSize: '40px'}}>지갑 주소</div>
              <div>{user.address}</div>
            </InfoItem>
            <InfoItem>
              <div style={{marginBottom: '30px', fontSize: '40px'}}>보유 TKI</div>
              <div>{myToken}</div>
            </InfoItem>
          </TopInfo>
        )}
      </TopSection>
      <MiddleSection>
        <TabContainer>
          <Tab active={activeTab === 'nft'} onClick={() => handleTabClick('nft')}>
            나의 NFT
          </Tab>
          <Tab active={activeTab === 'posts'} onClick={() => handleTabClick('posts')}>
            내가 쓴 글
          </Tab>
          <Tab active={activeTab === 'deposit'} onClick={() => handleTabClick('deposit')}>
            송금하기
          </Tab>
        </TabContainer>
        {activeTab === 'nft' && <div>{/* code for my NFT tab */}</div>}
        {activeTab === 'posts' && <div>{/* code for my posts tab */}</div>}
        {activeTab === 'deposit' && <div>{/* code for deposit/withdrawal tab */}</div>}
      </MiddleSection>
      <BottomSection>
        {isLoading ? (
          <div>Loading...</div>
        ) : activeTab == 'nft' ? (
          <NftContainer>
            <CardContainer>
              {nftInfo?.map((item, idx) => (
                <Card>
                  <CardImage src={item.tokenurl} />
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </Card>
              ))}
            </CardContainer>
          </NftContainer>
        ) : activeTab == 'posts' ? (
          <PostContainer>
            {posts &&
              posts.map((item, idx) => (
                <Link to={`/detail/${item.id}`}>
                  <PostMypage key={item.id}>
                    #{item.id} {item.created_at.slice(0, 16)}
                    <div>작성자: {item.user_id}</div>
                    <div>제목: {item.title}</div>
                    <div>내용: {item.content}</div>
                  </PostMypage>
                </Link>
              ))}
          </PostContainer>
        ) : activeTab == 'deposit' ? (
          <DepositContainer>
            <div style={{fontSize: '35px'}}>전송 가능 토큰 : {myToken}</div>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="보내실 금액"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <Input
                type="text"
                placeholder="보내실 주소"
                value={account}
                onChange={e => setAccount(e.target.value)}
              />

              <Button type="submit">전송</Button>
            </Form>
          </DepositContainer>
        ) : null}
      </BottomSection>
    </Container>
  );
}

export default App;
