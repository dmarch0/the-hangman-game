import React, { useEffect } from "react";
import { connect } from "react-redux";

import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";
import HangmanImage from "../HangmanImage";
import { fetchWord } from "../../actions/gameActions";

const Game = ({ fetchWord }) => {
  useEffect(() => {
    fetchWord(3, 6);
  }, []);
  return (
    <div>
      <HangmanImage />
      <WordDisplay />
      <Keyboard />
    </div>
  );
};

export default connect(
  null,
  { fetchWord }
)(Game);
