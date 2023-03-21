import styled from 'styled-components';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../store';
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 5px;
  width: ${props => props.width || '100%'};
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SubmitButton = styled.button`
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex: 1;
`;
const BlackBox = styled.div`
  display: flex;
  flex: 1;
  background: linear-gradient(black, white);
  height: 100px;
`;

const SidebarCol = styled.div`
  // position: sticky;
  // top: 100px;
  font-weight: 600;
  font-size: 18px;
  // height: 100%;
`;

const ColTitle = styled.div`
  font-size: 65px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const ColLists = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
  height: 250px;
`;

const NftBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10%;
  box-shadow: 2px 3px 15px -5px;

  justify-contents: center;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const NftImg = styled.img`
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 400px;
  border-radius: 10%;
  border: 3px solid white;
`;

const NftName = styled.div`
  font-size: 30px;
  font-weight: 600;
  height: 50px;
  text-align: center;

  overflow: hidden;
  width: 100%;
`;

const NftOwner = styled.div`
  font-size: 20px;
  opacity: 0.8;
  text-align: center;
  background-color: white;
`;

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleInputChange = event => {
    const {name, value} = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePasswordChange = event => {
    const password = event.target.value;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      );
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/user/login', formData)
      .then(response => {
        console.log(response.data); // Do something with the response
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleOnClick = e => {
    dispatch(login('Lettie Estrada', 'aaaabbbbcccc111122223333')); // 완료 될때 redirect하도록 변경해야함
    navigate('/');
  };
  /// 탭 관련
  const [tab, setTab] = useState(0);
  const changeTab = num => {
    setTab(num);
    // setFilteredLists(lists.slice(num * 16, (num + 1) * 16));
  };
  return (
    <FormWrapper>
      <SidebarCol>
        {' '}
        <Sidebar>
          <Menu>
            {/* <SubMenu label="NFT Collections"> */}
            <MenuItem onClick={() => changeTab(0)}> Drawing & Painting </MenuItem>
            <MenuItem onClick={() => changeTab(1)}> Gaming Art </MenuItem>
            <MenuItem onClick={() => changeTab(2)}> Digital Art </MenuItem>
            {/* </SubMenu> */}
          </Menu>
        </Sidebar>
      </SidebarCol>
    </FormWrapper>
  );
}
export default MyPage;
