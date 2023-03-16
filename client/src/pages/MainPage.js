import styled from 'styled-components';
import {motion} from 'framer-motion';
// import {useState, useEffect} from 'react';
import {Col} from '../styles';

const WelcomeWords = styled.div`
  // background-color: #00214d;
  // background-color: #202020;
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

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
  margin-right: 30px;
`;

const Wallpaper = styled.div`
  width: 100%;
  height: 1000px;
  padding: 30px;
  font-color: white;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 40px;
`;
function MainPage() {
  return (
    <Container>
      <Wallpaper>
        <WelcomeWords>
          <span>Write posts, get incentive!</span>
        </WelcomeWords>
        <ImageContainer />
      </Wallpaper>
    </Container>
  );
}

export default MainPage;
