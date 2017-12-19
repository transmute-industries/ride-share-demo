import React, { Component } from "react";

import "./App.css";

import T from "../transmute";

import RideManager from "../RideManager";

class App extends Component {
  state = {
    uid: "none"
  };

  render() {
    return (
      <div className="App">
        <RideManager />
      </div>
    );
  }
}

export default App;
