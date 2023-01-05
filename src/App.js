import { useSelector } from 'react-redux';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Headers/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Inbox from './pages/Inbox';
import LoginHeader from './components/Headers/LoginHeader';
import Sidebar from './components/SideBar/Sidebar';
import Outbox from './pages/Outbox';

const App = () => {
  const loginStatus = useSelector((state) => (state.auth.isLoggedIn));

  return (
    <div>
      {!loginStatus && <Header />}
      {loginStatus && <LoginHeader />}


      {loginStatus && <div className='app__body'>
        <Sidebar />
        <Routes>
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/sent' element={<Outbox />} />
          <Route path='*' element={<Navigate to='inbox' replace />} />
        </Routes>
      </div>}

      <Routes>
        {!loginStatus && <Route path='/login' element={<Login />} />}

        {!loginStatus && <Route path='/signup' element={<Signup />} />}
        {!loginStatus && <Route path='*' element={<Navigate to='login' replace />} />}
      </Routes>
    </div>
  );
}

export default App;
