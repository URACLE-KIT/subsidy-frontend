import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Menu from './layout/Menu';
import Main from './pages/Main';
import Custom from './pages/Custom';
import Latest from './pages/Latest';
import Detail from './pages/Detail';
import Write from './pages/Write';
import Setting from './pages/Setting';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/custom" element={<Custom />}></Route>
          <Route path="/latest" element={<Latest />}></Route>
          <Route path="/detail" element={<Detail />}></Route>
          <Route path="/write" element={<Write />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
        </Routes>
        <Menu />
      </BrowserRouter>
    </>
  );
}

export default App;