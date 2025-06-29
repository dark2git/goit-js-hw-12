import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50853437-9ef5a88e343e45432612d628f';

export async function fetchImages(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });
  return response.data;
}