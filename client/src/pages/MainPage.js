import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import {Col} from '../styles';
import {Link, useNavigate} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {data} from '../data';
import axios from 'axios';
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
  const [page, setPage] = useState(1);
  const [post, SetPost] = useState([]);
  const [postLoading, SetPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    // if (post.length < 200) {
    //   setOffset(offset + 1);
    //   SetPost([...post, ...data.slice(offset * 20, (offset + 1) * 20)]);
    // } else {
    //   setHasMore(false);
    // }
    if (!postLoading) {
      SetPostLoading(true);
      setTimeout(() => {
        axios
          .get('http://localhost:5500', {params: {page: page}})
          .then(response => {
            SetPost([...post, ...response.data.data]);

            if (response.data.data.length === 0) {
              setHasMore(false);
            } else {
              setPage(page + 1);
            }
            console.log('main_get: ', response.data.data); // Do something with the response
          })
          .catch(error => {
            console.error(error);
            setHasMore(false);
          });
      }, 2000);
      SetPostLoading(false);
    }
  };
  const handleClick = id => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5500', {params: {page: page}})
      .then(response => {
        SetPost([...post, ...response.data.data]);
        setPage(page + 1);
        console.log('main_get: ', response.data.data); // Do something with the response
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const test = () => {
    console.log('post: ', post);
  };

  return (
    <InfiniteScroll
      dataLength={post.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p>로딩중~</p>}
      endMessage={<p>끝났습니다</p>}
      height={741}
    >
      <Container className="aaabbbccc">
        <WriteBox>
          {/* <Link to="/write"> */}
          <WriteBtn onClick={() => test()}>Write posts, get incentive!</WriteBtn>
          {/* </Link> */}
        </WriteBox>

        {post &&
          post.map(item => {
            return (
              <Post key={item.id} onClick={() => handleClick(item.id)}>
                #{item.id} {item.created_at}
                <div>작성자: {item.user_id}</div>
                <div>제목: {item.title}</div>
                <div>내용: {item.content}</div>
              </Post>
            );
          })}
      </Container>
    </InfiniteScroll>
  );
}

export default MainPage;
