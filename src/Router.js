import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Modules/Home/Home';
import Recharge from './Modules/Recharge/Recharge';
import LoginForm from './Modules/login/LoginForm';
import RegistrationForm from './Modules/Registration/RegistrationForm';
import WalletPayment from './Modules/WalletAmount/WalletPayment';
import axios from 'axios';
import { GameProvider } from './GameContext';
import RechargeHistory from './Modules/WalletAmount/RechargeHistory';

// Custom hook to check authentication status
const useAuthentication = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:8000/check_auth.php');
        setLoggedIn(response?.data?.loggedIn || false);
      } catch (error) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  return { loggedIn, loading };
};

const Router = () => {
  const { loggedIn, loading } = useAuthentication();
  // const navigate = useNavigate();

  const normalPages = [
    { path: '/', element: <Home /> },
    { path: '/dashboard', element: <Home /> },
    { path: '/rechargeWallet', element: <WalletPayment /> },
    { path: '/recharge', element: <Recharge /> },
    {path : '/rechargeHistory', element:<RechargeHistory/>}
  ];

  return (
    <BrowserRouter>
      <GameProvider>
        {loading ? (
          // Show a loading state while checking authentication
          <div className='d-flex align-items-center justify-content-center' style={{"height" :"100vh"}}>Loading...</div>
        ) : (
          <Routes>
            {normalPages.map((data, index) =>
              loggedIn ? (
                <Route key={index} path={data.path} element={data.element} />
              ) : null
            )}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            {!loggedIn && <Route path="/*" element={<Navigate to="/login" />} />}
          </Routes>
        )}
      </GameProvider>
    </BrowserRouter>
  );
};

export default Router;
