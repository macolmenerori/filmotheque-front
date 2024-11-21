import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from './Login';

// TODO: User context
// const mockSetUser = jest.fn(); // Mock the setUser function
// jest.mock('../../context/UserContext/UserContext', () => ({
//   user: {
//     name: 'John Doe',
//     email: 'john@example.com',
//     role: 'admin'
//   },
//   useUser: () => ({
//     setUser: mockSetUser
//   })
// }));

describe('Login', () => {
  it('Load login page', async () => {
    render(<Login />);
    const title = await screen.findByText('filmotheque');
    expect(title).toBeInTheDocument();
  });

  it('Submits the login form', async () => {
    // BrowserRouter needed for the useNavigate hook, when login is successful to navigate to /mainpage
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Wait for the page to load
    await waitFor(() => {
      expect(screen.getByText('filmotheque')).toBeInTheDocument();
    });

    // Get form elements
    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    // Simulate user typing in email and password
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    // Simulate form submission by clicking the login button
    fireEvent.click(submitButton);

    // TODO: User context
    // Wait for the success response and assert that setUser and navigate are called
    // await waitFor(() => {
    //   // Check if setUser was called with the correct user data
    //   expect(mockSetUser).toHaveBeenCalledWith({
    //     id: 1,
    //     name: 'Test User',
    //     email: 'test@example.com'
    //   });
    // });
  });

  it('Show error if login fails', async () => {
    // BrowserRouter needed for the useNavigate hook, when login is successful to navigate to /mainpage
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Wait for the page to load
    await waitFor(() => {
      expect(screen.getByText('filmotheque')).toBeInTheDocument();
    });

    // Get form elements
    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    // Simulate user typing in wrong email and password
    await userEvent.type(emailInput, 'wrong@example.com');
    await userEvent.type(passwordInput, 'wrongpassword');

    // Simulate form submission by clicking the login button
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
