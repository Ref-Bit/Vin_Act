import axios from "axios";
import url from "../utils/URL";

async function registerUser({ email, password, username }) {
  const res = await axios
    .post(`${url}/auth/local/register`, {
      username,
      email,
      password,
    })
    .catch((err) => console.log(err));
  return res;
}

export default registerUser;
