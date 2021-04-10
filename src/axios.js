//Very popular fetching library and widely used with react
//(you can fetch, post req, get req)  allows you to interact with apis v v easily
import axios from 'axios';

const instance = axios.create({
  // THE API (cloud function) URL
  baseUrl: 'http://localhost:5001/clone-1c3e2/us-central1/api',
});
export default instance;
