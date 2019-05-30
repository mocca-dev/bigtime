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
      update: false
    };
  }
  componentDidMount() {
    if (!document.documentElement.getAttribute("data-theme"))
      document.documentElement.setAttribute("data-theme", "dark");
  }

  render() {
    const { user, signInWithGoogle, appServiceWorker } = this.props;
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
            user={user}
            Component={() => (
              <MainScreen
                update={this.state.update}
                profilePic={user && user.photoURL}
                signOut={() => firebaseAppAuth.signOut()}
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
