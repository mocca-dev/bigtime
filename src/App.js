import React, { Component, Suspense, lazy } from "react";
import UpdateCheck from "./components/UpdateCheck";

const MainScreen = lazy(() => import("./components/MainScreen"));

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
    const { sWPromise } = this.props;
    return (
      <div className="App">
        <UpdateCheck
          sWPromise={sWPromise}
          setUpdate={() => this.setState({ update: true })}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <MainScreen update={this.state.update} profilePic={""} />
        </Suspense>
      </div>
    );
  }
}

export default App;
