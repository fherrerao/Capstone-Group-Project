import './style.css';
import Character from './home-page.js';


Character.getMovies().then(data => {
  const movieContainer = document.querySelector('.movie-container');

  data.forEach((item) => {
    item = item.show;
    const div = document.createElement('div');
    div.classList.add('div-container');
    div.innerHTML = `<img src="${item.image.medium}" alt="">
    <div class="media flex main-space-between">
      <li>${item.name}</li>
      <div class="likes-container">
        <box-icon name='heart'></box-icon>
        <p>Likes</p>
      </div>
    </div>
    <button data-id="${item.id}" class="button">Comments</button>`;
    movieContainer.appendChild(div);
  });

  const buttons = document.querySelectorAll('.button');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let id = event.target.getAttribute('data-id');
      let allData = data.filter(item => item.show.id === parseInt(id))[0].show;
      console.log(allData);
      let template = `<div class="card-wrapper">
        <div class="card">
          <div class="card-header">
            <div class="close">
              <i class="fas fa-times"></i>
            </div>
            <div class="card-image flex main-center">
              <img src="${allData.image.medium}" alt="character">
            </div>
            <h2 class="card-title text-center">${allData.name}</h2>
          </div>
          <div class="card-content">
            <dl class="flex main-space-around">
              <div class="left">
                <dt>Type</dt>
                  <dd>${allData.type}</dd>
                <dt>Language</dt>
                  <dd>${allData.language}</dd>
                <dt>Generes</dt>
                  <dd>${allData.genres.toString() || "None"}</dd>
                <dt>Status</dt>
                  <dd>${allData.status}</dd>
                <dt>Runtime</dt>
                  <dd>${allData.runtime}</dd>
                <dt>AverageRuntime</dt>
                  <dd>${allData.averageRuntime}</dd>
              </div>
              <div class="right">
                <dt>Premiered</dt>
                  <dd>${allData.premiered}</dd>
                <dt>Ended</dt>
                  <dd>${allData.ended}</dd>
                <dt>OfficialSite</dt>
                  <dd><a href="${allData.officialSite}">link</a></dd>
                <dt>Schedule</dt>
                  <dd>time: ${allData.schedule.time}, day: ${allData.schedule.days}</dd>
                <dt>Rating</dt>
                  <dd>average: ${allData.rating.average}</dd>
                <dt>Weight</dt>
                  <dd>${allData.weight}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>`;
      document.body.insertAdjacentHTML('beforeend', template);

      const close = document.querySelectorAll('.close');
      close.forEach((item) => {
        item.addEventListener('click', () => {
          document.querySelector('.card-wrapper').remove();
        });
      });
    });
  });

});
