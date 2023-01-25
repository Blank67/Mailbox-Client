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
import MailDetailPage from './components/Mails/MailDetailPage';
import { useState } from 'react';

const App = () => {
  const loginStatus = useSelector((state) => (state.auth.isLoggedIn));
  const [success, setSuccess] = useState(false);

  const toggleSuccess = (value) => {
    setSuccess(value);
  }

  return (
    <div>
      {!loginStatus && <Header />}
      {loginStatus && <LoginHeader />}


      {loginStatus && <div className='app__body'>
        <Sidebar success={success} setSuccess={toggleSuccess} />
        <Routes>
          <Route path='/inbox' element={<Inbox success={success} setSuccess={toggleSuccess} />} />
          <Route exact path='/sent' element={<Outbox success={success} setSuccess={toggleSuccess} />} />
          <Route path='/mail/:key' element={<MailDetailPage />}/>
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
