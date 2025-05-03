const prod = {
  url: {
    API_BASE_URL: 'https://echohealthcare.in:8443',
  }
};

const dev = {
  url: {
    API_BASE_URL: process.env.REACT_APP_BASE_URL || 'https://echohealthcare.in:8443',
  }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
