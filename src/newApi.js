export default class NewApi {
  static url =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/M6E1Pvb7mJsTEY4eMpjI/likes';

  static getLikes = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    return data;
  };

  static setLike = async (id) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/JSON',
      },
    });

    const data = await response.text();
    return data;
  };

  static aboutSection = () => {
    const moviesTab = document.querySelector('.movies-tab');
    const aboutTab = document.querySelector('.about-tab');
    const homePage = document.querySelector('.homepage');
    const aboutSection = document.querySelector('.about-section');

    aboutSection.classList.add('d-none');
    aboutTab.addEventListener('click', () => {
      homePage.classList.add('d-none');
      aboutSection.classList.remove('d-none');
    });

    moviesTab.addEventListener('click', () => {
      homePage.classList.remove('d-none');
      aboutSection.classList.add('d-none');
    });
  };
}
