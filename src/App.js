import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "./firebase/firebaseConfig";
import LoginScreen from "./components/login/LoginScreen";
import MainScreen from "./components/MainScreen";
import AuthenticatedRoute from "./components/AuthtenticatedRoute";
import UpdateCheck from "./components/UpdateCheck";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      authenticated: false,
      update: false
    };
  }
  componentDidMount() {
    if (!document.documentElement.getAttribute("data-theme"))
      document.documentElement.setAttribute("data-theme", "dark");
  }

  render() {
    const { user, signInWithGoogle, appServiceWorker } = this.props;
    console.log(user);
    return (
      <div className="App">
        <UpdateCheck
          appServiceWorker={appServiceWorker}
          setUpdate={() => this.setState({ update: true })}
        />
        <Router>
          <AuthenticatedRoute
            exact
            path="/"
            authenticated={this.state.authenticated}
            component={() => (
              <MainScreen
                update={this.state.update}
                signOut={() => {
                  console.log("hola");
                  this.setState({ authenticated: false }, () =>
                    firebaseAppAuth.signOut()
                  );
                }}
              />
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
                  this.setState({ authenticated: true });
                }}
                user={user}
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
