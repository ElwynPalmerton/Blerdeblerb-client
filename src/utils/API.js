import axios from "axios";

const config = {
  // ! This should be 8080 - doublecheck
  development: "http://localhost:8080",
  production: "https://blerdeblurb-api.com",
  qa: "https://blerdeblurb-api.com", // Run UI locally with live API.
  docker: "http://localhost:5001", // not implemented yet.
};

// should reference container name...

const environment = process.env.REACT_APP_ENV;
export const baseURL = config[environment];
console.log("Environment: ", environment, " - url: ", baseURL);

export default axios.create({
  baseURL,
});
