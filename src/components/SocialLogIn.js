import { authService, firebaseInstance } from "my_firebase";
import React from "react";

const SocialLogIn = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div className="social-login">
      <button
        className="social-login__button"
        onClick={onSocialClick}
        name="google"
      >
        Continue with Google
        <i class="fab fa-google"></i>
      </button>
      <button
        className="social-login__button"
        onClick={onSocialClick}
        name="github"
      >
        Continue with Github
        <i class="fab fa-github"></i>
      </button>
    </div>
  );
};

export default SocialLogIn;
