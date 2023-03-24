import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
const ModalImageBackground = styled.div`
    position: fixed;
    margin-left: 30px;
    top: 35%;
    left: 0;
    width: 420px;
    height 420px;
    background-color: white;
    z-index: 2;
    border-radius: 10%;
    align-items: center;
    
`;
const ModalImage = styled.img`
    position: relative;
    margin-left:10px;
    margin-top:10px;
    width: 400px;
    height 400px;
    background-color: gray;
    z-index: 2;
    border-radius: 10%;
`;
const ModalBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: white;
  border: 1px solid black;
  padding: 20px;
  z-index: 1;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 450px;
`;
const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width 100%;
    height 50%;
    background-color: black;
    opacity: 0.4;
`;
const CloseButton = styled.div`
  font-size: 30px;
  text-align: right;
`;
const Name = styled.div`
  font-size: 50px;
  margin-bottom: 10px;
`;
const Desc = styled.div`
  font-size: 20px;
  margin-top: 20px;
`;
function Modal({modalData, setModalVisible}) {
  return (
    <div>
      <ModalBackground onClick={() => setModalVisible(false)} />
      <ModalImageBackground>
        <ModalImage alt="modal_image" src={modalData.image_url} />
      </ModalImageBackground>
      <ModalBox className="modal">
        <CloseButton onClick={() => setModalVisible(false)}>
          <FontAwesomeIcon icon={faClose} />
        </CloseButton>
        <ModalContent className="modal-content">
          <Name>
            {!modalData.title ? (
              <span style={{margin: 15}}>
                {modalData.name}
                <FontAwesomeIcon icon={faCheckCircle} style={{color: '#2081E2'}} />
              </span>
            ) : (
              <div>
                Congratulations! 🎉
                <br /> You have successfully minted {modalData.title} NFT.
              </div>
            )}

            <FontAwesomeIcon icon="check-square" />
          </Name>
          <Desc>
            {modalData.current_price && <div>{modalData.current_price} ETH</div>}
            {modalData.description}
          </Desc>
        </ModalContent>
      </ModalBox>
    </div>
  );
}

export default Modal;
