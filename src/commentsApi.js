export default class commentsApi {
  static url =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/M6E1Pvb7mJsTEY4eMpjI/comments';

  static getComments = async (id) => {
    const response = await fetch(`${this.url}?item_id=${id}`);

    if (response.status === '400') {
      return [];
    }
    const data = await response.json();
    return data;
  };

  static counterComments = (data) => {
    let counter = 0;
    for (let i = 0; i < data.length; i += 1) {
      counter += 1;
    }
    return counter;
  };

  static setComments = async (id, username, comment) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username,
        comment,
      }),
      headers: {
        'Content-type': 'application/JSON',
      },
    });

    const data = await response.text();
    return data;
  };
}
