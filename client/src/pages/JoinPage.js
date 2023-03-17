import styled from 'styled-components';
import React, {useState} from 'react';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = event => {
    const {name, value} = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
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

  const handleConfirmPasswordChange = event => {
    const confirmPassword = event.target.value;
    //const password = formData.password;
    const password = event.target.form.password.value;
    console.log('password', password);
    console.log('confirmPassword', confirmPassword);
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      console.log('if');
    } else {
      setPasswordError('');
      console.log('else');
    }
  };

  return (
    <FormWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          <InputLabel>이름</InputLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>비밀번호</InputLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </InputContainer>
        <InputLabel>비밀번호 확인</InputLabel>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호를 똑같이 입력하세요."
          value={formData.confirmPassword}
          onChange={handleInputChange}
          onKeyUp={handleConfirmPasswordChange} // 비밀번호 입력 후 일치 여부 확인
          required
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        <SubmitButton type="submit" disabled={passwordError}>
          Sign Up
        </SubmitButton>
      </FormContainer>
    </FormWrapper>
  );
}

export default JoinPage;
