import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../store';
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {data} from '../NFTdummy';

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TabBox = styled.div``;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10%;
`;
const Tab = styled.div`
  border-radius: 3px;
  border: 1px solid gray;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px;
  :hover {
    cursor: pointer;
  }
`;

const ColLists = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 5px;
  gap: 10px;
  height: 150px;
`;
const NftBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10%;
  box-shadow: 2px 3px 15px -5px;

  justify-contents: center;
  :hover {
    transform: scale(1.01);
    cursor: pointer;
  }
`;
const NftImg = styled.img`
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
  border-radius: 10%;
  border: 3px solid white;
`;

const NftName = styled.div`
  font-size: 15px;
  font-weight: 500;
  height: 40px;
  text-align: center;
  overflow: hidden;
  width: 100%;
`;

const NftOwner = styled.div`
  font-size: 15px;
  opacity: 0.8;
  text-align: center;
  background-color: white;
`;
const MyInfo = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px;
`;
const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  height: 200px;
`;
const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;
function MyPage({user, address}) {
  const [myToken, setMyToken] = useState(0);
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  /// 탭 관련
  useEffect(() => {
    axios
      .get('http://localhost:5500/user/mypage', {withCredentials: true})
      .then(response => {
        console.log('myToken amount: ', response.data.data.user.token_amount);
        setMyToken(response.data.data.user.token_amount);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const [tab, setTab] = useState(0);
  const changeTab = num => {
    setTab(num);
    // setFilteredLists(lists.slice(num * 16, (num + 1) * 16));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('전송 시작');
    setTimeout(() => {
      alert(`${amount} 전송에 선공하였습니다!`);
    }, 2000);
  };
  return (
    <>
      <Container>
        <TabBox>
          <Tabs>
            <Tab onClick={() => changeTab(0)}>나의 NFT</Tab>
            <Tab onClick={() => changeTab(1)}>내가 쓴 글</Tab>
            <Tab onClick={() => changeTab(2)}>입출금</Tab>
          </Tabs>
          {tab === 0 && (
            <ColLists>
              {data.map(i => (
                <NftBox>
                  <NftImg src={i.image_url} />
                  <NftOwner>{i.owner}</NftOwner>
                  <NftName>{i.name}</NftName>
                </NftBox>
              ))}
            </ColLists>
          )}
          {tab === 1 && <div>내가 쓴 글</div>}
          {tab === 2 && (
            <>
              <div>토큰 입출금</div>
              <div>보유 금액 {myToken}</div>
              <Form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="보내실 금액"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />

                <Button type="submit">전송</Button>
              </Form>
            </>
          )}
        </TabBox>
        {/* <Col></Col> */}
        <MyInfo>
          나의 정보
          <div>{user}</div>
          <div>{address}</div>
          <div>나의 토큰: {myToken}</div>
        </MyInfo>
      </Container>
    </>
  );
}
export default MyPage;
