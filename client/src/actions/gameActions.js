import { WORD_FETCH, TRY_LETTER } from "./types";

export const fetchWord = (min, max, token) => ({
  type: WORD_FETCH,
  payload: { min, max, token }
});

export const tryLetter = (letter, token, status) => ({
  type: TRY_LETTER,
  payload: { letter, token, status }
});
