export default class Character {
  static list = [];

  static url = 'https://api.tvmaze.com/search/shows?q=terror';

  static list = [];

  static getMovies = async () => {
    const response = await fetch(this.url);
    const data = await response.json();

    const movieContainer = document.querySelector('.movie-container');

    data.forEach((item) => {
      const div = document.createElement('div');
      div.classList.add('div-container');
      div.innerHTML = `<img src="${item.show.image.medium}" alt="">
      <div class="media flex main-space-between">
        <li>${item.show.name}</li>
        <div class="likes-container">
          <box-icon name='heart'></box-icon>
          <p>Likes</p>
        </div>
      </div>
      <button class="button">Comments</button>`;
      movieContainer.appendChild(div);
    });
  };
}
