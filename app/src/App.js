import React, { Component } from "react";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { LoadingContainer } from "@drizzle/react-components";

import "./App.css";
import 'antd/dist/antd.css';

import drizzleOptions from "./drizzleOptions";
import Deposit from './Components/Deposit';

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <Deposit/>
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
