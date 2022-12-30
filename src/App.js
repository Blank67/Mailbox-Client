import { useSelector } from 'react-redux';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Inbox from './pages/Inbox';

const App = () => {
  const loginStatus = useSelector((state) => (state.auth.isLoggedIn));

  return (
    <div>
      <Header />
      <Routes>
        {!loginStatus && <Route path='/login' element={<Login />} />}
        {!loginStatus && <Route path='/signup' element={<Signup />} />}
        {loginStatus && <Route path='/inbox' element={<Inbox />} />}
        
        {!loginStatus && <Route path='*' element={<Navigate to='login' replace />} />}
        {loginStatus && <Route path='*' element={<Navigate to='inbox' replace />} />}
      </Routes>
    </div>
  );
}

export default App;
