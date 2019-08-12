import { WORD_FETCH, WORD_SUCCESS, WORD_ERROR } from "./types";

export const fetchWord = (min, max) => ({
  type: WORD_FETCH,
  payload: { min, max }
});
