import { rest } from 'msw';

import movies from '../../mockMovies.json';

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
  }),
  // Mock the /v1/movies/movie API to return a list of movies
  rest.get(`${baseURL}/v1/movies/movie`, (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page'));
    const perpage = Number(req.url.searchParams.get('perpage'));
    const sortBy = req.url.searchParams.get('sortBy');
    const watched = req.url.searchParams.get('watched');
    const backedUp = req.url.searchParams.get('backedUp');

    let filteredMovies = movies;
    if (watched !== null) {
      filteredMovies = filteredMovies.filter((movie) => movie.watched === (watched === 'true'));
    }
    if (backedUp !== null) {
      filteredMovies = filteredMovies.filter((movie) => movie.backedUp === (backedUp === 'true'));
    }
    if (sortBy) {
      switch (sortBy) {
        case 'title':
          filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'year':
          filteredMovies.sort((a, b) => a.year - b.year);
          break;
        case 'length':
          filteredMovies.sort((a, b) => a.length - b.length);
          break;
      }
    }

    const start = (page - 1) * perpage;
    const end = page * perpage;

    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        message: 'Movies retrieved successfully',
        data: {
          movies: movies.slice(start, end)
        },
        pagination: {
          totalCount: movies.length,
          currentPage: page,
          totalPages: Math.ceil(movies.length / perpage)
        }
      })
    );
  }),
  // Mock the /v1/movies/fullmovie API to return a single movie
  rest.get(`/v1/movies/fullmovie`, (req, res, ctx) => {
    const movieId = req.url.searchParams.get('id');
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
      return res(ctx.status(404), ctx.json({ message: 'Movie not found' }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        message: 'Movie retrieved successfully',
        data: {
          movie
        }
      })
    );
  })
];
