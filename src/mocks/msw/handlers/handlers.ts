import { rest } from 'msw';

const baseURL = process.env.BASE_URL_API;
const authUrl = process.env.BASE_URL_AUTH;

export const handlers = [
  // Mock the /v1/users/isloggedin API to return a not logged in state
  rest.get(`${authUrl}/v1/users/isloggedin`, (req, res, ctx) => {
    return res(ctx.status(401)); // Simulate user not logged in, so auth is set to false
  }),
  // Mock the /v1/users/login API to return a successful login
  rest.post(`${authUrl}/v1/users/login`, (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({ data: { user: { id: 1, name: 'Test User', email } } })
      );
    }
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  }),
  // Mock the /v1/users/logout API to return a successful logout
  rest.delete(`${authUrl}/v1/users/logout`, (req, res, ctx) => {
    return res(ctx.status(200));
  })
];
