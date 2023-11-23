import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Menu from './layout/Menu';
import Main from './pages/Main';
import Custom from './pages/Custom';
import Detail from './pages/Detail';
import Review from './pages/Review';
import Mypage from './pages/Mypage';
import Profile from './pages/Profile';
import Write from './pages/Write';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Required from './pages/Required';
import Setting from './pages/Setting';
import Mycustom from './pages/Mycustom';
import Reset from './pages/Reset';
import Ranking from './pages/Ranking';
import Download from './pages/Download';

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/custom" element={<Custom />}></Route>
          <Route path="/detail" element={<Detail />}></Route>
          <Route path="/review" element={<Review />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/write" element={<Write />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/required" element={<Required />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/mycustom" element={<Mycustom />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
          <Route path="/ranking" element={<Ranking />}></Route>
          <Route path="/download" element={<Download />}></Route>
        </Routes>
        <Menu />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;