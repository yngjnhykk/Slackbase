import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import ChatPage from './pages/ChatPage/ChatPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from './store/userSlice';

function App() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        navigate('/login');
        dispatch(clearUser());
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route path='/' element={<ChatPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
