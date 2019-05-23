import React, { useEffect } from "react";
import PasswordlessSigning from "./PasswordlessSigning";
import { firebaseAppAuth } from "./../../firebase/firebaseConfig";

const LoginScreen = ({
  singingWithPasswordless,
  signInWithGoogle,
  setAuthenticated,
  props
}) => {
  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    if (params.get("apiKey")) {
      fromEmail();
    }
  });

  const sendEmail = email => {
    singingWithPasswordless(email);
  };

  const fromEmail = () => {
    // Confirm the link is a sign-in with email link.
    if (firebaseAppAuth.isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.

      firebaseAppAuth
        .signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          setAuthenticated();
        })
        .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  };

  return (
    <div className="login">
      <img src="./icons/icon-512x512.png" height="100px" width="100px" alt="" />
      <div>Bienvenido</div>
      <PasswordlessSigning sendEmail={sendEmail} />
      <button
        className="btn btn-wide btn-google"
        onClick={() => signInWithGoogle()}
      >
        ENTRAR CON GOOGLE
      </button>
    </div>
  );
};

export default LoginScreen;
