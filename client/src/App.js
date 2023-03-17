import {Routes, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
// import {HelmetProvider, Helmet} from 'react-helmet-async';
import {GlobalStyles, lightTheme} from './styles';

// Pages
import MainPage from './pages/MainPage';
import MarketPage from './pages/MarketPage';
import MyPage from './pages/MyPage';
import WritePage from './pages/WritePage';
import DetailPage from './pages/DetailPage';
import JoinPage from './pages/JoinPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/marketpage" element={<MarketPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/writepage" element={<WritePage />} />
        <Route path="/detailpage" element={<DetailPage />} />
        <Route path="/joinpage" element={<JoinPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
