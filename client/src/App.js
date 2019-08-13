import React from "react";
import "normalize.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./store";
import MainWrapper from "./components/wrappers/MainWrapper";
import MainMenu from "./components/MainMenu";
import HangmanImage from "./components/HangmanImage";
import LetterButton from "./components/buttons/LetterButton";
import Game from "./components/game/Game";
import { USER_SET, USER_TEMP } from "./actions/types";

if (localStorage.user) {
  store.dispatch({ type: USER_SET, payload: localStorage.user });
} else {
  store.dispatch({ type: USER_TEMP });
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainWrapper>
          <Route exact path="/" component={MainMenu} />
          <Route exact path="/game" component={Game} />
        </MainWrapper>
      </Router>
    </Provider>
  );
};

export default App;
