//login user
import axios from "axios";
import url from "../utils/URL";

async function loginUser({ email, password }) {
  const res = await axios
    .post(`${url}/auth/local`, {
      identifier: email,
      password,
    })
    .catch((err) => console.log(err));
  return res;
}

export default loginUser;
