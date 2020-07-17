import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";

export default function Login() {
  const history = useHistory();
  const { userLogin, alert, showAlert } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("default");
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };
  const handleSubmit = async (e) => {
    showAlert({ msg: "accsessing user data. please wait..." });
    e.preventDefault();
    let res;
    if (isMember) {
      res = await loginUser({ email, password });
    } else {
      res = await registerUser({ email, password, username });
    }
    if (res) {
      const {
        jwt: token,
        user: { username },
      } = res.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({ msg: `Hi ${username}, you have logged in successfully` });
      history.push("/products");
    } else {
      showAlert({
        msg: "There was an error. Please try again...",
        type: "danger",
      });
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "Sign In" : "Sign Up"}</h2>
      <form className="login-form">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {isEmpty && (
          <p className="form-empty">please fill all the empty fields.</p>
        )}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        <p className="register-link">
          {isMember ? "need to register" : "already a member"}
          <button type="button" onClick={toggleMember}>
            Click Here
          </button>
        </p>
      </form>
    </section>
  );
}
