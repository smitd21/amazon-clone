//Very popular fetching library and widely used with react
//(you can fetch, post req, get req)  allows you to interact with apis v v easily

const instance = axios.create({
  baseUrl: '...', //THE API (cloud function) URL
});
export default instance;
