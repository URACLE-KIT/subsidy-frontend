import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Menu from './layout/Menu';
import Main from './pages/Main';
import Custom from './pages/Custom';
import Latest from './pages/Latest';
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
import { useEffect } from 'react';

function App() {
  // useEffect(() => {
  //   // mount 되는 시점에 호출되는 이벤트
  //   M.pop.alert('hello world')
  //   return () => {
  //     // unmount 되는 시점에 호출되는 이벤트
  //   }
  // })

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/custom" element={<Custom />}></Route>
          <Route path="/latest" element={<Latest />}></Route>
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
        </Routes>
        <Menu />
      </BrowserRouter>
    </>
  );
}

export default App;