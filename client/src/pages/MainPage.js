import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import {Col} from '../styles';
import {Link, useNavigate} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {data} from '../data';
const WriteBox = styled.div`
  margin-top: 50px;
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 40px;
  :span(:first-child) {
    font-size: 25px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.div`
  font-size: 60px;
  margin-left: 20px;
  margin-right: 20px;
  font-weight: 600;
`;

const WriteBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  font-size: 20px;
  color: white;
  border-radius: 9px;
  background: ${props => props.theme.colors.primary2};
  :hover {
    cursor: pointer;
  }
`;
const Post = styled.div`
  border: 1px solid skyblue;
  margin: 15px;
  padding: 8px;
  :hover {
    cursor: pointer;
  }
`;
function MainPage() {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(1);
  const [post, SetPost] = useState(data.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    if (post.length < 200) {
      setTimeout(() => {
        setOffset(offset + 1);
        SetPost([...post, ...data.slice(offset * 20, (offset + 1) * 20)]);
      }, 1100);
    } else {
      setHasMore(false);
    }
  };
  const handleClick = id => {
    navigate(`/detail/${id}`);
  };
  return (
    <Container>
      <WriteBox>
        <Link to="/write">
          <WriteBtn>Write posts, get incentive!</WriteBtn>
        </Link>
      </WriteBox>
      <InfiniteScroll
        dataLength={post.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>로딩중~</p>}
        endMessage={<p></p>}
      >
        {post &&
          post.map((item, index) => {
            return (
              <Post key={index} onClick={() => handleClick(item.id)}>
                #{item.id} {item.created_at}
                <div>작성자: {item.user_id}</div>
                <div>제목: {item.title}</div>
                <div>내용: {item.content}</div>
              </Post>
            );
          })}
      </InfiniteScroll>
    </Container>
  );
}

export default MainPage;
