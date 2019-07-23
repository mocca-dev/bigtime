import React, { Component, Suspense, lazy } from "react";
import { firestore } from "./firebase/firebase";

import UpdateCheck from "./components/UpdateCheck";
import LoadingScreen from "./components/LoadingScreen";

const MainScreen = lazy(() => import("./components/MainScreen"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
  }
  componentDidMount() {
    const theme = localStorage.getItem("theme") === "true" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      firestore
        .collection("visits")
        .get()
        .then(doc => {
          if (!doc.empty) {
            let { count } = doc.docs[0].data();
            count += 1;
            if (!localStorage.getItem("visited")) {
              localStorage.setItem("visited", "true");
              firestore
                .collection("visits")
                .doc("1")
                .update({ count });
            }
          }
        });
    }
  }

  render() {
    const { sWPromise } = this.props;
    return (
      <div className="App">
        <UpdateCheck
          sWPromise={sWPromise}
          setUpdate={() => this.setState({ update: true })}
        />
        <Suspense fallback={<LoadingScreen />}>
          <MainScreen update={this.state.update} />
        </Suspense>
      </div>
    );
  }
}

export default App;
