const prod = {
  url: {
    API_BASE_URL: 'https://echo-api-b2etapgqfwb3a5ae.centralindia-01.azurewebsites.net',
  }
};

const dev = {
  url: {
    API_BASE_URL: process.env.REACT_APP_BASE_URL || 'https://echo-api-b2etapgqfwb3a5ae.centralindia-01.azurewebsites.net'
  }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
