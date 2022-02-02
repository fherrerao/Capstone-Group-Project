// import { v4 as uuidv4 } from 'uuid';

export default class NewApi {
  static url =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

  // static apiID = "WYKXxOq2YKzgwoBh1MTI";
  static apiID = '4DpHEP91d1nG8TqTdfQP';

  static createApi = async () => {
    const response = await fetch(`${this.url}/apps/`, {
      method: 'POST',
    });
    const data = await response.text();
    console.log(data);
  };

  static setLikes = async (id) => {
    const response = await fetch(`${this.url}/apps/${this.apiID}/likes`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await response.text();
    console.log(data);
  };

  static getLikes = async () => {
    const response = await fetch(`${this.url}/apps/${this.apiID}/likes`);
    const data = await response.json();
    return data;
    // console.log(data);
  };
}
