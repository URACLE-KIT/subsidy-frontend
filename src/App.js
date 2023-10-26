import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scrap from './pages/Scrap';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Scrap />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;