import './style.css';
import Movies from './home-page.js';
import NewApi from './newApi.js';
import commentsApi from './commentsApi.js';

Movies.getMovies();
NewApi.getLikes();
commentsApi.getComments();
Movies.counterMovies();
NewApi.aboutSection();
