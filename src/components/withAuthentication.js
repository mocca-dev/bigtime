import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { firebaseAppAuth, firestore } from "../firebase/firebase";

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const [show, setShow] = useState(false);
    useEffect(() => {
      var unsubscribe = firebaseAppAuth.onAuthStateChanged(user => {
        if (user) {
          firestore
            .collection("users")
            .doc(user.uid)
            .get()
            .then(user => {
              setShow(true);

              const { active } = user.data();
              if (active) {
                props.history.push("/");
              } else {
                props.history.push("/inactive");
              }
            });
        } else {
          setShow(true);
          props.history.push("/login");
        }
      });

      return function() {
        unsubscribe();
      };
    }, []);

    return show && <Component {...props} />;
  };
  return withRouter(WithAuthentication);
};

export default withAuthentication;
