import { setHeaderToken } from "./setHeaderToken";

export const checkAuthToken = () => {
  let jwtToken = localStorage.getItem("jwtToken");

  if (jwtToken) {
    // set headers
    setHeaderToken(jwtToken);
    return true;
  } else {
    // delete headers
    setHeaderToken();
    return false;
  }
};
