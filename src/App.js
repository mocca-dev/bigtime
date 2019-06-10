import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth, providers } from "./firebase/firebase";
import LoginScreen from "./components/login/LoginScreen";
import MainScreen from "./components/MainScreen";
import UpdateCheck from "./components/UpdateCheck";
import InactiveUserScreen from "./components/InactiveUserScreen";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      update: false
    };
  }
  componentDidMount() {
    const theme = localStorage.getItem("theme") === "true" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }

  render() {
    const { signInWithGoogle, appServiceWorker, signOut } = this.props;
    return (
      <div className="App">
        <UpdateCheck
          appServiceWorker={appServiceWorker}
          setUpdate={() => this.setState({ update: true })}
        />
        <Router>
          <Route
            exact
            path="/"
            component={() => (
              <MainScreen
                update={this.state.update}
                // profilePic={user && user.photoURL}
                profilePic={""}
                signOut={() => signOut()}
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
              />
            )}
          />
          <Route
            exact
            path="/inactive"
            component={() => <InactiveUserScreen signOut={() => signOut()} />}
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
