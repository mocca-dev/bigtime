import React, { Component } from "react";
import ToggleBtn from "./ToggleBtn";
import { MoonSVG, SunSVG } from "./Icons";

class ToggleTheme extends Component {
  constructor() {
    super();
    this.state = {
      lightTheme: false
    };
  }

  toggle() {
    const lightTheme = this.state.lightTheme ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", lightTheme);
    this.setState({ lightTheme: !this.state.lightTheme });
  }

  componentDidMount() {
    this.toggle();
  }

  render() {
    return (
      <ToggleBtn
        cClass="btn btn-theme"
        IconT={MoonSVG}
        IconF={SunSVG}
        value={this.state.lightTheme}
        toggle={() => this.toggle()}
        disabled={false}
      />
    );
  }
}

export default ToggleTheme;
