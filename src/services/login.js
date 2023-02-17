import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  //using credentials.username, credentials.password is not working for some reason
  const result = await axios.post(baseUrl, credentials);
  console.log(result);
  return result.data;
};

export default { login };
