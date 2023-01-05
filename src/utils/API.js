import axios from "axios";

const config = {
  // ! This should be 8080 - doublecheck
  development: "http://localhost:8080",
  production: "https://blerdeblurb-api.com",
  qa: "https://blerdeblurb-api.com", // Run UI locally with live API.
  docker: "blerdeblurb-api", // not implemented yet.
};

const environment = process.env.REACT_APP_ENV;
export const baseURL = config[environment];
console.log("Environemnt: ", environment, " - url: ", baseURL);

export default axios.create({
  baseURL,
});
