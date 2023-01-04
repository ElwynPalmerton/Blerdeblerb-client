import axios from "axios";

console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("REACT_APP_ENV: " + process.env.REACT_APP_ENV);

// const aswSecureUrl = "https://blerdeblurb-api.com";

const config = {
  development: "http://localhost:5001",
  production: "https://blerdeblurb-api.com",
};

const environment = process.env.NODE_ENV;

export const baseURL = config[environment];
console.log(baseURL);

export default axios.create({
  baseURL,
});
