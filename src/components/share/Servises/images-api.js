import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31903531-47471845ef932624bfd3a089f',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export const fetchImages = async (q, page = 1) => {
  try {
    const { data } = await instance.get('/', {
      params: {
        q,
        page,
        per_page: 12,
      },
    });
    return data;
  } catch (error) {
    //
  }
};
