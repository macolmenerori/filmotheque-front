import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { ToastProvider } from './context/ToastContext/ToastContext';
import { UserProvider } from './context/UserContext/UserContext';

const Login = React.lazy(() => import('./pages/Login/Login'));
const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const Movie = React.lazy(() => import('./pages/Movie/Movie'));
const NewMovie = React.lazy(() => import('./pages/NewMovie/NewMovie'));
const ProtectedRoute = React.lazy(() => import('./pages/ProtectedRoute/ProtectedRoute'));

const LoadingFallback = () => <div>Loading...</div>;

const lazyLoad = (Component: React.LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: lazyLoad(Login)
  },
  {
    element: lazyLoad(ProtectedRoute),
    children: [
      {
        path: '/',
        element: lazyLoad(MainPage)
      },
      {
        path: '/mainpage',
        element: lazyLoad(MainPage)
      },
      {
        path: '/newmovie',
        element: lazyLoad(NewMovie)
      },
      {
        path: '/movie/:movieId',
        element: lazyLoad(Movie)
      }
    ]
  }
]);

const App = () => {
  return (
    <ToastProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ToastProvider>
  );
};

export default App;
