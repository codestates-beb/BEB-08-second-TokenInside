import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  background-color: white;
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

function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/', {title, content});
      alert('게시물이 작성되었습니다.');
      setTitle('');
      setContent('');
    } catch (error) {
      console.log(error);
      alert('게시물 작성에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Textarea placeholder="내용" value={content} onChange={e => setContent(e.target.value)} />
        <Button type="submit">작성</Button>
      </Form>
    </Container>
  );
}

export default WritePage;
