import fetch from 'cross-fetch';
import NewApi from './newApi.js';
// eslint-disable-next-line import/no-cycle
import commentsApi from './commentsApi.js';

export default class Movies {
  static url = 'https://api.tvmaze.com/search/shows?q=terror';

  static counterMovies = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    let counter = 0;
    data.forEach((item) => {
      if (item.show.image !== null) {
        counter += 1;
      }
      const title = document.querySelector('.title');
      if (title) title.textContent = `MOVIES (${counter})`;
    });

    return counter;
  };

  static updateLikes = () => {
    NewApi.getLikes().then((data) => {
      data.forEach((item) => {
        const boxicon = document.getElementById(`${item.item_id}`);
        if (boxicon) {
          boxicon.nextElementSibling.innerHTML = `${item.likes} likes`;
        }
      });
    });
  };

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

  static handleForm = (id) => {
    const username = document.querySelector('.name-user');
    const comment = document.querySelector('.comment');
    const btnSend = document.querySelector('.send-comment');
    btnSend.addEventListener('click', (e) => {
      e.preventDefault();

      commentsApi
        .setComments(id, username.value, comment.value)
        .then((data) => {
          if (data === 'Created') {
            this.renderComments(id);
            username.value = '';
            comment.value = '';
          }
        });
    });
  };

  static renderComments = (idMovie) => {
    commentsApi.getComments(idMovie).then((data) => {
      const list = document.querySelector('.comments-list');
      const title = document.querySelector('.title-comment');
      title.textContent = `Comments (${commentsApi.counterComments(data)})`;
      list.innerHTML = '';
      data.forEach((item) => {
        const listItem = document.createElement('li');

        listItem.textContent = `${item.creation_date} ${item.username} : ${item.comment}`;
        list.appendChild(listItem);
      });

      console.log(data);
    });
  };

  static getMovies = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    const movieContainer = document.querySelector('.movie-container');

    data.forEach((item) => {
      if (item.show.image !== null) {
        const div = document.createElement('div');
        div.classList.add('div-container');
        div.innerHTML = `<img src="${item.show.image.medium}" alt="">
      <div class="media flex main-space-between">
        <li>${item.show.name}</li>
        <div class="likes-container">
          <box-icon color="red" animation="tada-hover" id=${item.show.id} class="like-icon" name='heart'></box-icon>
          <p>0 Likes</p>
        </div>
      </div>      
      <button id="${item.show.id}" class="button">Comments</button>`;
        movieContainer.appendChild(div);
      }
    });
    this.setEventLikes();
    this.updateLikes();

    const buttons = document.querySelectorAll('.button');

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        console.log(button.id);
        // commentsApi.setComments(button.id);

        const id = event.target.getAttribute('id');
        const allData = data.filter(
          (item) => item.show.id === parseInt(id, 10),
        )[0].show;
        const template = `<div class="card-wrapper">
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
          <div class="d-comments">
            <h3 class="title-comment">Comments (0)</h3>
            <ul class="comments-list"></ul>
          </div>
          
          <div class="formulary">
          <h3>Add comments</h3>
          <form class = "btn-send" action="">
            <input class="name-user" type="text" placeholder="Your name">
            <input class="comment" type="text" placeholder="Your comment">
            <button class="send-comment" type="submit">Send</button>
          </form>
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
        this.renderComments(button.id);
        this.handleForm(button.id);
      });
    });
  };
}
