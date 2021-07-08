import React from "react";
import { authService, firebaseInstance } from "my_firebase";
import AuthForm from "components/AuthForm";
import SocialLogIn from "components/SocialLogIn";

const Auth = () => {
  return (
    <div className="login-page">
      <AuthForm />
      <SocialLogIn />
    </div>
  );
};

export default Auth;
