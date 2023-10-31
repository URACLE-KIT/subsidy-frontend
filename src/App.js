import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Menu from './layout/Menu';
import Main from './pages/Main';
import Custom from './pages/Custom';
import Latest from './pages/Latest';
import Detail from './pages/Detail';
import Review from './pages/Review';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // mount 되는 시점에 호출되는 이벤트
    M.pop.alert('hello world')
    return () => {
      // unmount 되는 시점에 호출되는 이벤트
    }
  })

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
        </Routes>
        <Menu />
      </BrowserRouter>
    </>
  );
}

export default App;