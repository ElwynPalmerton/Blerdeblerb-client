import axios from "axios";

// const herokuURL="https://shielded-dusk-53756.herokuapp.com/"
// export const baseURL = "https://shielded-dusk-53756.herokuapp.com/"

// ! Clean this up.

const awsUrl =
  "http://blerdeblergapi-env.eba-i3httipm.us-west-1.elasticbeanstalk.com";

const aswSecureUrl = "https://blerdeblurb-api.com";

const localUrl = "http://localhost:5001";
export const baseURL =
  "http://blerdeblergapi-env.eba-i3httipm.us-west-1.elasticbeanstalk.com";

// export const baseURL = "http://localhost:9000";

export default axios.create({
  baseURL: aswSecureUrl,
});
