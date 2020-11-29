import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  async apiCall(request) {
    try {
      return (await request()).data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }

  async getContent() {
    return await this.apiCall(() => this.api.get('/content/'));
  }

  async uploadFiles(data) {
    return await this.apiCall(() => this.api.post('/upload/${path}', data));
  }

}

const api = new Api();
export default api;
