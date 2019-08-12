import { put, takeEvery, cancel } from "redux-saga/effects";

import {
  TRY_LETTER,
  TRY_SUCCESS,
  TRY_ERROR,
  GAME_LOST,
  GAME_WON
} from "../actions/types";

function* gameWatcher() {
  yield takeEvery(TRY_LETTER, gameWorker);
}

function* gameWorker(action) {
  const { letter, currentState, wordByLetters, livesLeft } = action.payload;
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
      }
    } else {
      yield put({ type: TRY_ERROR, payload: letter });
      if (livesLeft <= 1) {
        yield put({ type: GAME_LOST });
      }
    }
  }
}

export default gameWatcher;
