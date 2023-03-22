import styled from 'styled-components';
import React, {useState} from 'react';
import axios from 'axios';

const FormWrapper = styled.div`
  display: flex;
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

function JoinPage() {
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleConfirmPasswordChange = event => {
    const confirmPassword = event.target.value;
    const password = event.target.form.password.value;
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleUsernameChange = event => {
    const nickname = event.target.value;
    if (!/^[A-Za-z0-9]{5,}$/.test(nickname)) {
      setUsernameError(
        'nickname must be at least 5 characters long and contain only letters and numbers',
      );
    } else {
      setUsernameError('');
    }
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
      .post('http://localhost:4000/user/join', formData)
      .then(response => {
        console.log(response.data); // Do something with the response
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <FormWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          <InputLabel>ID</InputLabel>
          <Input
            type="text"
            name="nickname"
            placeholder="아이디을 입력하세요."
            value={formData.nickname}
            onChange={handleInputChange}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Confirm Password</InputLabel>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 똑같이 입력하세요."
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onKeyUp={handleConfirmPasswordChange} // 비밀번호 입력 후 일치 여부 확인
            width="600px"
            required
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </InputContainer>
        <SubmitButton type="submit" disabled={passwordError || usernameError}>
          Sign Up
        </SubmitButton>
      </FormContainer>
    </FormWrapper>
  );
}

export default JoinPage;
