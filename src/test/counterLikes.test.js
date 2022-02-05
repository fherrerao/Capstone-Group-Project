import Movies from '../home-page.js';

test('Display number of movies', async () => {
  const counter = await Movies.counterMovies();
  expect(counter).toBe(10);
});
