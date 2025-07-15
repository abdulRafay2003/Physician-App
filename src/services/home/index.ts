import httpService from '../https.service';

// NEW
const getBlogs = () => {
  return httpService().get('blogs');
};

const physicianLeads = () => {
  return httpService().get('physician_leads');
};

export const HomeAPIS = {
  getBlogs,
  physicianLeads
};
