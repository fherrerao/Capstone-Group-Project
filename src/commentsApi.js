export default class commentsApi {
  static url =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/M6E1Pvb7mJsTEY4eMpjI/comments';

  static getComments = async () => {
    const response = await fetch(this.url);
    const data = await response.json();
    return data;
  };

  static setComments = async (id, name, date, comment) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        item_name: name,
        item_date: date,
        item_comment: comment,
      }),
      headers: {
        'Content-type': 'application/JSON',
      },
    });

    const data = await response.text();
    return data;
  };
}
