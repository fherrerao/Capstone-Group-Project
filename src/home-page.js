import NewApi from "./newApi";

export default class Movies {
  static url = "https://api.tvmaze.com/search/shows?q=terror";

  static updateLikes = () => {
    NewApi.getLikes().then((data) => {
      data.forEach((item) => {
        const boxicon = document.getElementById(`${item.item_id}`);
        boxicon.nextElementSibling.innerHTML = `${item.likes} likes`;
      });
    });
  };

  static setEventLikes = () => {
    const likeIcon = document.querySelectorAll(".like-icon");
    likeIcon.forEach((element, index) => {
      element.addEventListener("click", () => {
        console.log(parseInt(element.id));
        NewApi.setLike(parseInt(element.id)).then(() => {
          this.updateLikes();
        });
      });
    });
  };

  static getMovies = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    console.log(data.length);

    const movieContainer = document.querySelector(".movie-container");

    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("div-container");
      div.innerHTML = `<img src="${item.show.image.medium}" alt="">
      <div class="media flex main-space-between">
        <li>${item.show.name}</li>
        <div class="likes-container">
          <box-icon id=${item.show.id} class="like-icon" name='heart'></box-icon>
          <p>0 Likes</p>
        </div>
      </div>
      <button class="button">Comments</button>`;
      movieContainer.appendChild(div);
    });
    this.setEventLikes();
    this.updateLikes();
  };
}
