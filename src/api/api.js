import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36553389-14e37cfcb06dd9cf4a118403b';

axios.defaults.baseURL = BASE_URL;

const imagesApi = async (page, searchWord, perPage) => {
  return axios(
    `?key=${API_KEY}&q=${searchWord}s&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`);
};

export { imagesApi };
