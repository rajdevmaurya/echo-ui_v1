const prod = {
  url: {
    API_BASE_URL: 'https://148.66.156.153:8080',
  }
};

const dev = {
  url: {
    API_BASE_URL: process.env.REACT_APP_BASE_URL || 'https://148.66.156.153:8080',
  }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
