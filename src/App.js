import { useSelector } from 'react-redux';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const loginStatus = useSelector((state) => (state.auth.isLoggedIn));

  return (
    <div>
      <Header />
      <Routes>
        {!loginStatus && <Route path='/login' element={<Login />} />}
        {!loginStatus && <Route path='/signup' element={<Signup />} />}
        {loginStatus && <Route path='/home' element={<Home />} />}
        
        {!loginStatus && <Route path='*' element={<Navigate to='login' replace />} />}
        {loginStatus && <Route path='*' element={<Navigate to='home' replace />} />}
      </Routes>
    </div>
  );
}

export default App;
