import httpService from '../https.service';

// NEW
const getBlogs = () => {
  return httpService().get('blogs');
};

const userServiceDoc = (body: object) => {
  return httpService('multipart/form-data').post(
    'user/service/documents',
    body,
  );
};

export const HomeAPIS = {
  getBlogs,
  userServiceDoc,
};
