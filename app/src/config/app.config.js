const config = {
  version: process.env.REACT_APP_VERSION ?? "-",
  environment: process.env.REACT_APP_ENVIRONMENT ?? "-",
};

console.debug("App Config", config);

export default config;
