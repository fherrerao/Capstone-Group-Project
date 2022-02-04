export default class NewApi {
  static url =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/M6E1Pvb7mJsTEY4eMpjI/likes';

  static getLikes = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    // console.log(data);
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
}
