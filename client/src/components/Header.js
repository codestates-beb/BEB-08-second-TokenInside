import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoins, faSearch} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store';
import axios from 'axios';
import {useState} from 'react';
const Head = styled.div`
  z-index: 5;
  width: 100%;
  padding: 0px 40px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  font-size: 25px;
  margin-left: 15px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const LogoIcon = styled(Logo)`
  margin-left: 0px;
`;
const Icon = styled.span`
  margin-left: 25px;
  font-size: 25px;
  :hover {
    cursor: pointer;
  }
`;
const Search = styled.div`
  background-color: #eae9ed;
  display: flex;
  border-radius: 10px;
  margin-left: 25px;
  width: 400px;
  height: 30px;
  justify-content: space-between;
  align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const Nav = styled.nav``;

const Menu = styled(Icon)`
  font-size: 15px;
  font-weight: 600;

  :hover {
    cursor: pointer;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 5px 10px;
  ::placeholder {
    align-content: center;
    padding-left: 10px;
    font-size: 13px;
  }
`;

const Btn = styled.div`
  margin-right: 10px;
  background-color: #87ceeb;
  font-weight: 600;
  font-size: 15px;
  color: white;
  padding: 15px 15px;
  border-radius: 9px;
  :hover {
    cursor: pointer;
  }
`;
const Info = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 10em;
`;
function Header({
  isLoggedIn,
  setIsLoggedIn,
  user,
  setUser,
  address,
  setAddress,
  searchInput,
  setSearchInput,
}) {
  // const isLoggedIn = useSelector(state => state.isLoggedIn);
  // const user = useSelector(state => state.user);
  // const address = useSelector(state => state.address);

  // const dispatch = useDispatch();
  const showState = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      console.log(cookies);
      if (cookies[i].trim().startsWith('connect.sid=')) {
        console.log('header get cookie: ', cookies[i].trim().substring(12));
      } else {
        console.log('no');
      }
    }
  };
  async function postFaucet() {
    axios
      .post('http://localhost:5500/user/faucet', null, {withCredentials: true})
      .then(response => {
        console.log(response.data); // Do something with the response
        alert(`ETH 받기 성공 ! 보유 ETH: ${response.data.data}`);
      })
      .catch(error => {
        console.error(error);
      });
  }
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('address');
    setIsLoggedIn(localStorage.getItem('isLoggedIn'));
    setUser(localStorage.getItem('user'));
    setAddress(localStorage.getItem('address'));

    // DB의 세션에서 user 정보 삭제
    axios
      .get('http://localhost:5500/logout', {withCredentials: true})
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.va);
  };

  return (
    <Head className="header">
      <Wrapper>
        <Column>
          <Link to="/">
            <LogoIcon>
              <FontAwesomeIcon
                icon={faCoins}
                color={props => props.theme.colors.primary}
                fontSize="45px"
              />
            </LogoIcon>
          </Link>
          <Link to="">
            <Logo onClick={showState}>TOKENINSIDE</Logo>
          </Link>

          <Search>
            <SearchBox>
              <SearchBar
                placeholder="Search post.."
                type="text"
                onChange={handleChange}
                value={searchInput}
              />
            </SearchBox>
            <SearchBox margin-right="10px">
              <FontAwesomeIcon icon={faSearch} fontSize="15px" margin-right="10px" color="black" />
            </SearchBox>
          </Search>
          <Nav>
            <Link to="/mint">
              <Menu>Mint NFT</Menu>
            </Link>

            <Link to="/write">
              <Menu>Write</Menu>
            </Link>

            <Menu onClick={() => postFaucet()}>ETH Faucet</Menu>
          </Nav>
        </Column>
        {isLoggedIn ? (
          <>
            계정: {user}
            <Info>주소: {address}</Info>
            <Btn>
              <Link to="/mypage">마이 페이지</Link>
            </Btn>
            <Btn onClick={() => handleLogout()}>로그아웃</Btn>
          </>
        ) : (
          <Column>
            <Btn>
              <Link to="/login">Login</Link>
            </Btn>
            <Btn>
              <Link to="/join">회원가입</Link>
            </Btn>
          </Column>
        )}
      </Wrapper>
    </Head>
  );
}

export default Header;
