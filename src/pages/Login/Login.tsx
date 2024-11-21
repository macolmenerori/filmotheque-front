import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { authApi } from '../../api';

/**
 * Login page. User can login with email and password. This sets the user in the UserContext and a JWT token on a cookie.
 * Redirects to the main page after successful login, or stays on the login page if the login fails.
 * If the user is already logged in, redirects to the main page.
 *
 * @returns {JSX.Element} Login component
 */
const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [auth, setAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authApi.get('/v1/users/isloggedin');
        setAuth(true);
      } catch (err) {
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return <div>Loading...{/* TODO: add loading spinner */}</div>;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authApi.post('/v1/users/login', { email, password });
      if (response.status === 200) {
        //setUser(response.data.data.user); //TODO:
        navigate('/mainpage'); // Redirect to the main page after login
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return auth ? (
    <Navigate to="/mainpage" />
  ) : (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Username (email address)
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="emailInput"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="passwordInput"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {error && (
              <p style={{ color: 'red' }} className="text-sm/6">
                {error}
              </p>
            )}
            <div>
              <button
                type="submit"
                data-testid="submitButton"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
