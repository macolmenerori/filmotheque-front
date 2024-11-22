import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { UserProvider } from './context/UserContext/UserContext';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/mainpage" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
