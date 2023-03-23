import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px); /* 브라우저 높이 - 300px */
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const PostContainer = styled.div`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  max-width: 800px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const PostNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const PostAuthor = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: bold;
`;

const PostDate = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: bold;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: bold;
`;

const PostContent = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function DetailPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({post: {}});
  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5500/post/detail/${id}`).then(response => {
      setData(response.data);
    });
  }, []);

  // console.log('data', data.post);
  return (
    <Container>
      <Title>게시물 조회 페이지</Title>
      <PostContainer>
        <PostHeader>
          <PostNumber>번호 : {id}</PostNumber>
        </PostHeader>
        <PostHeader>
          <PostAuthor>작성자 : {data.post.user_id}</PostAuthor>
        </PostHeader>
        <PostHeader>
          <PostDate>생성일 : {data.post.created_at}</PostDate>
        </PostHeader>
        <PostHeader>
          <PostNumber>타이틀 : {data.post.title}</PostNumber>
        </PostHeader>
        <PostHeader>
          <PostContent>본문 : {data.post.content}</PostContent>
        </PostHeader>
      </PostContainer>
      <Button onClick={() => navigate('/')}>게시글 목록</Button>
    </Container>
  );
}

export default DetailPage;
