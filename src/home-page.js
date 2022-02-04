import NewApi from './newApi.js';
// import commentsApi from './commentsApi.js';

export default class Movies {
  static url = 'https://api.tvmaze.com/search/shows?q=terror';

  static updateLikes = () => {
    NewApi.getLikes().then((data) => {
      data.forEach((item) => {
        const boxicon = document.getElementById(`${item.item_id}`);
        boxicon.nextElementSibling.innerHTML = `${item.likes} likes`;
      });
    });
  };

  // static updateComments = () => {
  //   commentsApi.getComments().then((data) => {
  //     data.forEach((item) => {
  //       const comment = document.getElementById('comment');
  //       const name = document.getElementById('comment-name');
  //       const date = document.getElementById('comment-date');
  //       comment.innerHTML = `${item.comment}`;
  //       name.innerHTML = `${item.name}`;
  //       date.innerHTML = `${item.date}`;
  //     });
  //   });
  // };

  static setEventLikes = () => {
    const likeIcon = document.querySelectorAll('.like-icon');
    likeIcon.forEach((element) => {
      element.addEventListener('click', () => {
        NewApi.setLike(parseInt(element.id, 10)).then(() => {
          this.updateLikes();
        });
      });
    });
  };

  // static setEventComments = () => {
  //   const likeIcon = document.querySelectorAll('.like-icon');
  //   likeIcon.forEach((element) => {
  //     element.addEventListener('click', () => {
  //       NewApi.setLike(parseInt(element.id, 10)).then(() => {
  //         this.updateLikes();
  //       });
  //     });
  //   });
  // };

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
          <box-icon id=${item.show.id} class="like-icon" name='heart'></box-icon>
          <p>0 Likes</p>
        </div>
      </div>
      <button data-id="${item.show.id}" class="button">Comments</button>`;
      movieContainer.appendChild(div);
    });
    this.setEventLikes();
    this.updateLikes();

    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-id');
        const allData = data.filter(
          (item) => item.show.id === parseInt(id, 10),
        )[0].show;

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
                  <dd>${allData.genres.toString() || 'None'}</dd>
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
                  <dd>time: ${allData.schedule.time}, day: ${
          allData.schedule.days
        }</dd>
                <dt>Rating</dt>
                  <dd>average: ${allData.rating.average}</dd>
                <dt>Weight</dt>
                  <dd>${allData.weight}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>`;
        const commentsData = [
          {
            comment: 'test',
            name: 'test',
            date: 'test',
          },
        ];
        const commentTemplate = commentsData.map((item) => {
          const { username, date, comment } = item;
          return `<div class="comments">
          <h3>Comments</h3>
          <div class="comment-container">
            <div class="comment-input flex">
              <input type="text" placeholder="Add a comment...">
              <button class="button">Add</button>
            </div>
          </div>
          <div class="comment-list">
            <div class="comment flex cross-center">
              <div class="comment-header flex cross-center">
                <div class="comment-name flex cross-center">
                  <h4 id="comment-name" class="mr-1">${username}</h4>
                  <p id="comment-date" class="mr-1>${date}</p>
                </div>
              </div>
              <div class="comment-content flex cross-center">
                <p id="comment" class="mr-1">${comment}</p>
                <div class="comment-actions">
                  <button class="button">Like</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        });
        template += commentTemplate;
        document.body.insertAdjacentHTML('beforeend', template);

        const close = document.querySelectorAll('.close');
        close.forEach((item) => {
          item.addEventListener('click', () => {
            document.querySelector('.card-wrapper').remove();
          });
        });
      });
    });
  };
}
