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
  }
  componentDidMount() {
    if (!document.documentElement.getAttribute("data-theme"))
      document.documentElement.setAttribute("data-theme", "dark");
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
