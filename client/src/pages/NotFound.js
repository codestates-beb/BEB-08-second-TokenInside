import styled from 'styled-components';
import {faFaceFrown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Container = styled.body`
  display: flex;
  flex-direction: column;
  // position: relative;
  // width: 100%;
  // height: 100%;
`;

const Box = styled.div`
  position: absolute;
  // top: 50%;
  left: 50%;
  margin: 150px 0 0 -150px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
`;

const Image = styled.div``;

const Text = styled.div`
  margin-top: 20px;
  font-size: 80px;
  font-weight: 700;
`;

function NotFound() {
  return (
    <Container>
      <Box>
        <Image>
          <FontAwesomeIcon icon={faFaceFrown} color="rgba(0,0,0,1)" fontSize="300px" />
        </Image>
        <Text>404</Text>
        <Text style={{fontSize: '40px'}}>Page Not Found</Text>
      </Box>
    </Container>
  );
}

export default NotFound;
