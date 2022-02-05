export default class commentsApi {
  static url =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/M6E1Pvb7mJsTEY4eMpjI/comments';

  static getComments = async () => {
    const response = await fetch(this.url);
    if (response.status == "400") {
      console.log('failed');
      return [{
        item_id: 0,
        item_movie_id: 0,
        item_name: 'user name',
        item_date: '2020/01/01',
        item_comment: "No comments yet",
      }];
    }
    const data = await response.json();
    console.log(data);
    return data;
  };

  static setComments = async (id, movieId, name, date, comment) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        item_movie_id: movieId,
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
