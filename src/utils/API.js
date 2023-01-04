import axios from "axios";

const config = {
  development: "http://localhost:5001",
  production: "https://blerdeblurb-api.com",
};

const awsURL = "https://blerdeblurb-api.com";

// export const baseURL = config[process.env.NODE_ENV];

// testing locally with live API:
export const baseURL = awsURL;

export default axios.create({
  baseURL: awsURL,
});
