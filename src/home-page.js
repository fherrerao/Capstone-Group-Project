export default class Character {

  static url = 'https://api.tvmaze.com/search/shows?q=terror';

  static list = [];

  static getMovies = async () => {
    const response = await fetch(this.url);
    const data = await response.json();

    return data;
  };
}
