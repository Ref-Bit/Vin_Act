import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { CartContext } from "../context/cart";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from "react-stripe-elements";
import submitOrder from "../strapi/submitOrder";

function Checkout(props) {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    showAlert({ msg: "submitting order, please wait..." });
    e.preventDefault();
    const res = await props.stripe
      .createToken()
      .catch((err) => console.log(err));

    const { token } = res;

    if (token) {
      setError("");
      const { id } = token;
      let order = await submitOrder({
        name,
        total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });

      if (order) {
        showAlert({ msg: "your order is complete" });
        clearCart();
        history.push("/");
        return;
      } else {
        showAlert({
          msg: "there was an error with your order. please try again",
          type: "danger",
        });
      }
    } else {
      hideAlert();
      setError(res.error.message);
    }
  }
  if (cart.length < 1) return <EmptyCart />;
  return (
    <section className="section form">
      <h2 className="section-title">Checkout</h2>
      <form className="checkout-form">
        <h3>
          order total: <span>${total}</span>
        </h3>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or Debit Card</label>
          <p className="stripe-info">
            Test using this number: <span>4242 4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for zip code
            <br />
            enter any 3 digits for CVC
          </p>
        </div>
        <CardElement className="card-element"></CardElement>
        {/* Stripe errors */}
        {error && <p className="form-empty">{error}</p>}
        {isEmpty ? (
          <p className="form-empty">please fill the name field</p>
        ) : (
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
      </form>
    </section>
  );
}

const CardForm = injectStripe(Checkout);
const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_bEqaSh4gsMgRmv75BofasQ25">
      <Elements>
        <CardForm />
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
