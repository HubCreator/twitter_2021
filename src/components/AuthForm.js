import { authService } from "my_firebase";
import React, { useState } from "react";
import "css/styles.css";

const AuthForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true); // if true -> have no account.. new user
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create new account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <i className="fab fa-twitter"></i>
      <form onSubmit={onSubmit} className="login-page__form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={onChange}
        />
        <input
          className="login-page__form__submit"
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
      </form>
      <span className="login-page__form__signin" onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div className="login-page__error-msg">{error}</div>

      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
        integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
        crossorigin="anonymous"
      ></link>
    </>
  );
};

export default AuthForm;
