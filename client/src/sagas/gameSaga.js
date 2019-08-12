import { put, call, takeEvery } from "redux-saga/effects";

import { WORD_FETCH, WORD_SUCCESS, WORD_ERROR } from "../actions/types";
import axios from "../config/axios";

//watcher saga
function* watchFetchWord() {
  yield takeEvery(WORD_FETCH, fetchWordSaga);
}

//worker saga
function* fetchWordSaga(action) {
  try {
    const { min, max } = action.payload;
    const response = yield call(axios.get, "/api/words", {
      params: { min, max }
    });
    const { payload } = response.data;
    const word = payload[Math.floor(Math.random() * payload.length)];
    const gameData = {
      word: word.toUpperCase(),
      wordByLetters: word.toUpperCase().split(""),
      currentState: word.split("").map(letter => "_"),
      alreadyGuessedLetters: [],
      livesLeft: 10
    };
    yield put({ type: WORD_SUCCESS, payload: gameData });
  } catch (err) {
    yield put({ type: WORD_ERROR, payload: err.response.data.error });
  }
}

export default watchFetchWord;
