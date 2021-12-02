import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Routes from "./src/routes";

// import Cat from './src/components/Cat/Cat'
// import CustomTextInput from './src/components/CustomTextInput/CustomTextInput'

// const { Octokit } = require("@octokit/rest");



export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
