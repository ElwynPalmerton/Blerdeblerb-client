import API from "./API";

function setHeaders() {
  const token = localStorage.getItem("tokens");

  if (token === null) {
    return false;
  } else {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return token;
  }
}

export default setHeaders;
