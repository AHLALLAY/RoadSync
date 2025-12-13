import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;