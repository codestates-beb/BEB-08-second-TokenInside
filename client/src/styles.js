import reset from 'styled-reset';
import {createGlobalStyle} from 'styled-components';
import styled from 'styled-components';

export const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export const Col = styled.div`
  margin: 30px 100px;
  width: 80%;

  height: 2000px;
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled(Col)`
  margin-left: 300px;
  margin-bottom: 400px;
  width: 100%;
  display: flex;
  align-items: center;
`;
export const lightTheme = {
  accent: '#0095f6',
  borderColor: 'rgb(219, 219, 219)',
  bgColor: '#FAFAFA',
  fontColor: 'rgb(38, 38, 38)',
  colors: {
    primary: '#87ceeb',
  },
};
export const darkTheme = {
  accent: '#0095f6',
  borderColor: 'rgb(219, 219, 219)',
  bgColor: 'rgb(38, 38, 38)',
  fontColor: '#FAFAFA',
};

export const Row = styled.div`
  display: flex;
  padding: 50px;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 40px;
  font-size: 40px;
`;

export const RowName = styled.div`
  font-weight: 600;
  margin-bottom: 30px;
`;

export const RowPics = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  transition: transform 0.3s ease-in-out;
  gap: 10px;
  height: 250px;
`;

export const RowPic = styled.div`
  background-color: black;
`;

export const GlobalStyles = createGlobalStyle`
${reset}



input {
    all: unset;
}

* {
    box-sizing: border-box;
}

body {
    
    background-color: ${props => props.theme.bgColor};
    font-size: 14px;
    font-family:'Open Sans', sans-serif;

}


a {
    text-decoration: none;
    color: inherit;
}


`;

export const GlobalStyles2 = createGlobalStyle`
${reset}



input {
    all: unset;
}

* {
    box-sizing: border-box;
}

.header {
    
    background-color: ${props => props.theme.bgColor};
    font-size: 14px;
    font-family:'Open Sans', sans-serif;
    color: ${props => props.theme.fontColor};


    
}


a {
    text-decoration: none;
    color: inherit;
}


`;
