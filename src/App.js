import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "./firebase/firebaseConfig";
import LoginScreen from "./components/login/LoginScreen";
import MainScreen from "./components/MainScreen";
import AuthenticatedRoute from "./components/AuthtenticatedRoute";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      authenticated: false
    };
    this.signinWithoutPassword = this.signinWithoutPassword.bind(this);
  }
  componentDidMount() {
    if (!document.documentElement.getAttribute("data-theme"))
      document.documentElement.setAttribute("data-theme", "dark");
  }

  signinWithoutPassword(email) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: "https://qbigtime.surge.sh/login",
      // This must be true.
      handleCodeInApp: true
    };
    firebaseAppAuth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
      });
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div className="App">
        <Router>
          <AuthenticatedRoute
            exact
            path="/"
            authenticated={this.state.authenticated}
            component={() => (
              <MainScreen appServiceWorker={this.props.appServiceWorker} />
            )}
          />
          <Route
            exact
            path="/login"
            component={props => (
              <LoginScreen
                props={props}
                singingWithPasswordless={email =>
                  this.signinWithoutPassword(email)
                }
                signInWithGoogle={() => signInWithGoogle()}
                setAuthenticated={() => {
                  console.log("set");
                  this.setState({ authenticated: true }, () => {
                    console.log("push");
                    props.history.push("/");
                  });
                }}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
