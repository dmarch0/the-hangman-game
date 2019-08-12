import { WORD_FETCH, TRY_LETTER } from "./types";

export const fetchWord = (min, max) => ({
  type: WORD_FETCH,
  payload: { min, max }
});

export const tryLetter = (
  letter,
  currentState,
  wordByLetters,
  livesLeft,
  token
) => ({
  type: TRY_LETTER,
  payload: { letter, currentState, wordByLetters, livesLeft, token }
});
