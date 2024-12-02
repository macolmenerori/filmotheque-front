import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastProvider } from './context/ToastContext/ToastContext';
import { UserProvider } from './context/UserContext/UserContext';

const Login = React.lazy(() => import('./pages/Login/Login'));
const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const Movie = React.lazy(() => import('./pages/Movie/Movie'));
const NewMovie = React.lazy(() => import('./pages/NewMovie/NewMovie'));
const ProtectedRoute = React.lazy(() => import('./pages/ProtectedRoute/ProtectedRoute'));

const App = () => {
  return (
    <ToastProvider>
      <UserProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/mainpage" element={<MainPage />} />
                <Route path="/newmovie" element={<NewMovie />} />
                <Route path="/movie/:movieId" element={<Movie />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserProvider>
    </ToastProvider>
  );
};

export default App;
