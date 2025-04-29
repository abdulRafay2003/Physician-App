import httpService from '../https.service';

const login = (body: object) => {
  return httpService().post('auth/login', body);
};

export const AuthAPIS = {login};
