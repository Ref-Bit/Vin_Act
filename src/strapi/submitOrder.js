import axios from "axios";
import url from "../utils/URL";

export default async function submitOrder({
  name,
  total,
  items,
  stripeTokenId,
  userToken,
}) {
  const res = await axios
    .post(
      `${url}/orders`,
      {
        name,
        total,
        items,
        stripeTokenId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .catch((err) => console.log(err));
  return res;
}
