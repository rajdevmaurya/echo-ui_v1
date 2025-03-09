const prod = {
  url: {
    API_BASE_URL: 'https://myapp.herokuapp.com',
  }
};

const dev = {
  url: {
    API_BASE_URL: process.env.REACT_APP_BASE_URL
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
