import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import letters from "../../config/letters";
import LetterButton from "../buttons/LetterButton";
import { tryLetter } from "../../actions/gameActions";

const Keyboard = ({ className, tryLetter, data }) => {
  const {
    alreadyGuessedLetters,
    currentState,
    wordByLetters,
    livesLeft
  } = data;

  return (
    <div className={className}>
      {letters.map((row, index) => (
        <div className="row" key={index}>
          {row.map(letter => (
            <LetterButton
              letter={letter}
              key={letter}
              guessed={alreadyGuessedLetters[letter]}
              onLetterClicked={() => {
                tryLetter(letter, currentState, wordByLetters, livesLeft);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const StyledKeyboard = styled(Keyboard)`
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
  }
`;

export default connect(
  null,
  { tryLetter }
)(StyledKeyboard);
