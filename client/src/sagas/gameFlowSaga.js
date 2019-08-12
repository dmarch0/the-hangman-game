import { put, takeEvery, cancel, call } from "redux-saga/effects";

import {
  TRY_LETTER,
  TRY_SUCCESS,
  TRY_ERROR,
  GAME_LOST,
  GAME_WON
} from "../actions/types";
import axios from "../config/axios";

function* gameWatcher() {
  yield takeEvery(TRY_LETTER, gameWorker);
}

function* gameWorker(action) {
  const {
    letter,
    currentState,
    wordByLetters,
    livesLeft,
    token
  } = action.payload;
  if (currentState.includes(letter)) {
    yield cancel();
  } else {
    if (wordByLetters.includes(letter)) {
      yield put({ type: TRY_SUCCESS, payload: letter });
      if (
        !currentState
          .map((current, index) =>
            wordByLetters[index] === letter ? letter : current
          )
          .includes("_")
      ) {
        yield put({ type: GAME_WON });
        console.log(token);
        if (token) {
          console.log("i got this far");
          yield call(axios.post, "/api/record", { won: 1, token });
        }
      }
    } else {
      yield put({ type: TRY_ERROR, payload: letter });
      if (livesLeft <= 1) {
        yield put({ type: GAME_LOST });
        if (token) {
          yield call(axios.post, "/api/record", { won: 0, token });
        }
      }
    }
  }
}

export default gameWatcher;
