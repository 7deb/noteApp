import { useEffect } from 'react';
import './App.css'
import SignupPage from './pages/SignupPage';
import Loginpage from './pages/Loginpage';
import Home from './pages/Home';
import { useAuthStore } from './store/useAuthstore';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  // if (isCheckingAuth) return <div>...loading</div>

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

      <Routes>
        {authUser ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* ADD THE LOGINPAGE ROUTE HERE */}
            <Route path="/login" element={<Loginpage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Redirect any other path (like '/') to /login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
