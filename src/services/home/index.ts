import httpService from '../https.service';

// NEW
const getBlogs = () => {
  return httpService().get('blogs');
};

export const HomeAPIS = {
  getBlogs,
};
