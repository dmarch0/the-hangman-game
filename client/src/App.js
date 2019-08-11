import React from "react";
import "normalize.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./store";
import MainWrapper from "./components/wrappers/MainWrapper";
import MainMenu from "./components/MainMenu";
import HangmanImage from "./components/HangmanImage";
import LetterButton from "./components/buttons/LetterButton";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainWrapper>
          <HangmanImage />
          <Route exact path="/" component={MainMenu} />
          <LetterButton />
        </MainWrapper>
      </Router>
    </Provider>
  );
};

export default App;
